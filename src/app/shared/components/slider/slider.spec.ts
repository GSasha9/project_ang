import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lesson } from '../../../layout/slides/lesson/lesson';
import { Slider } from './slider';

describe('Slider', () => {
  let component: Slider;
  let fixture: ComponentFixture<Slider>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Slider],
    }).compileComponents();

    fixture = TestBed.createComponent(Slider);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('renders all slides', () => {
    fixture.componentRef.setInput('slides', [Lesson, Lesson, Lesson]);
    fixture.detectChanges();

    const sliderDots = fixture.nativeElement.querySelectorAll('.dot');

    expect(sliderDots.length).toBe(3);
  });
});
