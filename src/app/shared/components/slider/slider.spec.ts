import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Lesson2 } from 'app/layout/slides/lesson-2/lesson-2';
import { clickHelper } from 'test/click-helper';

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

  it('renders all pagination dots', () => {
    fixture.componentRef.setInput('slides', [Lesson, Lesson, Lesson]);
    fixture.detectChanges();

    const sliderDots = fixture.nativeElement.querySelectorAll('.dot');

    expect(sliderDots.length).toBe(3);
  });

  it('renders all slides', () => {
    fixture.componentRef.setInput('slides', [Lesson, Lesson2]);
    fixture.detectChanges();

    const sliderDots = fixture.nativeElement.querySelectorAll('.dot');

    expect(sliderDots.length).toBe(2);

    clickHelper(sliderDots[0]);

    expect(fixture.nativeElement.querySelector('app-lesson')).toBeDefined();

    clickHelper(sliderDots[1]);

    expect(fixture.nativeElement.querySelector('app-lesson-2')).toBeDefined();
  });
});
