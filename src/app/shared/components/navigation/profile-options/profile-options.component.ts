import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-profile-options',
  standalone: true,
  imports: [],
  templateUrl: './profile-options.component.html',
  styleUrl: './profile-options.component.scss'
})
export class ProfileOptionsComponent {

  private readonly authservice = inject(AuthService);
  private readonly router = inject(Router);

  logout() {
    this.authservice.logout();
    this.router.navigate(['/auth']);
  }

}
