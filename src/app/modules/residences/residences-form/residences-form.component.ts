import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Utilisateur } from '@core/model/utilisateur.model';
import { ResidenceService } from '@core/service/residence/residence.service';
import { UtilisateurService } from '@core/service/utilisateur/utilisateur.service';

@Component({
    selector: 'app-residences-form',
    templateUrl: './residences-form.component.html',
    styleUrls: ['./residences-form.component.scss'],
})
export class ResidencesFormComponent implements OnInit {
    residenceForm: FormGroup = new FormGroup({
        libelle: new FormControl('', Validators.required),
        // description: new FormControl('', Validators.required),
        adresse: new FormControl('', Validators.required),
        telephoneResidence: new FormControl('', Validators.required),
        responsable: new FormControl('', Validators.required),
    });

    users: Utilisateur[] = [];
    isImage: boolean = false;
    image: any;
    imageResidence: string = 'assets/images/default.png';

    constructor(
        private _snackBar: MatSnackBar,
        private _userService: UtilisateurService,
        private _residenceService: ResidenceService,
        private _router: Router
    ) {}

    get f(): any {
        return this.residenceForm.controls;
    }

    ngOnInit(): void {
        this._userService
            .getAllUsers({ page: 0, size: 100 }, 'responsable')
            .subscribe((data) => {
                if (!data.empty) {
                    this.users = data.content;
                }
            });
    }

    saveResidence(): void {
        if (this.residenceForm.invalid) {
            return;
        }
        this._residenceService
            .createResidence(this.residenceForm.value, this.image)
            .subscribe((res: any) => {
                this._snackBar.open('Résidence créée avec success', '', {
                    panelClass: ['bg-green-500', 'text-white'],
                    duration: 3000,
                });
                this._router.navigate(['/residences']);
            });
    }
    fileChangeEvent(fileInput: any): void {
        if (fileInput?.target.files && fileInput?.target.files[0]) {
            const file: File = fileInput.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e: any): void => {
                this.isImage = true;
                this.image = file;
                this.imageResidence = e.target.result;
            };
        } else {
            this.isImage = false;
            this.image = null;
        }
    }

    removeImage(): void {
        this.isImage = false;
        this.image = null;
        this.imageResidence = 'assets/images/default.png';
        this.f.image.reset();
    }
}
