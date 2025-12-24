import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Home } from '../../pages/home/home';
import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [Footer],
      providers: [provideRouter([{ path: '', component: Home }])],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create the footer', () => {
    expect(component).toBeTruthy();
  });
});
