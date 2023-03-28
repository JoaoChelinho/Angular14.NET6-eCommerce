import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from '../shop/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() product?: Product;

  newestProducts: Product[] | undefined;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getNewestProducts().subscribe(products => {
      this.newestProducts = products;
    });
  }

}
