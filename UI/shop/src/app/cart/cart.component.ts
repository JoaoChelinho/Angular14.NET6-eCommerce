import { Component } from '@angular/core';
import { CartItem } from '../shared/models/cart-item';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  total = 0;
  cartItems: CartItem[] = [];


  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

  decreaseQuantity(index: number) {
    this.cartService.decreaseQuantity(index);
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

  increaseQuantity(index: number) {
    this.cartService.increaseQuantity(index);
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }
}
