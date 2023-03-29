import { Component } from '@angular/core';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.css']
})
export class RegistoComponent {
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

