import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { memooshopping } from './memooshopping';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  public async getCart(): Promise<Observable<memooshopping>> {
    let cartID = await this.getOrCreateCartid();
    return this.db.object('/shopping-carts/' + cartID)
      .valueChanges().map(cart => new memooshopping((cart as any).items))
  }

  private async getOrCreateCartid() {
    let cartID = localStorage.getItem('cartID');
    if (cartID) return cartID;

    let result = await this.create();
    localStorage.setItem('cartID', result.key);
    return result.key;
  }

  getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product) {
    this.updateToCart(product, 1);
  }

  async removeFromCart(product) {
    this.updateToCart(product, -1);
  }


  async updateToCart(product, quantityState) {
    let cartID = await this.getOrCreateCartid();
    let item$ = this.getItem(cartID, product.key);
    item$.snapshotChanges().take(1).subscribe((item: any) => {
      if (item.payload.exists()) {
        item$.update({ quantity: item.payload.val().quantity + quantityState });
      }
      else {
        item$.update({
          product: {
            title: product.payload.val().title,
            price: product.payload.val().price,
            category: product.payload.val().category,
            imageUrl: product.payload.val().imageUrl,
          }, quantity: 1
        });
      }
    })
  }

}
