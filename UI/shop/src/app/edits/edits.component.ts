import { Component } from '@angular/core';
import { ProductCategory } from '../shared/models/category';
import { ShopService } from '../shop/shop.service';
import { Brand } from '../shared/models/brand';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-edits',
  templateUrl: './edits.component.html',
  styleUrls: ['./edits.component.css'],
})
export class EditsComponent {
  showEditCategory = false;
  showCreateCategory = false;
  categories: ProductCategory[] | undefined;
  editCategoryName: string = '';
  selectedCategoryId: undefined;
  selectedCategory: any;
  newCategoryName: string = '';
  showEditBrand = false;
  showCreateBrand = false;
  brands: Brand[] | undefined;
  editBrandName: string = '';
  selectedBrandId: undefined;
  selectedBrand: any;
  newBrandName: string = '';
  showCreateProduct = false;
  newProductName: string = '';
  newProductDescription: string = '';
  newProductPrice: number | undefined;




  showEditCategoryForm() {
    this.showEditCategory = true;
    this.showCreateCategory = false;
    this.showEditBrand = false;
    this.showCreateBrand = false;
    this.showCreateProduct = false;
  }

  showCreateCategoryForm() {
    this.showEditCategory = false;
    this.showCreateCategory = true;
    this.showEditBrand = false;
    this.showCreateBrand = false;
    this.showCreateProduct = false;
  }

  showEditBrandForm() {
    this.showEditBrand = true;
    this.showCreateBrand = false;
    this.showEditCategory = false;
    this.showCreateCategory = false;
    this.showCreateProduct = false;
  }

  showCreateBrandForm() {
    this.showEditBrand = false;
    this.showCreateBrand = true;
    this.showEditCategory = false;
    this.showCreateCategory = false;
    this.showCreateProduct = false;
  }

  showCreateProductForm(){
    this.showCreateProduct = true;
    this.showEditBrand = false;
    this.showCreateBrand = false;
    this.showEditCategory = false;
    this.showCreateCategory = false;
  }

  constructor(private shopService: ShopService) {}

  ngOnInit() {
    this.shopService.getCategories().subscribe((categories) => {
      this.categories = categories;
      console.log(this.categories);
    });
    this.shopService.getBrands().subscribe((brands) => {
      this.brands = brands;
      console.log(this.brands);
    });
  }

 /* resetForm() {
    this.editCategoryName = '';
    this.showCreate = false;
    this.showEdit = false;
  } */

 /* submitForm() {
    const categoryId = this.selectedCategory?.categoryId ?? 0;
    const categoryName = this.editCategoryName;

    if (categoryName) {
      this.shopService.updateCategoryName(categoryId, categoryName)
        .subscribe(
          () => {
            alert('Categoria editada com sucesso!');
            this.resetForm();
          },
          () => alert('Erro ao editar categoria!')
        );
    }
  }*/


  updateCategory() {
    if (!this.selectedCategoryId || !this.editCategoryName) {
      return;
    }

    this.shopService
      .updateCategoryName(this.selectedCategoryId, this.editCategoryName)
      .subscribe(() => {
        // limpa os valores do formulário
        this.editCategoryName = '';
        this.selectedCategoryId = undefined;
      });
  }

  createCategory() {
    const newCategoryName = (document.getElementById('newCategoryName') as HTMLInputElement).value;
    if (!newCategoryName) {
      return;
    }
    this.shopService.createCategory(newCategoryName).subscribe(() => {
      // limpa os valores do formulário
      (document.getElementById('newCategoryName') as HTMLInputElement).value = '';
    });
  }

  updateBrand() {
    if (!this.selectedBrandId || !this.editBrandName) {
      return;
    }

    this.shopService
      .updateBrandName(this.selectedBrandId, this.editBrandName)
      .subscribe(() => {
        // limpa os valores do formulário
        this.editBrandName = '';
        this.selectedBrandId = undefined;
      });
  }

  createBrand() {
    const newBrandName = (document.getElementById('newBrandName') as HTMLInputElement).value;
    if (!newBrandName) {
      return;
    }
    this.shopService.createBrand(newBrandName).subscribe(() => {
      // limpa os valores do formulário
      (document.getElementById('newBrandName') as HTMLInputElement).value = '';
    });
  }

  createProduct(): void {
    const newProduct: Product = {
      productName: this.newProductName,
      productDescription: this.newProductDescription,
      productPrice: this.newProductPrice!,
      categoryId: this.selectedCategoryId!,
      brandId: this.selectedBrandId!,
      productId: 0,
      product_Category: '',
      brand: ''
    };
    this.shopService.createProduct(newProduct)
      .subscribe(() => {
        // o produto foi criado com sucesso, faça algo aqui se necessário
      }, (error) => {
        console.log(error);
      });
  }


}
