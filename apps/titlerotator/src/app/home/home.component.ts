import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AsyncPipe, CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IPost } from '@titlerotator/models';
import { loadPosts, loading, selectPosts, selected } from '@titlerotator/store';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
    MatProgressBarModule,
    AsyncPipe,
    CardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  postData$: Observable<IPost[]> = this.store.select(selectPosts);
  selected$: Observable<number> = this.store.select(selected);
  loading$: Observable<boolean> = this.store.select(loading);
    
  constructor(private readonly store: Store) { }

  public ngOnInit(): void {
    this.store.dispatch(loadPosts());
  }
    
 }

