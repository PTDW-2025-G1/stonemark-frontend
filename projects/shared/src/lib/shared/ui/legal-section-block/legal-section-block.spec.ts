import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LegalSectionBlockComponent } from './legal-section-block';
import { By } from '@angular/platform-browser';
import {Component} from '@angular/core';

describe('LegalSectionBlockComponent', () => {
  let component: LegalSectionBlockComponent;
  let fixture: ComponentFixture<LegalSectionBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalSectionBlockComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LegalSectionBlockComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleEl.textContent.trim()).toBe('Test Title');
  });

  it('should render multiple paragraphs', () => {
    component.title = 'Any';
    component.paragraphs = [
      'Paragraph 1',
      'Paragraph 2',
      'Paragraph 3'
    ];

    fixture.detectChanges();

    const pList = fixture.debugElement.queryAll(By.css('p'));
    expect(pList.length).toBe(3);

    expect(pList[0].nativeElement.textContent).toContain('Paragraph 1');
    expect(pList[1].nativeElement.textContent).toContain('Paragraph 2');
    expect(pList[2].nativeElement.textContent).toContain('Paragraph 3');
  });

  it('should apply mb-4 to all paragraphs except the last', () => {
    component.title = 'Any';
    component.paragraphs = ['A', 'B', 'C'];

    fixture.detectChanges();

    const pList = fixture.debugElement.queryAll(By.css('p'));

    expect(pList[0].nativeElement.classList).toContain('mb-4');
    expect(pList[1].nativeElement.classList).toContain('mb-4');
    expect(pList[2].nativeElement.classList).not.toContain('mb-4');
  });

  it('should render projected content when hasInnerContent = true', () => {

    @Component({
      standalone: true,
      imports: [LegalSectionBlockComponent],
      template: `
        <app-legal-section-block
          title="With Content"
          [hasInnerContent]="true">
          <div class="extra-content">Extra Block</div>
        </app-legal-section-block>
      `
    })
    class TestHost {}

    const hostFixture = TestBed.createComponent(TestHost);
    hostFixture.detectChanges();

    const projected = hostFixture.debugElement.query(By.css('.extra-content'));

    expect(projected).toBeTruthy();
    expect(projected.nativeElement.textContent.trim()).toBe('Extra Block');
  });

  it('should NOT render projected content when hasInnerContent = false', () => {

    @Component({
      standalone: true,
      imports: [LegalSectionBlockComponent],
      template: `
        <app-legal-section-block
          title="Without Content"
          [hasInnerContent]="false">
          <div class="extra-content">Should Not Appear</div>
        </app-legal-section-block>
      `
    })
    class TestHost {}

    const hostFixture = TestBed.createComponent(TestHost);
    hostFixture.detectChanges();

    const projected = hostFixture.debugElement.query(By.css('.extra-content'));
    expect(projected).toBeNull();
  });

});
