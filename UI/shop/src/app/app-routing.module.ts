import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { EditsComponent } from './edits/edits.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)},
  {path: '', component: HomeComponent},
  { path: 'edits', component: EditsComponent },
  { path: 'cart', component: CartComponent },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
