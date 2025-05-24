import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Subject, takeUntil, throwError } from 'rxjs';
import { JwtService } from '../../services/jwt.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{
  protected fb = inject(FormBuilder);
  protected destroyed$ = new Subject<void>();
  protected activatedRoute = inject(ActivatedRoute);
  protected authSrv = inject(AuthService);
  protected router = inject(Router);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  loginError = '';

  requestedURL: string | null = null;

  ngOnInit() {
    this.loginForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => {
        this.loginError = '';
      })
      this.activatedRoute.queryParams
        .pipe(
          takeUntil(this.destroyed$),
          map(params => params['requestedURL'])
        )
        .subscribe(url => {
          this.requestedURL = url;
        })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  login() {
    const { username, password } = this.loginForm.value;
    this.authSrv.login(username!, password!)
      .pipe(
        catchError(response => {
          this.loginError = response.error.message;
          return throwError(() => response);
        })
      )
      .subscribe(() => {
        this.router.navigate([this.requestedURL ? this.requestedURL : '/']);
      })
  }
}
