import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardComponent } from '../card/card.component';
import { loadPosts } from '@titlerotator/store';
import { IPost } from '@titlerotator/models';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;
  const initialState = {
    posts: [],
    selected: 1,
    loading: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatToolbarModule, MatSidenavModule, MatGridListModule, HomeComponent, CardComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    jest.spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should select posts from the store', () => {
    const posts: IPost[] = [{ id: 1, userId: 1, title: 'Post 1', body: 'Body 1' }];
    store.setState({
      posts,
      selected: 1,
      loading: false
    });

    component.postData$.subscribe(data => {
      expect(data).toEqual(posts);
    });
  });

  it('should select the selected post id from the store', () => {
    store.setState({
      posts: [],
      selected: 5,
      loading: false
    });

    component.selected$.subscribe(data => {
      expect(data).toEqual(5);
    });
  });

  it('should dispatch loadPosts action on init', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadPosts());
  });
});
