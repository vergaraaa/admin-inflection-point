import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Api } from 'src/app/models/api.model';
import { ApiService } from 'src/app/services/api-service.service';
@Component({
    selector: 'app-api-form',
    templateUrl: './api-form.component.html',
    styleUrls: ['./api-form.component.css'],
})
export class ApiFormComponent implements OnInit {
    isEditing: boolean = false;
    api_id: string | null = null;
    apiForm!: FormGroup;

    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.api_id = this.route.snapshot.paramMap.get('api_id');
        if (this.api_id != null) {
            this.isEditing = true;
            this.getApi();
        }
        this.apiForm = this.fb.group({
            name: [null],
            description: [null],
            url: [null],
            user_id: [null]
        });
    }

    onSubmit() {
        if (this.apiForm.invalid) {
            this.apiForm.controls['name'].markAsTouched();
            this.apiForm.controls['url'].markAsTouched();
            this.apiForm.controls['description'].markAsTouched();
        } else {
            var newApi: Api = {
                id: 0,
                name: this.apiForm.controls['name'].value,
                url: this.apiForm.controls['url'].value,
                description: this.apiForm.controls['description'].value,
                user_id: 0
            };
            this.apiService.createApi(newApi).subscribe({
                next: (res: any) => {
                    this.router.navigate(['home']);
                },
                error: (err) => console.error(err),
            });
        }
    }

    onEdit() {
        if (this.apiForm.invalid) {
            this.apiForm.controls['name'].markAsTouched();
            this.apiForm.controls['url'].markAsTouched();
            this.apiForm.controls['description'].markAsTouched();
        } else {
            var editApi: Api = {
                id: 0,
                name: this.apiForm.controls['name'].value,
                url: this.apiForm.controls['url'].value,
                description: this.apiForm.controls['description'].value,
                user_id: this.apiForm.controls['user_id'].value
            };
            this.apiService.editApi(+this.api_id!, editApi).subscribe({
                next: (res: any) => {
                    this.router.navigate(['home']);
                },
                error: (err) => console.error(err),
            });
        }
    }

    getApi() {
        this.apiService.getOneApi(+this.api_id!).subscribe({
            next: (res: any) => {
                // this.api = res;
                this.apiForm.controls['name'].setValue(res.name);
                this.apiForm.controls['url'].setValue(res.url);
                this.apiForm.controls['description'].setValue(res.description);
                this.apiForm.controls['user_id'].setValue(res.user_id);
            },
            error: (err) => console.error(err),
        });
    }
}
