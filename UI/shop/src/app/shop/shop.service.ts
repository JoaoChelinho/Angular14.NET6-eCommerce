import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Brand } from '../shared/models/brand';
import { ProductCategory } from '../shared/models/category';
import { Product } from '../shared/models/product';
import { Account } from '../shared/models/account';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  saveCategory(arg0: number, editCategoryName: string) {
    throw new Error('Method not implemented.');
  }
  getShopParams(): any {
    throw new Error('Method not implemented.');
  }
  baseUrl = 'https://localhost:7227/api/';

  constructor(private http: HttpClient) {}

  getProducts(brandId?: number, categoryId?: number, sort?: string) {
    let params = new HttpParams();

    if (brandId) {
      params = params.append('brandId', brandId.toString());
    }
    if (categoryId) {
      params = params.append('categoryId', categoryId.toString());
    }
    if (sort) {
      params = params.append('sort', sort);
    }

    return this.http.get<Product[]>(this.baseUrl + 'Product/AllProducts', {
      params,
    });
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'Product/GetbyID?id=' + id);
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'Brand/GetBrand');
  }

  getCategories() {
    return this.http.get<ProductCategory[]>(
      this.baseUrl + 'Product_Category/GetCategory'
    );
  }

  updateProductById(id: number, product: Product): Observable<any> {
    return this.http.put(`${this.baseUrl}Product/UpdatebyID?id=${id}`, product);
  }

  updateCategoryName(
    categoryId: number,
    categoryName: string
  ): Observable<any> {
    const url = `${this.baseUrl}Product_Category/UpdatebyID?id=${categoryId}`;
    const body = { categoryName };
    return this.http.put(url, body);
  }

  createCategory(categoryName: string): Observable<any> {
    const url = `${this.baseUrl}Product_Category/Create`;
    const body = { categoryName };
    return this.http.post(url, body);
  }
  updateBrandName(
    brandId: number,
    brandName: string
  ): Observable<any> {
    const url = `${this.baseUrl}Brand/UpdatebyID?id=${brandId}`;
    const body = { brandName };
    return this.http.put(url, body);
  }

  createBrand(brandName: string): Observable<any> {
    const url = `${this.baseUrl}Brand/Create`;
    const body = { brandName };
    return this.http.post(url, body);
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(this.baseUrl + 'Product/Create', product);
  }

  getNewestProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'Product/GetAllbyIDDecrescente').pipe(
      map(products => products.slice(0, 9))
    );
  }

  registerUser(data: any): Observable<any> {
    const url = this.baseUrl + 'Authenticate/Register';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, data, { headers });
  }


}
