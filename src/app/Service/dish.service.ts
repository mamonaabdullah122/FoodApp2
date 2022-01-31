import { Injectable } from '@angular/core';
import { Dish } from '../menu/shared/dish';
import { DISHES } from '../menu/shared/dishes';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  postComment(_id: (_id: any) => void, value: any) {
    throw new Error('Method not implemented.');
  }
  putDish(dishcopy: Dish) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  getDishes(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(2000));
  }

  getDish(id: number): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }

  getDishIds(): Observable<string[] | any>{
    return of(DISHES.map(dish => dish.id));
  }
}
