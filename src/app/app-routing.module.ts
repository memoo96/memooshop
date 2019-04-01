import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminManageUsersComponent } from './admin/admin-manage-users/admin-manage-users.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent , canActivate : [AuthGuard] },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'my/orders', component: MyOrdersComponent , canActivate : [AuthGuard] },
  { path: 'admin/products/:id', component: ProductFormComponent , canActivate : [AuthGuard , AdminAuthGuardService] },
  { path: 'admin/products/new', component: ProductFormComponent , canActivate : [AuthGuard , AdminAuthGuardService] },
  { path: 'admin/products', component: AdminProductsComponent , canActivate : [AuthGuard , AdminAuthGuardService] },
  { path: 'admin/users', component: AdminManageUsersComponent , canActivate : [AuthGuard , AdminAuthGuardService] },
  { path: 'admin/orders', component: AdminOrdersComponent , canActivate : [AuthGuard , AdminAuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
