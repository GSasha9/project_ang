import { describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Menu } from './menu';

describe('Menu', () => {
  it('should create the menu', () => {
    TestBed.configureTestingModule({ imports: [Menu] });
    const fixture = TestBed.createComponent(Menu);
    const component = fixture.componentInstance;

    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('app-link');

    expect(links.length).toBe(0);

    expect(component).toBeDefined();
  });
});
