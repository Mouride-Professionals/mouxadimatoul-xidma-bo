import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations,
})
export class LoginComponent implements OnInit {
    @ViewChild('loginNgForm') loginNgForm: NgForm;
    loginForm: FormGroup = new FormGroup({
        username: new FormControl('776543212', [
            Validators.required,
            Validators.pattern(/^(77|78|75|70|76)\d{7}$/gm),
        ]),
        password: new FormControl('admin', Validators.required),
    });

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;

    constructor(
        private _authService: AuthService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit(): void {}

    login(): void {
        if (this.loginForm.invalid) {
            return;
        }

        // // Disable the form
        this.loginForm.disable();

        // // Hide the alert
        this.showAlert = false;

        // // Sign in
        this._authService.login(this.loginForm.value).subscribe({
            next: () => {
                const redirectURL =
                    this._activatedRoute.snapshot.queryParamMap.get(
                        'redirectURL'
                    ) || '/signed-in-redirect';

                // Navigate to the redirect url
                this._router.navigateByUrl(redirectURL);
            },
            error: () => {
                // Re-enable the form
                this.loginForm.enable();

                // Reset the form
                this.loginNgForm.resetForm();

                // Set the alert
                this.alert = {
                    type: 'error',
                    message: 'Numéro ou mot de passe incorrect',
                };

                // Show the alert
                this.showAlert = true;
            },
        });
    }
}
