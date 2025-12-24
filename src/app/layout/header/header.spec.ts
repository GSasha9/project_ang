import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';

import { clickHelper } from '../../../test/click-helper';
import { Home } from '../../pages/home/home';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([{ path: '', component: Home }])],
    });
    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
  });

  it('should create the header', () => {
    expect(component).toBeDefined();
  });

  it('should have burger menu element', () => {
    const headerElement: HTMLElement = fixture.nativeElement;
    const burgerMenu = headerElement.querySelector('.burger');
    expect(burgerMenu).toBeDefined();
  });

  it('clicking on burger element should open hidden menu', () => {
    const headerElement: HTMLElement = fixture.nativeElement;
    const burgerMenu = headerElement.querySelector('.burger') as HTMLElement;
    const hiddenMenu = headerElement.querySelector('.open');

    expect(hiddenMenu).toBeNull();

    clickHelper(burgerMenu);

    expect(hiddenMenu).toBeDefined();
  });
});
