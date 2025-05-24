import { Component, inject, OnInit } from '@angular/core';
import { ClassroomsCardService } from '../../services/classrooms-card.service';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, Subject, switchMap } from 'rxjs';
import { Classroom } from '../../entities/classroom.entity';
import { User } from '../../entities/user.entity';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-classrooms',
  standalone: false,
  templateUrl: './classrooms.component.html',
  styleUrl: './classrooms.component.css'
})
export class ClassroomsComponent {
  protected classSrv = inject(ClassroomsCardService);
  protected authSrv = inject(AuthService);
  protected jwtSrv = inject(JwtService);

  public classroom$ = this.classSrv.list();
}
