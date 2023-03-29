import { Component } from '@angular/core';
import { ShopService } from 'src/app/shop/shop.service';

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

  constructor(private shopService: ShopService) { }

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
        // Adicione aqui a lógica para lidar com a resposta
      },
      error => {
        console.log(error);

      }
    );
  }
}

