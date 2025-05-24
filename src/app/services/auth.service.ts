import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { JwtService } from "./jwt.service";
import { Router } from "@angular/router";
import { catchError, distinctUntilChanged, map, of, ReplaySubject, tap } from "rxjs";
import { User } from "../entities/user.entity";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    protected http = inject(HttpClient);
    protected jwtSrv = inject(JwtService);
    protected router = inject(Router);

    protected _currentUser$ = new ReplaySubject<User | null>(1);
    currentUser$ = this._currentUser$.asObservable();

    isAuthenticated$ = this.currentUser$
        .pipe(
            map(user => !!user),
            distinctUntilChanged()
        );

    login(username: string, password: string) {
        return this.http.post<any>('/api/login', { username, password })
            .pipe(
                tap(res => this.jwtSrv.setToken(res.token)),
                tap(res => this._currentUser$.next(res.user)),
                map(res => res.user)
            );
    }

    fetchUser() {
        return this.http.get<User>('/api/users/me')
            .pipe(
                catchError(_ => {
                    return of(null);
                }),
                tap(user => this._currentUser$.next(user))
            )
    }

    logout() {
        this.jwtSrv.removeToken();
        this._currentUser$.next(null);
    }

    register(firstName: string, lastName: string, picture: string, role: string, username: string, password: string) {
        return this.http.post('/api/register', { username, password, picture, role, firstName, lastName });
    }
}