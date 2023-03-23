import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  router: any;
  id: number;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    router: Router
  ) {
    this.id = 0;
  }

  ngOnInit(): void {
    this.loadProduct();
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

}
