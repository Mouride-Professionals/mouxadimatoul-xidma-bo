import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-form-invite',
    templateUrl: './form-invite.component.html',
    styleUrls: ['./form-invite.component.scss'],
})
export class FormInviteComponent implements OnInit {
    formFieldHelpers: string[] = [''];
    form: FormGroup;

    constructor() {}

    ngOnInit(): void {
        this.invitForm();
    }

    invitForm(): void {
        this.form = new FormGroup({
            prenom: new FormControl('', Validators.required),
            nom: new FormControl('', Validators.required),
            telephone: new FormControl('', Validators.required),
        });
    }

    saveInvit(): void {
        console.log('form invite', this.form.value);
    }
}
