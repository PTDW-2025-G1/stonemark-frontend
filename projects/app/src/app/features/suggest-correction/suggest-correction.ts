import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizer, SafeResourceUrl, Title} from '@angular/platform-browser';
import { MonumentService } from '@core/services/monument.service';
import {SuggestTitleComponent} from '@features/suggest-correction/sections/suggest-title';
import {SuggestProgressBarComponent} from '@features/suggest-correction/sections/suggest-progress-bar';
import {SuggestStep1Component} from '@features/suggest-correction/sections/suggest-step1';
import {SuggestStep2Component} from '@features/suggest-correction/sections/suggest-step2';
import {SuggestStep3Component} from '@features/suggest-correction/sections/suggest-step3';

type Section = 'information' | 'history' | 'map';

@Component({
  selector: 'app-suggest-correction',
  standalone: true,
  imports: [CommonModule, FormsModule, SuggestTitleComponent, SuggestProgressBarComponent, SuggestStep1Component, SuggestStep2Component, SuggestStep3Component],
  templateUrl: './suggest-correction.html',
  styleUrls: []
})
export class SuggestCorrectionComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private monumentService: MonumentService,
    private sanitizer: DomSanitizer,
    private titleService: Title
  ) {}

  monumentId?: number | null;
  currentStep = 1;
  sections: Section[] = [];

  mapUrl: SafeResourceUrl | null = null;
  mapLoading = true;
  mapLoadError = false;


  originalData = {
    name: '',
    description: '',
    start_date: null as number | null,
    architect: '',
    artist_name: '',
    material: '',
    lat: null as number | null,
    lon: null as number | null,
    comment: ''
  };

  editedData = {
    name: '',
    description: '',
    start_date: null as number | null,
    architect: '',
    artist_name: '',
    material: '',
    lat: null as number | null,
    lon: null as number | null,
    comment: ''
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const idParam = params['monumentId'];
      if (!idParam) return;

      const id = Number(idParam);
      if (Number.isNaN(id)) return;

      this.monumentId = id;

      this.monumentService.getMonumentById(id).subscribe(monument => {
        if (!monument) return;

        this.originalData = {
          name: monument.name || '',
          description: monument.description || '',
          start_date: monument.start_date ?? null,
          architect: monument.architect || '',
          artist_name: monument.artist_name || '',
          material: monument.material || '',
          lat: monument.lat ?? null,
          lon: monument.lon ?? null,
          comment: ''
        };

        this.editedData = {
          name: this.originalData.name,
          description: this.originalData.description,
          start_date: this.originalData.start_date,
          architect: this.originalData.architect,
          artist_name: this.originalData.artist_name,
          material: this.originalData.material,
          lat: this.originalData.lat,
          lon: this.originalData.lon,
          comment: ''
        };

        this.titleService.setTitle(`${this.originalData.name} - Suggest a Correction`);

        this.updateMapPreview();
      });
    });
  }

  cancel() {
    window.history.back();
  }

  step2Valid() {
    if (this.sections.includes('information')) {
      if (!this.editedData.name.trim()) return false;
      if (!this.editedData.description.trim()) return false;
    }

    if (this.sections.includes('history')) {
      if (this.editedData.start_date === null) return false;
      if (!this.editedData.architect.trim()) return false;
      if (!this.editedData.artist_name.trim()) return false;
      if (!this.editedData.material.trim()) return false;
    }

    if (this.sections.includes('map')) {
      if (!this.editedData.lat && this.editedData.lat !== 0) return false;
      if (!this.editedData.lon && this.editedData.lon !== 0) return false;
    }

    return true;
  }

  next() {
    if (this.currentStep === 1 && this.sections.length === 0) return;

    if (this.currentStep === 1) {
      this.editedData = { ...this.originalData, comment: '' };
      this.updateMapPreview();
    }

    if (this.currentStep === 2 && !this.step2Valid()) {
      return;
    }

    if (this.currentStep < 3) this.currentStep++;
  }

  prev() {
    if (this.currentStep > 1) this.currentStep--;
  }

  changed(field: string) {
    if (field === 'start_date') {
      const orig = this.originalData.start_date;
      const edit = this.editedData.start_date;
      if (orig == null && edit == null) return false;
      return Number(orig) !== Number(edit);
    }

    const origVal = (this.originalData as any)[field] ?? '';
    const editVal = (this.editedData as any)[field] ?? '';

    return String(origVal).trim() !== String(editVal).trim();
  }

  updateMapPreview() {
    if (this.editedData.lat == null || this.editedData.lon == null) {
      this.mapUrl = null;
      return;
    }

    this.mapLoading = true;
    this.mapLoadError = false;

    const lat = this.editedData.lat;
    const lon = this.editedData.lon;

    const url = `https://maps.google.com/maps?q=${lat},${lon}&z=16&output=embed&hl=pt-PT`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openExternalMap() {
    const lat = this.editedData.lat;
    const lon = this.editedData.lon;
    if (lat == null || lon == null) return;

    window.open(`https://www.google.com/maps?q=${lat},${lon}`, "_blank");
  }

  openDirections() {
    const lat = this.editedData.lat;
    const lon = this.editedData.lon;
    if (lat == null || lon == null) return;

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
      "_blank"
    );
  }

  openGoogleMaps() {
    const lat = this.editedData.lat ?? this.originalData.lat ?? 0;
    const lon = this.editedData.lon ?? this.originalData.lon ?? 0;

    window.open(`https://www.google.com/maps/@${lat},${lon},18z`, '_blank');
  }

  submit() {
    const payload = {
      monumentId: this.monumentId,
      sections: this.sections,
      data: { ...this.editedData }
    };

    console.log('Submitting suggestion payload:', payload);
    alert('Suggestion submitted (demo). Ver console.');

    this.currentStep = 1;
    this.sections = [];

    this.editedData = { ...this.originalData, comment: '' };
    this.updateMapPreview();
  }

  progressPercent() {
    return ((this.currentStep - 1) / 2) * 100;
  }

  showInformationFields() {
    return this.sections.includes('information');
  }

  showHistoryFields() {
    return this.sections.includes('history');
  }

  showMapFields() {
    return this.sections.includes('map');
  }

  protected readonly name = name;
}
