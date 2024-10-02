import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  nombre: string;
  proveedor: string;
  precio: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  updateCartItems(items: any[]) {
    this.cartSubject.next(items);
  }

  getCartItems() {
    return this.cartSubject.asObservable();
  }

  addToCart(item: CartItem) {
    this.items.push(item);
    this.cartSubject.next(this.items);
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.cartSubject.next(this.items);
  }
}
