import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';

import { setCurrentSelected } from '@titlerotator/store';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let store: MockStore;
  const initialState = { selected: 1 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatRippleModule, CardComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    jest.spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.post = { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' };
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize keys and index on ngOnInit', () => {
    component.ngOnInit();
    expect(component['keys']).toEqual(['id', 'userId', 'title', 'body']);
    expect(component.key).toBe('title');
    expect(component.value).toBe('Post 1');
  });

  it('should reset index to 2 when selected$ does not match post.id', () => {
    component.ngOnInit();
    store.setState({ selected: 2 });
    component.selected$.subscribe();
    fixture.detectChanges();
    
    expect(component['index']).toBe(2);
  });

  it('should update index and dispatch setCurrentSelected on onClick', () => {
    component.ngOnInit();
    component.onClick();
    expect(component['index']).toBe(3);
    expect(store.dispatch).toHaveBeenCalledWith(setCurrentSelected({ id: component.post.id }));
  });

  it('should clean up on destroy', () => {
    const destroy$Spy = jest.spyOn(component['destroy$'], 'next');
    component.ngOnDestroy();
    expect(destroy$Spy).toHaveBeenCalled();
  });

});
