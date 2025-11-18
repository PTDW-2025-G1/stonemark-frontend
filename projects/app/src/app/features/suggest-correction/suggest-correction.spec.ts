import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestCorrection } from './suggest-correction';

describe('SuggestCorrection', () => {
  let component: SuggestCorrection;
  let fixture: ComponentFixture<SuggestCorrection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestCorrection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestCorrection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
