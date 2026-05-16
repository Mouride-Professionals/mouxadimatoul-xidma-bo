import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /**
     * Constructor
     */
    constructor(private _authService: AuthService) {}

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Clone the request object
        let newReq = req.clone();
        if (
            !req.url.includes('/auth/login') &&
            this._authService.accessToken &&
            !AuthUtils.isTokenExpired(this._authService.accessToken)
        ) {
            newReq = req.clone({
                headers: req.headers.set(
                    'Authorization',
                    'Bearer ' + this._authService.accessToken
                ),
            });
        }

        // Response
        return next.handle(newReq).pipe(
            catchError((error) => {
                // Catch "401 Unauthorized" responses
                if (
                    error instanceof HttpErrorResponse &&
                    error.status === 401
                ) {
                    // Sign out
                    this._authService.signOut();
                }

                return throwError(error);
            })
        );
    }
}
