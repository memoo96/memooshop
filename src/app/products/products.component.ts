import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { promise } from 'protractor';
import { memooshopping } from '../services/memooshopping';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {


  products: any[] = [];
  filteredProducts: any[] = [];
  category = '';
  cart$: Observable<memooshopping>;
  subscription: Subscription;

  constructor(private productSrv: ProductsService, private route: ActivatedRoute, private cartService: ShoppingCartService) {
    // we take a copy of products and assigned to filteredProducts
    this.subscription =
      this.productSrv.get().subscribe(products => {
        this.products = products;
        // Read value of queryString
        this.route.queryParamMap.subscribe(params => {
          this.category = params.get('category');
          this.filteredProducts = (this.category) ?
            this.products.filter(p => p.payload.val().category === this.category) : this.filteredProducts = this.products;
        })
      })
  }

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.cartService.getCart();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
