import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //loginForm: FormGroup;
  loginForm: FormGroup;
  mensajeError = false; // variable boolean para verificar si hay error o no
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    // Crea el formulario reactivo
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.login(email, password).subscribe(
        response => {
            console.log('Autenticación exitosa:', response);

            localStorage.setItem('isAuthenticated', 'true');
           
            this.router.navigate(['/calendar']);

        },
        error => {
          this.mensajeError = true;
          console.log('Error de autenticación:', error);
        }
      );
    }
  }
}
