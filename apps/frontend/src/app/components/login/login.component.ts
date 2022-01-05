import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

interface IdentityClaims {
  email: string;
  family_name: string;
  given_name: string;
  name: string;
  preferred_username: string;
}
@Component({
  selector: 'maglev-training-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

   isLoggedIn$: Observable<boolean>;
   claims: IdentityClaims | null;
  constructor(private authService: AuthService) {
    this.isLoggedIn$ = authService.isAuthenticated$;
    this.claims = authService.identityClaims as IdentityClaims;
    console.log(this.claims);
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
