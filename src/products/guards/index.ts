import { PizzasGuard } from './pizzas.guard';
import { PizzasExistsGuard } from './pizza-exists.guard';
import { ToppingsGuard } from './toppings.guard';

export const guards: any[] = [PizzasGuard, PizzasExistsGuard, ToppingsGuard];

export * from './pizzas.guard';
export * from './pizza-exists.guard';
export * from './toppings.guard';
