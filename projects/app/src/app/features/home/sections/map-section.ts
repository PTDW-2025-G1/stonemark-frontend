import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
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
import { MonumentService } from '../../../../../projects/shared/src/lib/core/services/monument.service';

@Component({
  selector: 'app-map-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10 sm:mb-12 lg:mb-16">
          <p class="text-xs sm:text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">
            Explore
          </p>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-text">
            Heritage in Maps
          </h2>
        </div>

        <div
          id="map"
          class="w-full h-[600px] rounded-2xl shadow-md border border-border overflow-hidden"
        ></div>
        <div #popup class="absolute z-50"></div>
      </div>
    </section>
  `
})
export class MapSectionComponent implements AfterViewInit {
  @ViewChild('popup') popupRef!: ElementRef<HTMLDivElement>;

  constructor(private monumentService: MonumentService) {}

  ngAfterViewInit(): void {
    const map = new Map({
      target: 'map',
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: fromLonLat([-8.224454, 39.399872]),
        zoom: 6
      })
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({ source: vectorSource });
    map.addLayer(vectorLayer);

    const popup = new Overlay({
      element: this.popupRef.nativeElement,
      autoPan: true
    });
    map.addOverlay(popup);

    this.monumentService.getMonumentsPortugal().subscribe(monuments => {
      monuments.forEach(monument => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([monument.lon ?? 0, monument.lat ?? 0])),
          name: monument.name,
          image: monument.image,
          wikidata: monument.wikidata
        });

        feature.setStyle(
          new Style({
            image: new Icon({
              src: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/icons/geo-alt-fill.svg',
              scale: 1.4
            })
          })
        );

        vectorSource.addFeature(feature);
      });
    });

    map.on('singleclick', event => {
      const feature = map.forEachFeatureAtPixel(event.pixel, f => f) as Feature | undefined;
      const popupEl = this.popupRef.nativeElement;

      if (feature) {
        const name = feature.get('name') || 'Unnamed Monument';
        const image = feature.get('image');
        const wikidata = feature.get('wikidata');
        const coord = (feature.getGeometry() as Point).getCoordinates();

        popupEl.innerHTML = `
          <div class="popup-card shadow-lg rounded-xl border border-gray-300 bg-white/95 backdrop-blur-md px-5 py-4 w-[260px]">
            ${image ? `
              <div class="mb-3">
                <img
                  ngSrc="${image}"
                  alt="${name}"
                  width="260"
                  height="140"
                  class="rounded-lg w-full h-[140px] object-cover border border-gray-200 shadow-sm"/>
              </div>` : ''}
            <h3 class="text-[17px] font-semibold text-gray-900 leading-snug mb-1">${name}</h3>
            <p class="text-[13px] text-gray-600 mb-2">Historic monument in Portugal</p>
            ${
                  wikidata
                    ? `<a href="https://www.wikidata.org/wiki/${wikidata}" target="_blank"
                     class="inline-block text-[13px] text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                     View on Wikidata ↗
                   </a>`
                    : ''
                }
          </div>
        `;
        popup.setPosition(coord);
      } else {
        popup.setPosition(undefined);
      }
    });
  }
}
