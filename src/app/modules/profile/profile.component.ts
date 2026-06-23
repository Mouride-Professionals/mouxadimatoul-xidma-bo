import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';

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

    constructor(private _formBuilder: UntypedFormBuilder) {}

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.resetPasswordForm = this._formBuilder.group(
            {
                password: ['', Validators.required],
                passwordConfirm: ['', Validators.required]
            },
            {
                validators: FuseValidators.mustMatch(
                    'password',
                    'passwordConfirm'
                ),
            }
        );
        this.profileForm = this._formBuilder.group({
            prenom: ['', Validators.required],
            nom: ['', Validators.required],
            telephone: ['', Validators.required],
            role: ['', Validators.required],
        });
    }

    /**
     * Reset password
     */
    resetPassword(): void {
        console.log('form', this.resetPasswordForm.value);
    }
}
