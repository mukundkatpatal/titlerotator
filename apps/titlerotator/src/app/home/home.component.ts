import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IPost } from '@titlerotator/models';
import { loadPosts, selectPosts, selected } from '@titlerotator/store';
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
    AsyncPipe,
    CardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  postData$: Observable<IPost[]> = this.store.select(selectPosts);
  selected$: Observable<number> = this.store.select(selected);
    
  constructor(private readonly store: Store) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public ngOnInit(): void {
    this.store.dispatch(loadPosts());
  }
    
 }

