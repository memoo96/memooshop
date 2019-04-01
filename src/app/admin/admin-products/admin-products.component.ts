import { Component, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
 

  products : any[];
  filteredProducts : any[];
  SubScribe : Subscription;

  constructor(private productSrv: ProductsService) {
   this.SubScribe = this.productSrv.get().subscribe( products => {
    this.filteredProducts = this.products = products;
   });
  }

  filter(queryString : string) {
    if(queryString) {
      this.filteredProducts = this.products.filter(p => p.payload.val().title.toLowerCase().includes(queryString.toLowerCase()));
    }
    else {
      this.filteredProducts = this.products;
    }
  }

  ngOnDestroy(): void {
    this.SubScribe.unsubscribe();
  }

}
