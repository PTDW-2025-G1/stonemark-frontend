import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';

type Section = 'information' | 'history' | 'map';

@Component({
  selector: 'app-suggest-step3',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h3 class="text-lg font-semibold text-text mb-4">
      Review &amp; Comment
    </h3>

    <!-- INFORMATION BLOCK -->
    @if (sections.includes('information')) {
      <div class="p-4 rounded-lg border border-border bg-white mb-4">
        <label class="block text-sm text-text-muted mb-3">Information</label>

        <!-- NAME -->
        <div class="mb-4">
          <div class="text-xs text-text-muted">Name</div>

          @if (!changed('name')) {
            <div class="text-sm text-text mt-1">{{ originalData.name }}</div>
          }

          @if (changed('name')) {
            <div class="mt-1">
              <div class="line-through text-xs text-text-muted">{{ originalData.name }}</div>
              <div class="text-sm text-success font-medium mt-1">{{ editedData.name }}</div>
            </div>
          }
        </div>

        <!-- DESCRIPTION -->
        <div>
          <div class="text-xs text-text-muted">Description</div>

          @if (!changed('description')) {
            <div class="text-sm text-text mt-1">{{ originalData.description }}</div>
          }

          @if (changed('description')) {
            <div class="mt-1">
              <div class="line-through text-xs text-text-muted">{{ originalData.description }}</div>
              <div class="text-sm text-success font-medium mt-1">{{ editedData.description }}</div>
            </div>
          }
        </div>
      </div>
    }

    <!-- HISTORY BLOCK -->
    @if (sections.includes('history')) {
      <div class="p-4 rounded-lg border border-border bg-white mb-4">
        <label class="block text-sm text-text-muted mb-3">History</label>

        <!-- start_date -->
        <div class="mb-3">
          <div class="text-xs text-text-muted">Construction Period</div>
          @if (changed('start_date')) {
            <div class="line-through text-xs text-text-muted">{{ originalData.start_date }}</div>
            <div class="text-sm text-success font-medium mt-1">{{ editedData.start_date }}</div>
          }
          @else {
            <div class="text-sm text-text mt-1">{{ originalData.start_date }}</div>
          }
        </div>

        <!-- architect -->
        <div class="mb-3">
          <div class="text-xs text-text-muted">Architect</div>
          @if (changed('architect')) {
            <div class="line-through text-xs text-text-muted">{{ originalData.architect }}</div>
            <div class="text-sm text-success font-medium mt-1">{{ editedData.architect }}</div>
          }
          @else {
            <div class="text-sm text-text mt-1">{{ originalData.architect }}</div>
          }
        </div>

        <!-- artist -->
        <div class="mb-3">
          <div class="text-xs text-text-muted">Artist</div>
          @if (changed('artist_name')) {
            <div class="line-through text-xs text-text-muted">{{ originalData.artist_name }}</div>
            <div class="text-sm text-success font-medium mt-1">{{ editedData.artist_name }}</div>
          }
          @else {
            <div class="text-sm text-text mt-1">{{ originalData.artist_name }}</div>
          }
        </div>

        <!-- material -->
        <div class="mb-3">
          <div class="text-xs text-text-muted">Material</div>
          @if (changed('material')) {
            <div class="line-through text-xs text-text-muted">{{ originalData.material }}</div>
            <div class="text-sm text-success font-medium mt-1">{{ editedData.material }}</div>
          }
          @else {
            <div class="text-sm text-text mt-1">{{ originalData.material }}</div>
          }
        </div>
      </div>
    }

    <!-- MAP BLOCK -->
    @if (sections.includes('map')) {
      <div class="p-4 rounded-lg border border-border bg-white mb-4">
        <label class="block text-sm text-text-muted mb-3">Map</label>

        <!-- LAT -->
        <div class="mb-3">
          <div class="text-xs text-text-muted">Latitude</div>
          @if (changed('lat')) {
            <div class="line-through text-xs text-text-muted">{{ originalData.lat }}</div>
            <div class="text-sm text-success font-medium mt-1">{{ editedData.lat }}</div>
          }
          @else {
            <div class="text-sm text-text mt-1">{{ originalData.lat }}</div>
          }
        </div>

        <!-- LON -->
        <div class="mb-4">
          <div class="text-xs text-text-muted">Longitude</div>
          @if (changed('lon')) {
            <div class="line-through text-xs text-text-muted">{{ originalData.lon }}</div>
            <div class="text-sm text-success font-medium mt-1">{{ editedData.lon }}</div>
          }
          @else {
            <div class="text-sm text-text mt-1">{{ originalData.lon }}</div>
          }
        </div>

        <div class="flex justify-center mt-2">
          <div class="relative w-full max-w-[500px] h-[220px] rounded-xl overflow-hidden">
            @if (mapUrl) {
              <iframe
                [src]="mapUrl"
                loading="lazy"
                allowfullscreen
                class="w-full h-full border-0"
              ></iframe>
            }
          </div>
        </div>

        <div class="flex justify-center gap-3 mt-3">
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
    }

    <!-- COMMENT BOX -->
    <label class="block text-sm text-text-muted mb-2">
      Additional Comment (optional)
    </label>

    <textarea
      [(ngModel)]="editedData.comment"
      (ngModelChange)="editedDataChange.emit(editedData)"
      rows="4"
      placeholder="Anything else you'd like to add? (optional)"
      class="w-full rounded-lg p-3 border border-border bg-white
             focus:outline-none focus:border-text placeholder-gray-400 italic"
    ></textarea>

    <!-- FOOTER BUTTONS -->
    <div class="mt-6 flex justify-between">
      <button
        class="px-4 py-2 rounded-full border border-border text-text-muted"
        (click)="prev.emit()"
      >
        Previous
      </button>

      <button
        class="px-4 py-2 rounded-full bg-primary text-white"
        (click)="submit.emit()"
      >
        Submit Correction
      </button>
    </div>
  `
})
export class SuggestStep3Component {

  @Input() sections: Section[] = [];

  @Input() originalData: any = {};
  @Input() editedData: any = {};
  @Output() editedDataChange = new EventEmitter<any>();

  @Input() mapUrl: SafeResourceUrl | null = null;

  @Output() openExternalMap = new EventEmitter<void>();
  @Output() openDirections = new EventEmitter<void>();

  @Output() prev = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  @Input() changed!: (field: string) => boolean;
}
