import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserInfo } from '../services/userinfo';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { memooshopping } from '../services/memooshopping';
import { Observable } from 'rxjs';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isCollapsed = true;
  appUser: UserInfo;
  // shoppingCartCounter = 0;
  cart$: Observable<memooshopping>;

  constructor(private authServ: AuthService, private cartService: ShoppingCartService) {
    this.authServ.AppUser$.subscribe(newappUser => this.appUser = newappUser);
  }

  logout() {
    this.authServ.logout();
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    /* cart$.valueChanges().subscribe(cart => {
       this.shoppingCartCounter = 0;
       for (let productID in cart.items) {
         this.shoppingCartCounter += cart.items[productID].quantity;
       }
     }) */
  }

}
