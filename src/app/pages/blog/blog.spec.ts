import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideState, provideStore } from '@ngrx/store';
import { postsFeature } from '@state/posts/posts.feature';
import { userLoginReducer } from '@state/users/users-login.reducer';
import { usersRegisterReducer } from '@state/users/users-register.reducer';

import { Blog } from './blog';

describe('Blog', () => {
  let component: Blog;
  let fixture: ComponentFixture<Blog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blog],
      providers: [
        provideStore({
          usersLogIn: userLoginReducer,
          usersRegister: usersRegisterReducer,
        }),
        provideState(postsFeature),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Blog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
