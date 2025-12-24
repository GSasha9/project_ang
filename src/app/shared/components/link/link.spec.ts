import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';

import { Home } from '../../../pages/home/home';
import { Link } from './link';

describe('Link', () => {
  it('should create the link', async () => {
    TestBed.configureTestingModule({
      imports: [Link],
      providers: [
        provideRouter([
          {
            path: '',
            component: Home,
          },
        ]),
      ],
    });
    const fixture = TestBed.createComponent(Link);
    const component = fixture.componentInstance;

    expect(component).toBeDefined();
  });
});
