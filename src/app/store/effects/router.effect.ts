import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, Effect } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import * as routerActions from '../actions/router.action';

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions, private router: Router, private loaction: Location) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(routerActions.GO).pipe(
    map((action: routerActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.ofType(routerActions.BACK).pipe(tap(() => this.loaction.back()));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
    .ofType(routerActions.FORWARD)
    .pipe(tap(() => this.loaction.forward()));
}
