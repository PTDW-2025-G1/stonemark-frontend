import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(): boolean | UrlTree {
        const token = localStorage.getItem('authToken');
        const role = localStorage.getItem('userRole');

        if (!token || !role) {
            return this.router.createUrlTree(['/auth/login']);
        }

        try {
            const decoded: any = jwtDecode(token);
            const exp = decoded.exp * 1000;

            if (Date.now() > exp) {
                localStorage.clear();
                return this.router.createUrlTree(['/auth/login']);
            }

            if (role === 'ADMIN' || role === 'MODERATOR') {
                return true;
            } else {
                localStorage.clear();
                return this.router.createUrlTree(['/auth/login']);
            }
        } catch (error) {
            console.error('Invalid token:', error);
            localStorage.clear();
            return this.router.createUrlTree(['/auth/login']);
        }
    }
}
