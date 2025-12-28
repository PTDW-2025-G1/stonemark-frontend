import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CtaSectionComponent } from './cta-section';
import { By } from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

describe('CtaSectionComponent', () => {
  let component: CtaSectionComponent;
  let fixture: ComponentFixture<CtaSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaSectionComponent, RouterTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(CtaSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.textContent.trim()).toBe('Join Us in Preserving History');
  });

  it('should render the description paragraph', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    const description = paragraphs[0];
    expect(description.nativeElement.textContent).toContain('Be part of a global movement');
  });

  it('should have a link to search monuments', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const startExploringBtn = buttons.find(
      btn => btn.componentInstance.routerLink === '/search/monuments'
    );
    expect(startExploringBtn).toBeTruthy();
    const innerEl = startExploringBtn!.nativeElement.querySelector('a,button');
    expect(innerEl).toBeTruthy();
    expect(innerEl.textContent.trim()).toBe('Start Exploring');
  });

  it('should have a link to contact page', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const getInTouchBtn = buttons.find(
      btn => btn.componentInstance.routerLink === '/contact'
    );
    expect(getInTouchBtn).toBeTruthy();
    const innerEl = getInTouchBtn!.nativeElement.querySelector('a,button');
    expect(innerEl).toBeTruthy();
    expect(innerEl.textContent.trim()).toBe('Get in Touch');
  });

  it('should apply primary button styles to Start Exploring link', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const startExploringBtn = buttons.find(
      btn => btn.componentInstance.routerLink === '/search/monuments'
    );
    expect(startExploringBtn).toBeTruthy();
    const innerEl = startExploringBtn!.nativeElement.querySelector('a,button');
    expect(innerEl).toBeTruthy();
    const classes = innerEl.className;
    expect(classes).toContain('bg-black');
    expect(classes).toContain('text-white');
    expect(classes).toContain('border-black');
  });

  it('should apply secondary button styles to Get in Touch link', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    const getInTouchBtn = buttons.find(
      btn => btn.componentInstance.routerLink === '/contact'
    );
    expect(getInTouchBtn).toBeTruthy();
    const innerEl = getInTouchBtn!.nativeElement.querySelector('a,button');
    expect(innerEl).toBeTruthy();
    const classes = innerEl.className;
    expect(classes).toContain('bg-white');
    expect(classes).toContain('text-black');
    expect(classes).toContain('border-black');
  });

  it('should render both action buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    expect(buttons.length).toBe(2);
  });

  it('should have proper section structure', () => {
    const section = fixture.debugElement.query(By.css('section'));
    expect(section).toBeTruthy();
    expect(section.nativeElement.className).toContain('py-24');
  });

  it('should have border-top on section', () => {
    const section = fixture.debugElement.query(By.css('section.border-t.border-border'));
    expect(section).toBeTruthy();
  });

  it('should have centered text layout', () => {
    const container = fixture.debugElement.query(By.css('.text-center'));
    expect(container).toBeTruthy();
  });

  it('should have font-serif on heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.className).toContain('font-serif');
  });

  it('should render italic closing statement', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    const lastParagraph = paragraphs[paragraphs.length - 1];
    expect(lastParagraph.nativeElement.className).toContain('italic');
    expect(lastParagraph.nativeElement.textContent).toContain('Open collaboration');
  });
});
