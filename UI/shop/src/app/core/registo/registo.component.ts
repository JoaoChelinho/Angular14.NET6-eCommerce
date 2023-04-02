import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/shop/shop.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.css']
})
export class RegistoComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById("password");
    if (this.showPassword) {
      passwordField?.setAttribute("type", "text");
    } else {
      passwordField?.setAttribute("type", "password");
    }
  }

  constructor(private shopService: ShopService, private toastr: ToastrService, private router: Router) { }

  registerUser(event: { preventDefault: () => void; }) {
    event.preventDefault();

    let user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.shopService.registerUser(user).subscribe(
      response => {
        user = response;
        console.log(response);
        this.toastr.success('Registo bem sucedido!');
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
        if (error.status === 500) {
          this.toastr.error('O username já existe.');
        } else {
          this.toastr.error('Ocorreu um erro ao registar o usuário.');
        }
      }
    );
  }
}

