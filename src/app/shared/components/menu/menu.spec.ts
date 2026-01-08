import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { MenuItems } from '@shared/models/menuItems.model';
import { describe, expect, it } from 'vitest';

import { Menu } from './menu';

describe('Menu', () => {
  let fixture: ComponentFixture<Menu>;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Menu], providers: [provideRouter([])] });
    fixture = TestBed.createComponent(Menu);
  });

  it('should create the menu', () => {
    fixture.componentRef.setInput('items', ['Home', 'Pricing']);

    fixture.detectChanges();

    const linkDEs = fixture.debugElement.queryAll(By.css('app-link'));
    expect(linkDEs.length).toBe(2);
  });

  it('should call handleClick on item click', () => {
    const mockItem: MenuItems = {
      id: 1,
      title: 'Home',
      route: 'home',
    };
    fixture.componentRef.setInput('items', [mockItem]);

    fixture.detectChanges();

    vi.spyOn(fixture.componentInstance.clicked, 'emit');

    const link = fixture.nativeElement.querySelector('[data-testid="menu-item"]');

    link.click();

    expect(fixture.componentInstance.clicked.emit).toHaveBeenCalledWith(mockItem);
  });
});
