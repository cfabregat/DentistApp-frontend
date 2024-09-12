import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';


Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_UGLFdy4aq',
      userPoolClientId: '479ptptqccsbep0puan5ce1p1n'
    }
  }
});

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink,
    AmplifyAuthenticatorModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }
}
