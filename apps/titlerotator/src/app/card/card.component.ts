import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { IPost } from '@titlerotator/models';
import { MatRippleModule } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { selected, setCurrentSelected } from '@titlerotator/store';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatRippleModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit, OnDestroy {
  @Input()
  post!: IPost;
  public key?: keyof IPost;
  public value?: any;  
  public selected$: Observable<number> = this.store.select(selected);
  private keys: (keyof IPost)[] = [];
  private _currentIndex = 2;
  private destroy$ = new Subject<void>();
  constructor(private readonly store: Store) {
  }

  public ngOnInit(): void {
    this.keys = Object.keys(this.post) as (keyof IPost)[];
    this.index = this._currentIndex;
    this.selected$.pipe(takeUntil(this.destroy$)).subscribe(x => {
      if (x !== this.post.id) {
        this.index = 2;
      }
    });
  }
 
  public onClick(): void {
    this.index = (this.index + 1) % this.keys.length;
    this.store.dispatch(setCurrentSelected({ id: this.post.id }));
  }

  ngOnDestroy(): void {
    this.destroy$?.next();
    this.destroy$?.complete();
  }

  private set index(currentIndex: number) {
    this.key = this.keys[currentIndex];
    this.value = this.post[this.key];
    this._currentIndex = currentIndex;
  }

  private get index(): number {
    return this._currentIndex;
  }

}
