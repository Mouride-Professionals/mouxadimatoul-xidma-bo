import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ResidenceService} from '@core/service/residence.service';

@Component({
  selector: 'app-form-residence',
  templateUrl: './form-residence.component.html',
  styleUrls: ['./form-residence.component.scss']
})
export class FormResidenceComponent implements OnInit{
    @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
    myfilename = 'Choisir une image';
    formFieldHelpers: string[] = [''];
    isImage: boolean = false;
    form: FormGroup;
    responsables = [
        {id: 1, libelle: 'DIADJI DIAW', telephone: '772345561'},
        {id: 2, libelle: 'Cheikh SOW', telephone: '778900987'},
    ];
    imageResidence: string = 'assets/images/default.png';
    constructor( private _snackBar: MatSnackBar,
                 private _residenceService: ResidenceService) {
    }
    ngOnInit(): void {
        this.residenceForm();
    }
    get formResidence() { return this.form.controls; }
    residenceForm(): void {
        this.form = new FormGroup({
            libelle: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            adresse: new FormControl('', Validators.required),
            telephoneResidence: new FormControl('', Validators.required),
            responsable: new FormControl('', Validators.required),
            image: new FormControl('', Validators.required),
        });
    }

    saveResidence(): void {
        if (this.form.invalid) {
            return;
        }
        this._residenceService.createResidence(this.form.value).subscribe((res: any) => {
            console.log('res', res);
        });
    }
    fileChangeEvent(fileInput: any): void {

        if (fileInput.target.files && fileInput.target.files[0]) {


            this.myfilename = '';
            const file: File = fileInput.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e: any) => {
                this.isImage = true;
                this.formResidence.image.patchValue(file);
                this.imageResidence = e.target.result;
            };

        } else {
            this.myfilename = 'Choisir une image';
            this.isImage = false;
        }
    }

    removeImage(): void {
        this.isImage = false;
        this.imageResidence = '';
        this.formResidence.image.reset();
    }
}
