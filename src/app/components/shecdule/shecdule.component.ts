import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthapiService } from 'src/app/service/authapi.service';
import Swal from 'sweetalert2';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-shecdule',
  templateUrl: './shecdule.component.html',
  styleUrls: ['./shecdule.component.scss']
})
export class ShecduleComponent implements OnInit {
  
  public model: NgbDateStruct;
  submitted = false;
  sheduleForm: FormGroup;
  currentUserEmail:any
  public status:Boolean
  collection = [];
  emailget:any
  idget:any
 

  constructor(public fb: FormBuilder,public authService: AuthapiService,
    public router: Router) {
      for (let i = 1; i <= 10; i++) {
        this.collection.push(`${i}`);
      }
    }
    
    ngOnInit(): void {
      this.mainForm();
      this.currentUserEmail = JSON.parse(localStorage.getItem('user'))
      this.emailget = this.currentUserEmail.userCredentials.email
      this.idget=this.currentUserEmail.userCredentials._id
 
  }
  data: Date;
 
  onValueChange(value: Date): void {
    this.data = value;
  }

  mainForm() {
    this.sheduleForm = this.fb.group({
      date: ['',],
      time: ['',],
      status:['',],
      stepday:['',]

    })
  }
  
  changedays(e) {
    this.daysstep.setValue(e.target.value, {
      onlySelf: true
    })
  }
  get daysstep() {
    return this.sheduleForm.get('stepday');
  }

  
  get myForm() {
    return this.sheduleForm.controls;
  }

  //--------------------submit---------------------------
  onSubmit() {
    this.submitted = true;
    this.status=true
    this.sheduleForm.value.status=this.status
    this.sheduleForm.value.email=this.emailget
    this.sheduleForm.value.userId= this.idget
    if(this.sheduleForm.valid){
      this.authService.createemailshedule(this.sheduleForm.value).subscribe(
        (data: any) => {
          Swal.fire("SuccessFully Create Email Shedule User")
          this.router.navigate([ '/home' ]);
        },
        function (err: HttpErrorResponse) {
          if (err.error.msg) {
            Swal.fire('Oops...', err.error.msg);
          } else {
            Swal.fire('Oops...', 'Something went wrong!', 'error');
            // this.snackBar.open('Something Went Wrong!');
          }
        }
      );
    }else{
      Swal.fire("Please check Your fields")
    }
  
  }
}
