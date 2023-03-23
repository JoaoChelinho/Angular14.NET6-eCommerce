import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { ProductCategory } from '../shared/models/category';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  @ViewChild('seach') searchTerm?: ElementRef;
  products: Product[] = [];
  brands: Brand[] = [];
  categories: ProductCategory[] = [];
  brandIdSelected = 0;
  categoryIdSelected = 0;
  sortSelected = 'name';
  sortOptions = [
    {name: 'Ordem Alfabética', value: 'name'},
    {name: 'Preço Crescente', value: 'priceAsc'},
    {name: 'Preço Decrescente', value: 'priceDes'},
  ]

  constructor(private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.getBrands();
    this.getCategories();
    this.getProducts();
  }

  getProducts() {
    this.shopService
      .getProducts(this.brandIdSelected, this.categoryIdSelected, this.sortSelected)
      .subscribe({
        next: (response) => (this.products = response),
        error: (error) => console.log(error),
      });
  }

  getCategories() {
    this.shopService.getCategories().subscribe({
      next: (response) =>
        (this.categories = [
          { categoryId: 0, categoryName: 'Todas' },
          ...response,
        ]),
      error: (error) => console.log(error),
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (response) =>
        (this.brands = [{ brandId: 0, brandName: 'Todas' }, ...response]),
      error: (error) => console.log(error),
    });
  }

  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onCategorySelected(categoryId: number) {
    this.categoryIdSelected = categoryId;
    this.getProducts();
  }

  onSortSelected(event: any) {
    this.sortSelected = event.target.value;
    this.getProducts();
  }

}
