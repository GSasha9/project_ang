import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { beforeEach, describe, expect, it } from 'vitest';

import { clickHelper } from '../../../test/click-helper';
import { Home } from '../../pages/home/home';
import { Header } from './header';

describe('Header', () => {
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([{ path: '', component: Home }]), provideStore()],
    });
    fixture = TestBed.createComponent(Header);
  });

  it('should have burger menu element', () => {
    const headerElement: HTMLElement = fixture.nativeElement;
    const burgerMenu = headerElement.querySelector('.burger');
    expect(burgerMenu).toBeDefined();
  });

  it('clicking on burger element should open hidden menu', () => {
    const headerElement: HTMLElement = fixture.nativeElement;
    const burgerMenu = headerElement.querySelector('.navbar-toggler') as HTMLElement;
    const hiddenMenu = headerElement.querySelectorAll('.nav-item');

    expect(hiddenMenu.length).toEqual(0);

    clickHelper(burgerMenu);

    expect(hiddenMenu).toBeDefined();
  });
});
