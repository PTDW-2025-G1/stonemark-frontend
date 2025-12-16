import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSectionComponent } from './hero-section';
import { By } from '@angular/platform-browser';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section badge with correct text', () => {
    const badge = fixture.debugElement.query(By.css('.border.border-border'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent.trim()).toBe('About the Project');
  });

  it('should render badge with uppercase tracking-widest style', () => {
    const badge = fixture.debugElement.query(By.css('.uppercase.tracking-widest'));
    expect(badge).toBeTruthy();
  });

  it('should render the main heading with History in italic', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.textContent).toContain('Preserving');
    expect(heading.nativeElement.textContent).toContain('History');
    expect(heading.nativeElement.textContent).toContain('One Mark at a Time');
  });

  it('should have italic span for History word', () => {
    const italicSpan = fixture.debugElement.query(By.css('h1 .italic'));
    expect(italicSpan).toBeTruthy();
    expect(italicSpan.nativeElement.textContent).toBe('History');
  });

  it('should render subtitle paragraph', () => {
    const paragraph = fixture.debugElement.query(By.css('p.text-text-muted'));
    expect(paragraph).toBeTruthy();
    expect(paragraph.nativeElement.textContent).toContain('Stone Mark is a web application dedicated to the documentation');
    expect(paragraph.nativeElement.textContent).toContain('stonemason marks');
  });

  it('should have centered text layout', () => {
    const container = fixture.debugElement.query(By.css('.text-center'));
    expect(container).toBeTruthy();
  });

  it('should have proper section structure with padding', () => {
    const section = fixture.debugElement.query(By.css('section'));
    const classes = section.nativeElement.className;

    expect(classes).toContain('pt-32');
    expect(classes).toContain('pb-20');
  });

  it('should have max-width constraint on container', () => {
    const container = fixture.debugElement.query(By.css('.max-w-4xl'));
    expect(container).toBeTruthy();
  });

  it('should have font-serif on heading', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    expect(heading.nativeElement.className).toContain('font-serif');
  });

  it('should not render any images', () => {
    const images = fixture.debugElement.queryAll(By.css('img'));
    expect(images.length).toBe(0);
  });

  it('should not render any buttons or links', () => {
    const links = fixture.debugElement.queryAll(By.css('a'));
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(links.length).toBe(0);
    expect(buttons.length).toBe(0);
  });
});
