import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';
import { FormsModule } from '@angular/forms';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';



@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    ProductEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
    FormsModule,
  ],
  exports: [
    CarouselModule,
  ],
})
export class ShopModule { }
