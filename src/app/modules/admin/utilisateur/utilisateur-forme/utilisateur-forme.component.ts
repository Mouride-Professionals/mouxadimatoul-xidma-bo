import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-utilisateur-forme',
  templateUrl: './utilisateur-forme.component.html',
  styleUrls: ['./utilisateur-forme.component.scss']
})
export class UtilisateurFormeComponent implements OnInit{
    formFieldHelpers: string[] = [''];
    form: FormGroup;
    constructor() {
    }
    ngOnInit(): void {
        this.userForm();
    }
    userForm(): void {
        this.form = new FormGroup({
            prenom: new FormControl('', Validators.required),
            nom: new FormControl('', Validators.required),
            telephone: new FormControl('', Validators.required),
            role: new FormControl('', Validators.required),
        });
    }

    saveUser() {
        console.log('form user', this.form.value);
    }
}
