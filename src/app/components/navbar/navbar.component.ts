import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ClassroomsCardService } from '../../services/classrooms-card.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  protected authSrv = inject(AuthService);

  currentUser$ = this.authSrv.currentUser$;

  logout() {
    this.authSrv.logout();
  }

}
