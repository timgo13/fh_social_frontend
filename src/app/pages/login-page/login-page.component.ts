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
  loading = false;
  error = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  login(): void {
    this.loading = true;
    this.authService.login$(this.username, this.password).subscribe(loginToken => {
      this.loading = false;
      this.error = false;
      const access_token = loginToken.access_token;
      localStorage.setItem('access_token', access_token);
      this.router.navigate(['']);
    }, error => {
      this.loading = false;
      this.error = true;
      console.log(error);
      this.password = '';
    });
  }

  keyDownEventHandler($event: KeyboardEvent): void {
    if ($event.key === 'Enter') {
      this.login();
    }
  }
}
