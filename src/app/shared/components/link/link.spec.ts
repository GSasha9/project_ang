import { describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Link } from './link';
import { provideRouter } from '@angular/router';
import { Home } from '../../../pages/home/home';

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
