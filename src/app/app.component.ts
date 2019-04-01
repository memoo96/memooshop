import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './services/user.service';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userServ:UserService, private authservice: AuthService, private route: ActivatedRoute, private router: Router) {
    this.authservice.user$.subscribe(user => {
      if (user) {
        this.userServ.save(user);
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    })
  }
}
