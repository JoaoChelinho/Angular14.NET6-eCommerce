import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password: string | undefined;
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
}
