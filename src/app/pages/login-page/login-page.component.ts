import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  username = '';
  password = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  login(): void {
    this.authService.login$(this.username, this.password).subscribe(loginToken => {
      const access_token = loginToken.access_token;
      localStorage.setItem('access_token', access_token);
      this.router.navigate(['']);
    }, error => {
      console.log(error);
      this.password = '';
      alert('wrong user:pass');
      // Todo handle error
    });
  }

  keyDownEventHandler($event: KeyboardEvent): void {
    if ($event.key === 'Enter') {
      this.login();
    }
  }
}
