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
  // name: string = '';
  // description: string = '';
  // url: string = '';
  apiForm!: FormGroup;
  api: Api = { id: 0, name: '', url: '', description: '', user_id: 0 };

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fb:FormBuilder,
  ) {
    // this.apiForm = this.fb.group({
    //   name: [null],
    //   description: [null],
    //   url: [null],
    // });  

  }

  ngOnInit() {
    this.api_id = this.route.snapshot.paramMap.get('api_id');
    if (this.api_id != null) {
      this.isEditing = true;
      this.getApi();
    }
    
    // this.apiForm = new FormGroup({
    //   name: new FormControl(this.api.name, { validators: [
    //     Validators.required,
    //     Validators.minLength(4),
        
    //   ], updateOn: 'blur' })
    // });

    this.apiForm = this.fb.group({
      name: [null],

    });
  }

  onSubmit() {
    
    if (this.apiForm.invalid) {
      this.apiForm.controls['name'].markAsTouched();
      this.apiForm.controls['url'].markAsTouched();
      this.apiForm.controls['description'].markAsTouched();
     } else {
      this.apiService.createApi(this.api).subscribe({
        next: (res: any) => {
          this.router.navigate(['home']);
        },
        error: (err) => console.error(err),
      });
     }
  }

  onEdit() {
    this.apiService.editApi(+this.api_id!, this.api).subscribe({
      next: (res: any) => {
        this.router.navigate(['home']);
      },
      error: (err) => console.error(err),
    });
  }

  getApi() {
    this.apiService.getOneApi(+this.api_id!).subscribe({
      next: (res: any) => {
        this.api = res;
      },
      error: (err) => console.error(err),
    });
  }
}
