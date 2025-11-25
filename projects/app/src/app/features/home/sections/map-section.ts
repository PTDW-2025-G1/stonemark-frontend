import { Component, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Overlay from 'ol/Overlay';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { MonumentService } from '@core/services/monument.service';

@Component({
  selector: 'app-map-section',
  standalone: true,
  imports: [CommonModule],
  // ViewEncapsulation.None é necessário para que os estilos CSS funcionem no HTML injetado dinamicamente no Popup
  encapsulation: ViewEncapsulation.None,
  template: `
    <section class="py-16 bg-surface-alt/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10 sm:mb-12 lg:mb-16">
          <p class="text-xs sm:text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">
            Explore
          </p>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-text">
            Heritage in Maps
          </h2>
        </div>

        <div class="relative rounded-2xl shadow-xl border border-border overflow-hidden group">
          <div
            id="map"
            class="w-full h-[600px] bg-surface-muted"
          ></div>

          <div #popup id="popup-container" class="absolute z-50 transition-opacity duration-300"></div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Estilos específicos para o Popup injetado via JS */
    .ol-popup {
      position: absolute;
      background-color: var(--bg-surface, #ffffff);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      border-radius: 1rem;
      border: 1px solid var(--border-color, #e5e7eb);
      bottom: 12px;
      left: -50%;
      transform: translateX(-50%);
      min-width: 280px;
      max-width: 320px;
      padding: 0;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease-in-out;
    }

    .ol-popup.visible {
      opacity: 1;
      visibility: visible;
      bottom: 20px; /* Pequena animação de subida */
    }

    /* A Seta (Triângulo) em baixo do popup */
    .ol-popup::after {
      content: "";
      position: absolute;
      bottom: -6px;
      left: 50%;
      margin-left: -6px;
      border-width: 6px 6px 0;
      border-style: solid;
      border-color: var(--bg-surface, #ffffff) transparent;
      filter: drop-shadow(0 2px 1px rgba(0,0,0,0.05));
    }
  `]
})
export class MapSectionComponent implements AfterViewInit {
  @ViewChild('popup') popupRef!: ElementRef<HTMLDivElement>;

  private map!: Map;
  private overlay!: Overlay;

  constructor(private monumentService: MonumentService) {}

  ngAfterViewInit(): void {
    // 1. Inicializar Mapa
    this.map = new Map({
      target: 'map',
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: fromLonLat([-8.224454, 39.399872]), // Centro de Portugal
        zoom: 7
      })
    });

    // 2. Configurar Camada de Vetores
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({ source: vectorSource });
    this.map.addLayer(vectorLayer);

    // 3. Configurar Overlay (Popup)
    this.overlay = new Overlay({
      element: this.popupRef.nativeElement,
      autoPan: {
        animation: { duration: 250 }
      },
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -10]
    });
    this.map.addOverlay(this.overlay);

    // 4. Carregar Dados
    this.monumentService.getMonuments().subscribe(monuments => {
      monuments.forEach(monument => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([
            monument.longitude ?? 0,
            monument.latitude ?? 0
          ])),
          name: monument.name,
          protectionTitle: monument.protectionTitle,
          website: monument.website,
        });

        // Ícone Personalizado (Pin)
        feature.setStyle(
          new Style({
            image: new Icon({
              anchor: [0.5, 1],
              src: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/geo-alt-fill.svg',
              color: '#d97706', // Uma cor âmbar/primary para destacar
              scale: 1.8
            })
          })
        );

        vectorSource.addFeature(feature);
      });
    });

    // 5. Evento de Click
    this.map.on('singleclick', event => {
      const feature = this.map.forEachFeatureAtPixel(event.pixel, f => f) as Feature | undefined;
      const popupEl = this.popupRef.nativeElement;

      if (feature) {
        const coordinates = (feature.getGeometry() as Point).getCoordinates();
        const props = feature.getProperties();

        // Gerar HTML Bonito e Seguro
        popupEl.innerHTML = this.generatePopupContent(props);

        // Adicionar classes para animação e estilo
        popupEl.className = 'ol-popup visible';
        this.overlay.setPosition(coordinates);

        // Adicionar listener ao botão de fechar (após injetar o HTML)
        const closeBtn = popupEl.querySelector('.popup-close');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            this.closePopup();
          });
        }

      } else {
        this.closePopup();
      }
    });
  }

  private closePopup(): void {
    const popupEl = this.popupRef.nativeElement;
    popupEl.className = 'ol-popup'; // Remove 'visible'
    setTimeout(() => {
      this.overlay.setPosition(undefined);
    }, 200); // Espera a animação CSS terminar
  }

  private generatePopupContent(props: any): string {
    const name = props.name || 'Unknown Monument';
    const protection = props.protectionTitle;
    const website = props.website;

    const badgeHtml = protection
      ? `<span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-100 text-amber-700 text-xs font-semibold border border-amber-200 mb-3">
           <i class="bi bi-shield-fill-check"></i> ${protection}
         </span>`
      : '';

    const websiteHtml = website
      ? `<a href="${website}" target="_blank" rel="noopener noreferrer"
            class="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-surface-alt hover:bg-primary hover:text-white text-text-muted text-sm font-medium rounded-lg transition-all border border-border hover:border-primary group">
           <span>Visit Website</span>
           <i class="bi bi-box-arrow-up-right group-hover:translate-x-0.5 transition-transform"></i>
         </a>`
      : '';

    return `
      <div class="relative p-5 bg-surface text-left">
        <button class="popup-close absolute top-3 right-3 p-1 text-text-muted hover:text-primary transition-colors rounded-full hover:bg-surface-alt">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>

        <div class="pr-6">
          ${badgeHtml}
          <h3 class="font-serif text-lg font-bold text-text leading-tight mb-1">${name}</h3>
          <p class="text-xs text-text-muted flex items-center gap-1">
            <i class="bi bi-geo-alt-fill text-primary/70"></i>
            ${props.city ? props.city : 'Portugal'}
          </p>
        </div>

        ${websiteHtml}
      </div>
    `;
  }
}
