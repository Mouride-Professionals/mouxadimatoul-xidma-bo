import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';
import { UtilisateurService } from '@core/service/utilisateur/utilisateur.service';
import { Utilisateur } from '@core/model/utilisateur.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ProfileComponent implements OnInit {
    alert: { type: FuseAlertType; messageKey: string } = {
        type: 'success',
        messageKey: '',
    };
    resetPasswordForm: UntypedFormGroup;
    profileForm: FormGroup;
    showAlert: boolean = false;
    private _currentUser: Utilisateur;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _utilisateurService: UtilisateurService
    ) {}

    ngOnInit(): void {
        this.resetPasswordForm = this._formBuilder.group(
            {
                currentPassword: ['', Validators.required],
                password: ['', [Validators.required, Validators.minLength(6)]],
                passwordConfirm: ['', Validators.required],
            },
            {
                validators: FuseValidators.mustMatch('password', 'passwordConfirm'),
            }
        );
        this.profileForm = this._formBuilder.group({
            prenom: ['', Validators.required],
            nom: ['', Validators.required],
            telephone: ['', Validators.required],
            role: [{ value: '', disabled: true }],
        });

        this._utilisateurService.getInfo().subscribe((user: Utilisateur) => {
            this._currentUser = user;
            this.profileForm.patchValue({
                prenom: user.prenom,
                nom: user.nom,
                telephone: user.telephone,
                role: user.accountType,
            });
        });
    }

    resetPassword(): void {
        if (this.resetPasswordForm.invalid) {
            this.resetPasswordForm.markAllAsTouched();
            return;
        }
        this.resetPasswordForm.disable();
        this._utilisateurService
            .changeOwnPassword(
                this.resetPasswordForm.value.currentPassword,
                this.resetPasswordForm.value.password
            )
            .subscribe({
                next: () => {
                    this.alert = { type: 'success', messageKey: 'profile.validation.passwordChanged' };
                    this.showAlert = true;
                    this.resetPasswordForm.reset();
                    this.resetPasswordForm.enable();
                },
                error: () => {
                    this.alert = { type: 'error', messageKey: 'profile.validation.passwordError' };
                    this.showAlert = true;
                    this.resetPasswordForm.enable();
                },
            });
    }
}
