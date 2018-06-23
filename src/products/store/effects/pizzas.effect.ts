import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
import * as pizzasActions from '../actions/pizzas.action';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffect {
  constructor(private actions$: Actions, private pizzaService: fromServices.PizzasService) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzasActions.LOAD_PIZZAS).pipe(
    switchMap(() => this.pizzaService.getPizzas()),
    map(pizzas => new pizzasActions.LoadPizzasSuccess(pizzas)),
    catchError(error => of(new pizzasActions.LoadPizzasFail(error)))
  );

  @Effect()
  createPizza$ = this.actions$.ofType(pizzasActions.CREATE_PIZZA).pipe(
    map((action: pizzasActions.CreatePizza) => action.payload),
    switchMap(pizza => this.pizzaService.createPizza(pizza)),
    map(pizza => new pizzasActions.CreatePizzaSuccess(pizza)),
    catchError(error => of(new pizzasActions.CreatePizzaFail(error)))
  );

  @Effect()
  createPizzaSuccess$ = this.actions$.ofType(pizzasActions.CREATE_PIZZA_SUCCESS).pipe(
    map((action: pizzasActions.CreatePizzaSuccess) => action.payload),
    map(pizza => {
      return new fromRoot.Go({
        path: ['/products', pizza.id]
      });
    })
  );

  @Effect()
  updatePizza$ = this.actions$.ofType(pizzasActions.UPDATE_PIZZA).pipe(
    map((action: pizzasActions.UpdatePizza) => action.payload),
    switchMap(pizza => this.pizzaService.updatePizza(pizza)),
    map(pizza => new pizzasActions.UpdatePizzaSuccess(pizza)),
    catchError(error => of(new pizzasActions.UpdatePizzaFail(error)))
  );

  @Effect()
  deletePizza$ = this.actions$.ofType(pizzasActions.DELETE_PIZZA).pipe(
    map((action: pizzasActions.DeletePizza) => action.payload),
    switchMap(pizza => this.pizzaService.removePizza(pizza)),
    map(pizza => new pizzasActions.DeletePizzaSuccess(pizza)),
    catchError(error => of(new pizzasActions.DeletePizzaFail(error)))
  );

  @Effect()
  handlePizzaSuccess$ = this.actions$
    .ofType(pizzasActions.UPDATE_PIZZA_SUCCESS, pizzasActions.DELETE_PIZZA_SUCCESS)
    .pipe(
      map(pizza => {
        return new fromRoot.Go({
          path: ['/products']
        });
      })
    );
}
