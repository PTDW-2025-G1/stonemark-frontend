import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacySectionComponent } from './privacy-section';
import { By } from '@angular/platform-browser';

describe('PrivacySectionComponent', () => {
  let component: PrivacySectionComponent;
  let fixture: ComponentFixture<PrivacySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacySectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section label', () => {
    const label = fixture.debugElement.query(By.css('.uppercase.tracking-widest'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.textContent.trim()).toBe('Privacy & Security');
  });

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.textContent.trim()).toBe('Your Privacy Matters');
  });

  it('should render GDPR compliance description', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    const description = paragraphs[0];
    expect(description.nativeElement.textContent).toContain('Fully GDPR compliant');
  });

  it('should render What We Store section', () => {
    const h3Elements = fixture.debugElement.queryAll(By.css('h3'));
    const whatWeStoreHeading = h3Elements.find(el => el.nativeElement.textContent.trim() === 'What We Store');
    expect(whatWeStoreHeading).toBeTruthy();
  });

  it('should render Your Rights section', () => {
    const h3Elements = fixture.debugElement.queryAll(By.css('h3'));
    const yourRightsHeading = h3Elements.find(el => el.nativeElement.textContent.trim() === 'Your Rights');
    expect(yourRightsHeading).toBeTruthy();
  });

  it('should render 3 items in What We Store', () => {
    const h4Elements = fixture.debugElement.queryAll(By.css('h4'));
    const whatWeStoreItems = h4Elements.slice(0, 3);
    expect(whatWeStoreItems.length).toBe(3);
    expect(whatWeStoreItems[0].nativeElement.textContent.trim()).toBe('Photo Metadata');
    expect(whatWeStoreItems[1].nativeElement.textContent.trim()).toBe('User Attribution');
    expect(whatWeStoreItems[2].nativeElement.textContent.trim()).toBe('Submission History');
  });

  it('should render 3 items in Your Rights', () => {
    const h4Elements = fixture.debugElement.queryAll(By.css('h4'));
    const yourRightsItems = h4Elements.slice(3, 6);
    expect(yourRightsItems.length).toBe(3);
    expect(yourRightsItems[0].nativeElement.textContent.trim()).toBe('Full Control');
    expect(yourRightsItems[1].nativeElement.textContent.trim()).toBe('Data Removal');
    expect(yourRightsItems[2].nativeElement.textContent.trim()).toBe('No Sharing');
  });

  it('should render A Promise of Trust section', () => {
    const h3Elements = fixture.debugElement.queryAll(By.css('h3'));
    const promiseHeading = h3Elements.find(el => el.nativeElement.textContent.trim() === 'A Promise of Trust');
    expect(promiseHeading).toBeTruthy();
  });

  it('should render privacy policy link', () => {
    const link = fixture.debugElement.query(By.css('a[href="/privacy-policy"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent.trim()).toBe('Privacy Policy');
  });

  it('should have grid layout for What We Store', () => {
    const grids = fixture.debugElement.queryAll(By.css('.grid.grid-cols-1.md\\:grid-cols-3'));
    expect(grids.length).toBe(2);
  });

  it('should have border-left on list items', () => {
    const listItems = fixture.debugElement.queryAll(By.css('.border-l-2.border-border'));
    expect(listItems.length).toBe(6);
  });

  it('should have hover effect on list items', () => {
    const listItems = fixture.debugElement.queryAll(By.css('.hover\\:border-primary'));
    expect(listItems.length).toBe(6);
  });

  it('should have proper section padding', () => {
    const section = fixture.debugElement.query(By.css('section'));
    const classes = section.nativeElement.className;
    expect(classes).toContain('py-24');
    expect(classes).toContain('px-6');
  });

  it('should have border-top on section', () => {
    const section = fixture.debugElement.query(By.css('section.border-t.border-border'));
    expect(section).toBeTruthy();
  });

  it('should have font-serif on headings', () => {
    const h3Elements = fixture.debugElement.queryAll(By.css('h3.font-serif'));
    expect(h3Elements.length).toBe(3);
  });

  it('should render promise card with border', () => {
    const card = fixture.debugElement.query(By.css('.bg-surface-alt.border.border-border'));
    expect(card).toBeTruthy();
  });

  it('should mention data never being sold', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    const promiseText = paragraphs.find(p => p.nativeElement.textContent.includes('never sell your data'));
    expect(promiseText).toBeTruthy();
  });
});

