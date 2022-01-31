import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  postFavorite(_id: (_id: any) => void) {
    throw new Error('Method not implemented.');
  }
  isFavorite(_id: (_id: string) => void) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
