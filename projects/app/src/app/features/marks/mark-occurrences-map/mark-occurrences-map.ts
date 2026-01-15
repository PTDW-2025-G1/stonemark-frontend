import { Component, ElementRef, ViewChild, ViewEncapsulation, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';
import { MarkService } from '@core/services/mark/mark.service';
import { BreadcrumbComponent, BreadcrumbItem } from '@shared/ui/breadcrumb/breadcrumb';
import { MARKS_ICON, MONUMENTS_ICON } from '@core/constants/content-icons';
import { MarkDto } from '@api/model/mark-dto';
import { MarkOccurrenceMapDto } from '@api/model/mark-occurrence-map-dto';
import { ButtonComponent } from '@shared/ui/button/button';

@Component({
  selector: 'app-mark-occurrences-map',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, ButtonComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mark-occurrences-map.html',
  styles: [`
    .ol-popup {
      position: absolute;
      background-color: var(--bg-surface, #ffffff);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      border-radius: 1rem;
      border: 1px solid var(--border-color, #e5e7eb);
      bottom: 12px;
      left: -50%;
      transform: translateX(-50%);
      min-width: 320px;
      max-width: 380px;
      padding: 0;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease-in-out;
    }

    .ol-popup.visible {
      opacity: 1;
      visibility: visible;
      bottom: 20px;
    }

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

    .ol-control button {
      background-color: var(--bg-surface, #ffffff) !important;
      color: var(--text-color, #1f2937) !important;
    }

    .ol-control button:hover {
      background-color: var(--bg-surface-alt, #f9fafb) !important;
    }

    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
      background: var(--bg-surface-alt, #f9fafb);
      border-radius: 3px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: var(--border-color, #e5e7eb);
      border-radius: 3px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: var(--text-muted, #9ca3af);
    }
  `]
})
export class MarkOccurrencesMap implements OnInit {
  @ViewChild('popup') popupRef!: ElementRef<HTMLDivElement>;

  private map!: Map;
  private overlay!: Overlay;
  private markId!: number;

  mark?: MarkDto;
  breadcrumbItems: BreadcrumbItem[] = [];
  occurrences: MarkOccurrenceMapDto[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private markService: MarkService,
    private markOccurrenceService: MarkOccurrenceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const markId = this.route.snapshot.paramMap.get('id');
    if (markId) {
      this.markId = Number(markId);
      this.loadMarkData();
    }
  }

  private loadMarkData(): void {
    this.markService.getMark(this.markId).subscribe(mark => {
      this.mark = mark;
      this.updateBreadcrumbs();
      this.loadOccurrences();
    });
  }

  private updateBreadcrumbs(): void {
    this.breadcrumbItems = [
      { label: 'Marks', link: '/search/marks', iconHtml: MARKS_ICON },
      {
        label: this.mark?.description ?? `Mark #${this.markId}`,
        link: ['/marks', this.markId]
      },
      {
        label: 'Map View',
        active: true,
        icon: 'bi bi-map-fill'
      }
    ];
  }

  private loadOccurrences(): void {
    this.markOccurrenceService.getByMarkIdForMap(this.markId).subscribe(occurrences => {
      this.occurrences = occurrences.filter(occ =>
        occ.monument?.latitude != null && occ.monument?.longitude != null
      );

      this.loading = false;
      this.cdr.detectChanges();

      setTimeout(() => {
        this.initializeMap();
        this.addOccurrencesToMap();
      }, 200);
    });
  }

  private initializeMap(): void {
    if (this.occurrences.length === 0 || !this.popupRef?.nativeElement) {
      return;
    }

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM({
            attributions: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          })
        })
      ],
      view: new View({
        center: fromLonLat([-8.224454, 39.399872]),
        zoom: 7
      })
    });

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

    this.setupMapClickHandler();
  }

  private addOccurrencesToMap(): void {
    if (!this.map || this.occurrences.length === 0) return;

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({ source: vectorSource });

    const svgIcon = `data:image/svg+xml;base64,${btoa(MARKS_ICON)}`;

    const occurrencesByMonument: { [monumentId: number]: MarkOccurrenceMapDto[] } = {};

    this.occurrences.forEach(occurrence => {
      const monumentId = occurrence.monument!.id!;
      if (!occurrencesByMonument[monumentId]) {
        occurrencesByMonument[monumentId] = [];
      }
      occurrencesByMonument[monumentId].push(occurrence);
    });

    Object.entries(occurrencesByMonument).forEach(([monumentIdStr, occurrences]) => {
      const monumentId = Number(monumentIdStr);
      const firstOccurrence = occurrences[0];

      const feature = new Feature({
        geometry: new Point(fromLonLat([
          firstOccurrence.monument!.longitude!,
          firstOccurrence.monument!.latitude!
        ])),
        monumentId: monumentId,
        monumentName: firstOccurrence.monument!.name,
        occurrenceIds: occurrences.map((occ: MarkOccurrenceMapDto) => occ.id!),
        occurrenceCount: occurrences.length
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 0.5],
            src: svgIcon,
            color: '#7c3aed',
            scale: occurrences.length > 1 ? 2 : 1.5
          })
        })
      );

      vectorSource.addFeature(feature);
    });

    this.map.addLayer(vectorLayer);

    if (this.occurrences.length > 0) {
      const extent = vectorSource.getExtent();
      this.map.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        maxZoom: 15,
        duration: 1000
      });
    }
  }

  private setupMapClickHandler(): void {
    this.map.on('singleclick', event => {
      const feature = this.map.forEachFeatureAtPixel(event.pixel, f => f) as Feature | undefined;
      const popupEl = this.popupRef.nativeElement;

      if (feature) {
        const coordinates = (feature.getGeometry() as Point).getCoordinates();
        const props = feature.getProperties();

        popupEl.innerHTML = this.generatePopupContent(props);
        popupEl.className = 'ol-popup visible';
        this.overlay.setPosition(coordinates);

        setTimeout(() => {
          const closeBtn = popupEl.querySelector('.popup-close');
          if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closePopup());
          }

          const occurrenceBtns = popupEl.querySelectorAll('.view-occurrence-btn');
          occurrenceBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
              const occurrenceId = (e.currentTarget as HTMLElement).getAttribute('data-occurrence-id');
              if (occurrenceId) {
                this.router.navigate(['/marks/occurrence', Number(occurrenceId)]);
              }
            });
          });

          const viewMonumentBtn = popupEl.querySelector('.view-monument-btn');
          if (viewMonumentBtn) {
            viewMonumentBtn.addEventListener('click', (e) => {
              const monumentId = (e.currentTarget as HTMLElement).getAttribute('data-monument-id');
              if (monumentId) {
                this.router.navigate(['/monuments', Number(monumentId)]);
              }
            });
          }
        }, 0);
      } else {
        this.closePopup();
      }
    });
  }

  private closePopup(): void {
    const popupEl = this.popupRef.nativeElement;
    popupEl.className = 'ol-popup';
    setTimeout(() => {
      this.overlay.setPosition(undefined);
    }, 200);
  }

  private generatePopupContent(props: any): string {
    const monumentName = props.monumentName || 'Unknown Monument';
    const occurrenceIds = props.occurrenceIds || [];
    const occurrenceCount = props.occurrenceCount || 1;

    // Single occurrence
    if (occurrenceCount === 1) {
      return `
        <div class="relative bg-surface text-left overflow-hidden rounded-2xl">
          <button class="popup-close absolute top-3 right-3 z-10 p-1.5 text-text-muted hover:text-primary transition-colors rounded-full hover:bg-surface-alt/80">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>

          <div class="p-5">
            <div class="mb-4">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold border border-primary/20 mb-3">
                <span class="inline-block w-3.5 h-3.5">${MARKS_ICON}</span>
                Mark Occurrence
              </span>
              <h3 class="font-serif text-lg font-bold text-text leading-tight">${monumentName}</h3>
            </div>

            <div class="flex flex-col gap-2">
              <button class="view-occurrence-btn group relative inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none overflow-hidden cursor-pointer w-full gap-2 px-4 py-2.5 text-sm rounded-lg bg-primary text-white hover:bg-primary-hover active:scale-[0.98]" data-occurrence-id="${occurrenceIds[0]}">
                <span class="flex items-center gap-2 relative z-10">
                  <i class="bi bi-eye-fill"></i>
                  <span>View Occurrence</span>
                  <i class="bi bi-arrow-right group-hover:translate-x-0.5 transition-transform"></i>
                </span>
              </button>
              <button class="view-monument-btn group relative inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none overflow-hidden cursor-pointer w-full gap-2 px-4 py-2.5 text-sm rounded-lg bg-surface-alt text-text hover:bg-accent hover:text-white border border-border hover:border-accent active:scale-[0.98]" data-monument-id="${props.monumentId}">
                <span class="flex items-center gap-2 relative z-10">
                  <span class="inline-block">${MONUMENTS_ICON}</span>
                  <span>View Monument</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // Multiple occurrences
    const occurrenceListItems = occurrenceIds.map((occId: number, index: number) => `
      <button class="view-occurrence-btn group relative inline-flex items-center justify-between font-semibold transition-all duration-300 ease-out select-none overflow-hidden cursor-pointer w-full px-4 py-3 text-sm rounded-lg bg-surface-alt text-text hover:bg-primary hover:text-white border border-border hover:border-primary active:scale-[0.98]" data-occurrence-id="${occId}">
        <span class="flex items-center gap-2 relative z-10">
          <i class="bi bi-bookmark-fill"></i>
          <span>Occurrence #${index + 1}</span>
        </span>
        <i class="bi bi-arrow-right group-hover:translate-x-0.5 transition-transform relative z-10"></i>
      </button>
    `).join('');

    return `
      <div class="relative bg-surface text-left overflow-hidden rounded-2xl">
        <button class="popup-close absolute top-3 right-3 z-10 p-1.5 text-text-muted hover:text-primary transition-colors rounded-full hover:bg-surface-alt/80">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>

        <div class="p-5">
          <div class="mb-4">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100/80 text-amber-700 text-xs font-semibold border border-amber-200 mb-3">
              <i class="bi bi-stack"></i>
              ${occurrenceCount} Occurrences
            </span>
            <h3 class="font-serif text-lg font-bold text-text leading-tight">${monumentName}</h3>
            <p class="text-xs text-text-muted mt-1.5">Select an occurrence to view details</p>
          </div>

          <div class="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
            ${occurrenceListItems}
          </div>

          <div class="mt-4 pt-4 border-t border-border">
            <button class="view-monument-btn group relative inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none overflow-hidden cursor-pointer w-full gap-2 px-4 py-2.5 text-sm rounded-lg bg-surface-alt text-text hover:bg-accent hover:text-white border border-border hover:border-accent active:scale-[0.98]" data-monument-id="${props.monumentId}">
              <span class="flex items-center gap-2 relative z-10">
                <span class="inline-block">${MONUMENTS_ICON}</span>
                <span>View Monument Details</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  goBack(): void {
    this.router.navigate(['/marks', this.markId]);
  }
}

