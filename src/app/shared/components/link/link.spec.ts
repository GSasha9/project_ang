import { describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Link } from './link';

describe('Link', () => {
  it('should create the link', () => {
    TestBed.configureTestingModule({ imports: [Link] });
    const fixture = TestBed.createComponent(Link);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
  });
});
