import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { Brand } from 'src/app/shared/models/brand';
import { ProductCategory } from 'src/app/shared/models/category';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product = {} as Product;
  id!: number;
  brands: Brand[] | undefined;
  categories: ProductCategory[] | undefined;

  constructor(private shopService: ShopService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadProduct();
    this.loadBrands();
    this.loadCategories();
  }

  loadProduct() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.id = +id;
        this.shopService.getProduct(this.id).subscribe({
          next: product => this.product = product,
          error: error => console.log(error)
        });
      }
    });
  }

  updateProduct() {
    this.shopService.updateProductById(this.id, this.product).subscribe({
      next: () => {
        console.log('Produto atualizado com sucesso!');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.id.toString()]);
        });
      },
      error: error => console.log(error)
    });
  }

  loadBrands() {
    this.shopService.getBrands().subscribe(response => {
      this.brands = response;
    }, error => {
      console.log(error);
    });
  }

  loadCategories() {
    this.shopService.getCategories().subscribe(response => {
      this.categories = response;
    }, error => {
      console.log(error);
    });
  }



}
