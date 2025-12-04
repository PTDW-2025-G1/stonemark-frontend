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

  it('should render the main heading', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading.nativeElement.textContent.trim()).toBe('Your Privacy Matters');
  });

  it('should render the section description about GDPR', () => {
    const description = fixture.debugElement.query(By.css('.text-xl.text-text-muted'));
    expect(description.nativeElement.textContent).toContain('Fully GDPR compliant');
  });

  it('should render 2 privacy cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.bg-surface.p-8.rounded-2xl'));
    expect(cards.length).toBe(2);
  });

  it('should render "What We Store" card heading', () => {
    const headings = fixture.debugElement.queryAll(By.css('h3'));
    expect(headings[0].nativeElement.textContent.trim()).toBe('What We Store');
  });

  it('should render "Your Rights" card heading', () => {
    const headings = fixture.debugElement.queryAll(By.css('h3'));
    expect(headings[1].nativeElement.textContent.trim()).toBe('Your Rights');
  });

  it('should render database-lock icon for What We Store card', () => {
    const icon = fixture.debugElement.query(By.css('.bi-database-lock'));
    expect(icon).toBeTruthy();
  });

  it('should render person-check-fill icon for Your Rights card', () => {
    const icon = fixture.debugElement.query(By.css('.bi-person-check-fill'));
    expect(icon).toBeTruthy();
  });

  it('should render 3 items in What We Store list', () => {
    const storeCard = fixture.debugElement.queryAll(By.css('.bg-surface.p-8.rounded-2xl'))[0];
    const listItems = storeCard.queryAll(By.css('li'));
    expect(listItems.length).toBe(3);
  });

  it('should render 3 items in Your Rights list', () => {
    const rightsCard = fixture.debugElement.queryAll(By.css('.bg-surface.p-8.rounded-2xl'))[1];
    const listItems = rightsCard.queryAll(By.css('li'));
    expect(listItems.length).toBe(3);
  });

  it('should mention photo file with GPS metadata in What We Store', () => {
    const storeCard = fixture.debugElement.queryAll(By.css('.bg-surface.p-8.rounded-2xl'))[0];
    expect(storeCard.nativeElement.textContent).toContain('Photo file with basic metadata');
  });

  it('should mention User ID for authorship in What We Store', () => {
    const storeCard = fixture.debugElement.queryAll(By.css('.bg-surface.p-8.rounded-2xl'))[0];
    expect(storeCard.nativeElement.textContent).toContain('User ID for proper authorship');
  });

  it('should mention submission status in What We Store', () => {
    const storeCard = fixture.debugElement.queryAll(By.css('.bg-surface.p-8.rounded-2xl'))[0];
    expect(storeCard.nativeElement.textContent).toContain('Submission status and review history');
  });

  it('should mention edit or delete submissions in Your Rights', () => {
    const rightsCard = fixture.debugElement.queryAll(By.css('.bg-surface.p-8.rounded-2xl'))[1];
    expect(rightsCard.nativeElement.textContent).toContain('Edit or delete your submissions');
  });

  it('should mention data removal in Your Rights', () => {
    const rightsCard = fixture.debugElement.queryAll(By.css('.bg-surface.p-8.rounded-2xl'))[1];
    expect(rightsCard.nativeElement.textContent).toContain('Request complete data removal');
  });

  it('should mention no personal data shared in Your Rights', () => {
    const rightsCard = fixture.debugElement.queryAll(By.css('.bg-surface.p-8.rounded-2xl'))[1];
    expect(rightsCard.nativeElement.textContent).toContain('No personal data shared without consent');
  });

  it('should render privacy footer message', () => {
    const footer = fixture.debugElement.query(By.css('.mt-12'));
    expect(footer.nativeElement.textContent).toContain('We never sell your data');
  });

  it('should render link to Privacy Policy', () => {
    const link = fixture.debugElement.query(By.css('a[href="/privacy"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent.trim()).toBe('Privacy Policy');
  });

  it('should render shield-fill-check icon in footer', () => {
    const icon = fixture.debugElement.query(By.css('.bi-shield-fill-check'));
    expect(icon).toBeTruthy();
  });

  it('should have proper grid layout for privacy cards', () => {
    const grid = fixture.debugElement.query(By.css('.grid.md\\:grid-cols-2'));
    expect(grid).toBeTruthy();
  });

  it('should have success border styling on What We Store card', () => {
    const storeCard = fixture.debugElement.queryAll(By.css('.border-2.border-success\\/20'))[0];
    expect(storeCard).toBeTruthy();
  });

  it('should have primary border styling on Your Rights card', () => {
    const rightsCard = fixture.debugElement.query(By.css('.border-2.border-primary\\/20'));
    expect(rightsCard).toBeTruthy();
  });

  it('should render check-circle-fill icons for list items', () => {
    const checkIcons = fixture.debugElement.queryAll(By.css('.bi-check-circle-fill'));
    expect(checkIcons.length).toBe(6);
  });
});
