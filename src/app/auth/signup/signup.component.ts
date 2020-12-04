import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthapiService } from 'src/app/service/authapi.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  submitted = false;
  userForm: FormGroup;
  constructor(public fb: FormBuilder,
    private router: Router,
    private apiService: AuthapiService) {
   
     }

  ngOnInit(): void {
    this.mainForm();
  }

  //---------------------------Create Signup Form------------------------------------------------------
  mainForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
    })
  }

  //---------------------------Get Form------------------------------------------------------------------
  get myForm(){
    return this.userForm.controls;
  }

  //---------------------------Submit Form-----------------------------------------------------------------
  onSubmit() {
    this.submitted = true;
    if(this.userForm.valid){
      this.apiService.createNewUser(this.userForm.value).subscribe(
        (data: any) => {
          Swal.fire("SuccessFully Register User")
          this.router.navigate([ '/login' ]);
        },
        (err: HttpErrorResponse) => {
          if (err.error.msg) {
            Swal.fire('Oops...', err.error.msg)
          } else {
            Swal.fire('Oops...', 'Something went wrong!', 'error')
          }
        }
      );
    }else{
      Swal.fire("Please check Your fields")
    }
    }
    
  
}
