import { Component } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { ShopService } from 'src/app/shop/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  cartItems = 0;
  cartItemCount = 0;
  isUserLoggedIn = false;
  isAdminOrManager: boolean = false;

  constructor(
    private cartService: CartService,
    private shopService: ShopService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartItemCount = this.cartService.getCartItemCount();
    this.cartService.cartUpdated.subscribe((cartItemCount: number) => {
      this.cartItemCount = cartItemCount;
    });

    const role = localStorage.getItem('role');
    this.isAdminOrManager = role === 'Admin' || role === 'Manager';

    if (localStorage.getItem('token') !== null) {
      this.isUserLoggedIn = true;
    }

    if (localStorage.getItem('token') === null) {
      this.isUserLoggedIn = false;
    }
  }

  logout() {
    window.location.href = '/';
    this.shopService.removeToken();
    this.shopService.removeRole();
    this.isUserLoggedIn = false;
    this.shopService.setUserLoggedIn(false);
  }
}
