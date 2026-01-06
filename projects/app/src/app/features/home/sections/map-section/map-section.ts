import { Component, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
import { MonumentService } from '@core/services/monument/monument.service';
import { MarkOccurrenceService } from '@core/services/mark/mark-occurrence.service';
import { HomeHeaderComponent } from '@shared/ui/home-header/home-header';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {MonumentMapDto} from '@api/model/monument-map-dto';

@Component({
  selector: 'app-map-section',
  standalone: true,
  imports: [CommonModule, HomeHeaderComponent, TranslatePipe],
  encapsulation: ViewEncapsulation.None,
  template: `
    <section class="py-16 bg-surface-alt/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <app-home-header
          [badge]="'home-map-section.badge' | translate"
          [title]="'home-map-section.title' | translate"
          [subtitle]="'home-map-section.subtitle' | translate"
        />

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
  `]
})
export class MapSectionComponent implements AfterViewInit {
  @ViewChild('popup') popupRef!: ElementRef<HTMLDivElement>;

  private map!: Map;
  private overlay!: Overlay;
  private occurrenceCounts = new Map();

  constructor(
    private monumentService: MonumentService,
    private markOccurrenceService: MarkOccurrenceService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngAfterViewInit(): void {
    this.map = new Map({
      target: 'map',
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: fromLonLat([-8.224454, 39.399872]),
        zoom: 7
      })
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({ source: vectorSource });
    this.map.addLayer(vectorLayer);

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

    this.monumentService.getAllForMap().subscribe(monumentsArray => {
      monumentsArray.forEach((monument: MonumentMapDto) => {
        if (monument.id != null) {
          this.markOccurrenceService.countByMonumentId(monument.id).subscribe(count => {
            this.occurrenceCounts.set(String(monument.id), count);
          });
        }

        const feature = new Feature({
          geometry: new Point(fromLonLat([
            monument.longitude ?? 0,
            monument.latitude ?? 0
          ])),
          id: monument.id,
          name: monument.name,
          protectionTitle: monument.protectionTitle,
          website: monument.website,
          city: monument.city
        });

        feature.setStyle(
          new Style({
            image: new Icon({
              anchor: [0.5, 1],
              src: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/geo-alt-fill.svg',
              color: '#d97706',
              scale: 1.8
            })
          })
        );

        vectorSource.addFeature(feature);
      });
    });

    this.map.on('singleclick', event => {
      const feature = this.map.forEachFeatureAtPixel(event.pixel, f => f) as Feature | undefined;
      const popupEl = this.popupRef.nativeElement;

      if (feature) {
        const coordinates = (feature.getGeometry() as Point).getCoordinates();
        const props = feature.getProperties();
        const occurrenceCount = this.occurrenceCounts.get(String(props['id'])) ?? 0;

        popupEl.innerHTML = this.generatePopupContent(props, occurrenceCount);

        popupEl.className = 'ol-popup visible';
        this.overlay.setPosition(coordinates);

        const closeBtn = popupEl.querySelector('.popup-close');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            this.closePopup();
          });
        }

        const detailsBtn = popupEl.querySelector('.view-details-btn');
        if (detailsBtn && props['id']) {
          detailsBtn.addEventListener('click', () => {
            this.router.navigate(['/monuments', props['id']]);
          });
        }

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

  private generatePopupContent(props: any, occurrenceCount: number): string {
    const name = props.name || this.translate.instant('home-map-section.unknown');
    const protection = props.protectionTitle;
    const website = props.website;
    const city = props.city || this.translate.instant('home-map-section.city');

    const marksText = this.translate.instant('home-map-section.marks', {
      count: occurrenceCount,
      plural: occurrenceCount === 1 ? '' : 's'
    });

    const badgeHtml = protection
      ? `<span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-100 text-amber-700 text-xs font-semibold border border-amber-200 mb-3">
           <i class="bi bi-shield-fill-check"></i> ${protection}
         </span>`
      : '';

    const websiteHtml = website
      ? `<a href="${website}" target="_blank" rel="noopener noreferrer"
            class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-surface-alt hover:bg-primary hover:text-white text-text-muted text-sm font-medium rounded-lg transition-all border border-border hover:border-primary group">
           <span>${this.translate.instant('home-map-section.visit_website')}</span>
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
          <p class="text-xs text-text-muted flex items-center gap-1 mb-2">
            <i class="bi bi-geo-alt-fill text-primary/70"></i>
            ${city}
          </p>
          <p class="text-xs text-text-muted flex items-center gap-1">
            <i class="bi bi-bookmark-fill text-primary/70"></i>
            ${marksText}
          </p>
        </div>

        <div class="mt-4 flex flex-col gap-2">
          <button class="view-details-btn w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-all group cursor-pointer">
            <span>${this.translate.instant('home-map-section.view_details')}</span>
            <i class="bi bi-arrow-right group-hover:translate-x-0.5 transition-transform"></i>
          </button>
          ${websiteHtml}
        </div>
      </div>
    `;
  }
}
