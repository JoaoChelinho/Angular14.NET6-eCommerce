import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../shared/models/product';
import { CartItem } from '../shared/models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  products: Product[] = [];
  cartUpdated = new EventEmitter<number>();

  constructor() {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      this.cartItems = JSON.parse(cartItems);
    }
  }


  addToCart(cartItem: CartItem) {
    const existingCartItemIndex = this.cartItems.findIndex(item => item.productName === cartItem.productName);
    if (existingCartItemIndex > -1) {
      this.cartItems[existingCartItemIndex].quantity++;
    } else {
      this.cartItems.push(cartItem);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartUpdated.emit(this.cartItems.length);
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    } else {
      this.removeItem(index);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartUpdated.emit(this.cartItems.length);
  }

  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartUpdated.emit(this.cartItems.length);
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartUpdated.emit(this.cartItems.length);
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
    this.cartUpdated.emit(this.cartItems.length);
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.productPrice * item.quantity), 0);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getCartItemCount(): number {
    return this.cartItems.length;
  }

  getProductQuantityInCart(productId: number): number {
    const cartItem = this.cartItems.find(item => item.productId === productId);
    return cartItem ? cartItem.quantity : 0;
  }

  updateCartItemQuantity() {
    this.cartItems.forEach(item => {
      const cartNoElement = document.getElementById(`cart-${item.productId}`);
      if (cartNoElement) {
        cartNoElement.innerHTML = item.quantity.toString();
      }
    });
  }

  getQuantityByProductName(productName: string): number {
    const existingCartItem = this.cartItems.find(
      (item) => item.productName === productName
    );
    if (existingCartItem) {
      return existingCartItem.quantity;
    } else {
      return 0;
    }
  }

}
