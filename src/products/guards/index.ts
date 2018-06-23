import { PizzasGuard } from './pizzas.guard';
import { PizzasExistsGuard } from './pizza-exists.guard';

export const guards: any[] = [PizzasGuard, PizzasExistsGuard];

export * from './pizzas.guard';
export * from './pizza-exists.guard';
