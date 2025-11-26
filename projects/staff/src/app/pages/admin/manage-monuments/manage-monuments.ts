import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { MonumentService } from '@core/services/monument.service';
import { MonumentResponseDto } from '@api/model/monument-response-dto';
import { AppToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { AppTableComponent } from '../../../components/table/table.component';
import { ButtonModule } from 'primeng/button';
import {CookieService} from '@core/services/cookie.service';

@Component({
  selector: 'app-manage-monuments',
  standalone: true,
  imports: [CommonModule, Toast, ButtonModule, AppToolbarComponent, AppTableComponent],
  template: `
        <app-toolbar
          title="Gestão de Monumentos"
          subtitle="Aqui pode gerir os monumentos do sistema."
          [showImport]="true"
          (import)="importMonuments()"
          (export)="exportCSV()"></app-toolbar>
        <p-toast />
        <app-table #table [data]="monuments()" [columns]="cols" [globalFilterFields]="['id', 'name', 'protectionTitle', 'latitude', 'longitude', 'createdAt', 'lastModifiedAt']">
            <ng-template #actions let-monument>
                <p-button
                    label="Editar"
                    icon="pi pi-pencil"
                    severity="info"
                    class="mr-2"
                    (onClick)="editMonument(monument)"
                ></p-button>

                <p-button
                    label="Eliminar"
                    icon="pi pi-trash"
                    severity="danger"
                    (onClick)="deleteMonument(monument)"
                ></p-button>
            </ng-template>
        </app-table>
    `,
  providers: [MessageService, MonumentService]
})
export class ManageMonuments implements OnInit {
  monuments = signal<MonumentResponseDto[]>([]);
  @ViewChild('table') tableComp!: AppTableComponent;

  cols = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'protectionTitle', header: 'Protection Title' },
    { field: 'latitude', header: 'Latitude' },
    { field: 'longitude', header: 'Longitude' },
    { field: 'createdAt', header: 'Created At', type: 'date' },
    { field: 'lastModifiedAt', header: 'Modified At', type: 'date' }
  ];


  constructor(
    private monumentService: MonumentService,
    private messageService: MessageService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.loadMonuments();
  }

  loadMonuments() {
    this.monumentService.getMonuments().subscribe({
      next: (data) => {
        const formatted = data.map(item => ({
          ...item,
          createdAt: item.createdAt ? new Date(item.createdAt).toLocaleString('pt-PT') : '',
          lastModifiedAt: item.lastModifiedAt ? new Date(item.lastModifiedAt).toLocaleString('pt-PT') : ''
        }));
        this.monuments.set(formatted);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar monumentos'
        });
      }
    });
  }


  editMonument(monument: MonumentResponseDto) {
    // Implementar lógica de edição
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: `Editar monumento ${monument.id}`
    });
  }

  deleteMonument(monument: MonumentResponseDto) {
    // Implementar lógica de eliminação
    this.messageService.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: `Eliminar monumento ${monument.id}`
    });
  }

  importMonuments() {
    console.log('🍪 Cookies disponíveis:', document.cookie);
    console.log('🔑 accessToken:', this.cookieService.get('accessToken'));
    console.log('🔑 refreshToken:', this.cookieService.get('refreshToken'));
    console.log('👤 role:', this.cookieService.get('role'));
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.geojson';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            const geoJsonContent = e.target.result;

            // Log do conteúdo lido
            console.log('Conteúdo lido do ficheiro:', geoJsonContent);
            console.log('Tipo do conteúdo:', typeof geoJsonContent);

            // Validar se é um JSON válido
            const parsed = JSON.parse(geoJsonContent);
            console.log('JSON parseado:', parsed);

            // Enviar como string (não fazer JSON.stringify novamente)
            this.monumentService.importMonumentsFromOverpass(geoJsonContent).subscribe({
              next: (monuments) => {
                console.log('Resposta do servidor:', monuments);
                this.messageService.add({
                  severity: 'success',
                  summary: 'Sucesso',
                  detail: `${monuments.length} monumentos importados com sucesso`
                });
                this.loadMonuments();
              },
              error: (error) => {
                console.error('Erro completo:', error);
                console.error('Status:', error.status);
                console.error('Mensagem:', error.message);
                console.error('Erro do servidor:', error.error);
                this.messageService.add({
                  severity: 'error',
                  summary: 'Erro',
                  detail: error.error?.message || error.message || 'Erro ao importar monumentos'
                });
              }
            });
          } catch (parseError) {
            console.error('Erro ao parsear JSON:', parseError);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Ficheiro JSON inválido'
            });
          }
        };

        reader.onerror = () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao ler o ficheiro'
          });
        };

        reader.readAsText(file);
      }
    };

    input.click();
  }


  exportCSV() {
    this.tableComp?.exportCSV();
  }
}
