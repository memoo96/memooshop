import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { UserInfo } from './userinfo';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private userServ: UserService, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  ngOnInit() {
  }

  login() {
    //let returnUrl= this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    //localStorage.setItem('returnUrl' , returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get AppUser$(): Observable<UserInfo> {
    return this.user$.switchMap(user => {
      if (user) {
        return this.userServ.getUser(user.uid).valueChanges();
      }
      else {
        return Observable.of(null);
      }
    })
  }

}
