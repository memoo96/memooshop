import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {};
  id;

  constructor(private catSrv: CategoriesService, private productSrv: ProductsService, private router: Router, private activeRoute: ActivatedRoute) {

    this.id = this.activeRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.categories$ = this.catSrv.getCategories();
      // help to Unsubscribe when we take the ID
      this.productSrv.getById(this.id).take(1).subscribe(p => {
        if (p) {
          this.product = p;
        }
      });
    }
  }

  ngOnInit() {
  }

  save(product) {
    this.productSrv.create(product);
    this.router.navigateByUrl('/admin/products');
  }

  Update(product) {
    this.productSrv.update(this.id, product);
    this.router.navigateByUrl('/admin/products');
  }

  delete() {
    if (confirm('Are you sure you want to delete the product ?')) {
      this.productSrv.delete(this.id);
    }
    this.router.navigateByUrl('/admin/products');
  }

}
