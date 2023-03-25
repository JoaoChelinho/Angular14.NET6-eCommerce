import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';
import { CartItem } from 'src/app/shared/models/cart-item';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  id: number;
  cartItemCount = 0;
  cartItems: CartItem[] = [];


  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public cartService: CartService  ) {
    this.id = 0;
  }

  ngOnInit(): void {
    this.loadProduct();
    this.cartService.cartUpdated.subscribe(() => {
      this.cartItems = this.cartService.getCartItems();
    });
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id)
      this.shopService.getProduct(+id).subscribe({
        next: (product) => (this.product = product),
        error: (error) => console.log(error),
      });
  }
  editProduct() {
    if (this.product) {
      this.router.navigate(['/shop', this.product.productId, 'edit']);
    }
  }

  addToCart() {
    if (this.product) {
      const cartItem: CartItem = {
        productId: this.product.productId,
        productName: this.product.productName,
        productPrice: this.product.productPrice,
        quantity: 1,
      };
      this.cartService.addToCart(cartItem);
      console.log('Product added to cart');
      this.cartItemCount = this.cartService.getCartItemCount();
    }
  }

  decreaseQuantity(index: number) {
    this.cartService.decreaseQuantity(index);
    this.cartItems = this.cartService.getCartItems();
  }

  increaseQuantity(index: number) {
    this.cartService.increaseQuantity(index);
    this.cartItems = this.cartService.getCartItems();
  }


}
