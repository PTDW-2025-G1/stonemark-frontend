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
    protectionTitle: '',
    website: '',
    latitude: null as number | null,
    longitude: null as number | null,
    comment: ''
  };

  editedData = {
    name: '',
    description: '',
    protectionTitle: '',
    website: '',
    latitude: null as number | null,
    longitude: null as number | null,
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
          protectionTitle: monument.protectionTitle || '',
          website: monument.website || '',
          latitude: monument.latitude ?? null,
          longitude: monument.longitude ?? null,
          comment: ''
        };

        this.editedData = {
          name: this.originalData.name,
          description: this.originalData.description,
          protectionTitle: this.originalData.protectionTitle,
          website: this.originalData.website,
          latitude: this.originalData.latitude,
          longitude: this.originalData.longitude,
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

    if (this.sections.includes('map')) {
      if (!this.editedData.latitude && this.editedData.latitude !== 0) return false;
      if (!this.editedData.longitude && this.editedData.longitude !== 0) return false;
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
    const origVal = (this.originalData as any)[field] ?? '';
    const editVal = (this.editedData as any)[field] ?? '';

    return String(origVal).trim() !== String(editVal).trim();
  }

  updateMapPreview() {
    if (this.editedData.latitude == null || this.editedData.longitude == null) {
      this.mapUrl = null;
      return;
    }

    this.mapLoading = true;
    this.mapLoadError = false;

    const latitude = this.editedData.latitude;
    const longitude = this.editedData.longitude;

    const url = `https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed&hl=pt-PT`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openExternalMap() {
    const latitude = this.editedData.latitude;
    const longitude = this.editedData.longitude;
    if (latitude == null || longitude == null) return;

    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, "_blank");
  }

  openDirections() {
    const latitude = this.editedData.latitude;
    const longitude = this.editedData.longitude;
    if (latitude == null || longitude == null) return;

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
      "_blank"
    );
  }

  openGoogleMaps() {
    const lat = this.editedData.latitude ?? this.originalData.latitude ?? 0;
    const lon = this.editedData.longitude ?? this.originalData.longitude ?? 0;

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

  protected readonly name = name;
}
