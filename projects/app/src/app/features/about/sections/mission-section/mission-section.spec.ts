import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MissionSectionComponent } from './mission-section';
import { By } from '@angular/platform-browser';

describe('MissionSectionComponent', () => {
  let component: MissionSectionComponent;
  let fixture: ComponentFixture<MissionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MissionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section label', () => {
    const label = fixture.debugElement.query(By.css('.uppercase.tracking-widest'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.textContent.trim()).toBe('Our Mission');
  });

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h3'));
    expect(heading.nativeElement.textContent.trim()).toBe('Bridging Past & Present');
  });

  it('should render the first mission paragraph with highlighted keywords', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    const firstParagraph = paragraphs[0].nativeElement;

    expect(firstParagraph.textContent).toContain('cultural heritage');
    expect(firstParagraph.textContent).toContain('field data collection');
    expect(firstParagraph.textContent).toContain('digital technology');
  });

  it('should render the second mission paragraph', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    const secondParagraph = paragraphs[1].nativeElement;

    expect(secondParagraph.textContent).toContain('Every stonemason mark tells a story');
    expect(secondParagraph.textContent).toContain('Stone Mark brings these stories to light');
  });

  it('should have strong tags for highlighted text', () => {
    const strongTags = fixture.debugElement.queryAll(By.css('strong'));
    expect(strongTags.length).toBe(3);

    expect(strongTags[0].nativeElement.textContent).toBe('cultural heritage');
    expect(strongTags[1].nativeElement.textContent).toBe('field data collection');
    expect(strongTags[2].nativeElement.textContent).toBe('digital technology');
  });

  it('should have proper grid layout classes', () => {
    const mainGrid = fixture.debugElement.query(By.css('.grid.grid-cols-1.md\\:grid-cols-2'));
    expect(mainGrid).toBeTruthy();
  });

  it('should render image with about_1.png', () => {
    const image = fixture.debugElement.query(By.css('img'));
    expect(image).toBeTruthy();
    expect(image.nativeElement.getAttribute('src')).toBe('assets/images/about_1.png');
    expect(image.nativeElement.getAttribute('alt')).toBe('Stone carving detail');
  });

  it('should have image with grayscale hover effect', () => {
    const image = fixture.debugElement.query(By.css('img'));
    const classes = image.nativeElement.className;
    expect(classes).toContain('grayscale');
    expect(classes).toContain('hover:grayscale-0');
  });

  it('should have border-top on section', () => {
    const section = fixture.debugElement.query(By.css('.border-t.border-border'));
    expect(section).toBeTruthy();
  });

  it('should have proper padding on content area', () => {
    const contentDiv = fixture.debugElement.query(By.css('.p-12.md\\:p-24'));
    expect(contentDiv).toBeTruthy();
  });

  it('should have split screen layout (text left, image right)', () => {
    const grid = fixture.debugElement.query(By.css('.grid.grid-cols-1.md\\:grid-cols-2'));
    const children = grid.nativeElement.children;
    expect(children.length).toBe(2);
  });

  it('should have image with mix-blend-multiply', () => {
    const image = fixture.debugElement.query(By.css('img.mix-blend-multiply'));
    expect(image).toBeTruthy();
  });

  it('should have background surface-muted on image container', () => {
    const imageContainer = fixture.debugElement.query(By.css('.bg-surface-muted'));
    expect(imageContainer).toBeTruthy();
  });

  it('should have font-serif on heading', () => {
    const heading = fixture.debugElement.query(By.css('h3'));
    expect(heading.nativeElement.className).toContain('font-serif');
  });
});
