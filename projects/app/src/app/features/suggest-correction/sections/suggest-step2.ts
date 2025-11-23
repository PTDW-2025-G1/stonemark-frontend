import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';

type Section = 'information' | 'history' | 'map';

@Component({
  selector: 'app-suggest-step2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h3 class="text-lg font-semibold text-text mb-4">
      Edit Information
    </h3>

    <div class="space-y-5">

      <!-- INFORMATION FIELDS -->
      @if (sections.includes('information')) {
        <div>
          <label class="block text-sm text-text-muted mb-1">Name</label>
          <input
            type="text"
            [(ngModel)]="editedData.name"
            (ngModelChange)="emitChange()"
            class="w-full rounded-lg p-3 border border-border bg-white
            focus:outline-none focus:border-text"
          />
        </div>

        <div>
          <label class="block text-sm text-text-muted mb-1">Protection Title</label>
          <input
            type="text"
            [(ngModel)]="editedData.protection_title"
            (ngModelChange)="emitChange()"
            class="w-full rounded-lg p-3 border border-border bg-white
            focus:outline-none focus:border-text"
          />
        </div>

        <div>
          <label class="block text-sm text-text-muted mb-1">Description</label>
          <textarea
            rows="4"
            [(ngModel)]="editedData.description"
            (ngModelChange)="emitChange()"
            class="w-full rounded-lg p-3 border border-border bg-white
            focus:outline-none focus:border-text"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm text-text-muted mb-1">Website</label>
          <input
            type="text"
            [(ngModel)]="editedData.website"
            (ngModelChange)="emitChange()"
            class="w-full rounded-lg p-3 border border-border bg-white
            focus:outline-none focus:border-text"
          />
        </div>
      }

      <!-- MAP FIELDS -->
      @if (sections.includes('map')) {
        <div class="mt-2">
          <label class="block text-sm text-text-muted mb-1">Coordinates</label>

          <div class="flex gap-2">
            <input
              type="number"
              [(ngModel)]="editedData.lat"
              (input)="updateMap.emit()"
              (ngModelChange)="emitChange()"
              placeholder="Latitude"
              class="w-full rounded-lg p-3 border border-border bg-white
              focus:outline-none focus:border-text"
            />

            <input
              type="number"
              [(ngModel)]="editedData.lon"
              (input)="updateMap.emit()"
              (ngModelChange)="emitChange()"
              placeholder="Longitude"
              class="w-full rounded-lg p-3 border border-border bg-white
              focus:outline-none focus:border-text"
            />
          </div>

          <div class="mt-3">
            <div class="relative w-full h-[230px] rounded-xl overflow-hidden">
              @if (mapUrl) {
                <iframe
                  [src]="mapUrl"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  allowfullscreen
                  (load)="mapLoaded.emit()"
                  class="w-full h-full border-0"
                ></iframe>
              }

              @if (mapLoading) {
                <div class="absolute inset-0 flex items-center justify-center bg-[#f0f0f0] text-[#666] text-sm">
                  Loading the map
                </div>
              }

              @if (mapLoadError) {
                <div class="absolute inset-0 flex items-center justify-center bg-[#f0f0f0] text-[#666] text-sm">
                  Error loading the map
                </div>
              }
            </div>

            <div class="flex gap-3 mt-3">
              <button
                class="bg-primary text-white px-4 py-2 rounded-lg text-sm"
                (click)="openExternalMap.emit()"
              >
                Open Maps
              </button>

              <button
                class="bg-primary text-white px-4 py-2 rounded-lg text-sm"
                (click)="openDirections.emit()"
              >
                Directions
              </button>
            </div>
          </div>
        </div>
      }
    </div>

    <!-- FOOTER BUTTONS -->
    <div class="mt-6 flex justify-between">
      <button
        class="px-4 py-2 rounded-full border border-border text-text-muted"
        (click)="prev.emit()"
      >
        Previous
      </button>

      <button
        class="px-4 py-2 rounded-full bg-text text-primary-foreground"
        (click)="next.emit()"
        [disabled]="!step2Valid"
      >
        Next
      </button>
    </div>
  `
})
export class SuggestStep2Component {

  @Input() sections: Section[] = [];

  @Input() editedData: any = {};
  @Output() editedDataChange = new EventEmitter<any>();

  @Input() mapUrl: SafeResourceUrl | null = null;
  @Input() mapLoading = false;
  @Input() mapLoadError = false;
  @Output() mapLoaded = new EventEmitter<void>();

  @Input() step2Valid = false;

  @Output() updateMap = new EventEmitter<void>();
  @Output() openExternalMap = new EventEmitter<void>();
  @Output() openDirections = new EventEmitter<void>();

  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  emitChange() {
    this.editedDataChange.emit(this.editedData);
  }
}
