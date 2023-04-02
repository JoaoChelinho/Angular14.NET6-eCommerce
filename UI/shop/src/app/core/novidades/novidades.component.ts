import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-novidades',
  templateUrl: './novidades.component.html',
  styleUrls: ['./novidades.component.css']
})
export class NovidadesComponent  implements OnInit {
  @Input() product?: Product;

  newestProducts: Product[] | undefined;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getAllNewestProducts().subscribe(products => {
      this.newestProducts = products;
    });

  }

}
