import { Component } from '@angular/core';
import { ShopService } from 'src/app/shop/shop.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;
  showPassword: boolean = false;

  constructor(private shopService: ShopService, private router: Router, private toastr: ToastrService) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById("password");
    if (this.showPassword) {
      passwordField?.setAttribute("type", "text");
    } else {
      passwordField?.setAttribute("type", "password");
    }
  }

  loginUser(event: { preventDefault: () => void; }) {
    event.preventDefault();

    let user = {
      username: this.username,
      password: this.password
    };

    this.shopService.loginUser(user).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.shopService.setUserLoggedIn(true);
        this.router.navigate(['/home']);
        this.toastr.success('Login efetuado com sucesso!');

      },
      error => {
        console.log(error);
        if (error.status === 401) {
          this.toastr.error('Não foi possível efetuar o login. Verifique o seu username e password e tente novamente.');
        } else {
          this.toastr.error('Erro.');
        }
      }
    );



}
}
