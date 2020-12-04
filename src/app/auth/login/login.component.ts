import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { AuthapiService } from 'src/app/service/authapi.service';
import { RxjsdataService } from 'src/app/service/rxjsdata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: any
  mySubscription: any;
  constructor(public apiService: AuthapiService, public router: Router, private rxjsDataService:RxjsdataService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }
  
  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  //------------------Create Login Form--------------------------------
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  //----------------------Calling login Function---------------------------
  loginUser() {
    this.apiService.userLogin(this.loginForm.value).subscribe(
       (data: any) => {
        let token = data.token;
        localStorage.setItem('Token', token);
        localStorage.setItem("user", JSON.stringify(data))
        this.rxjsDataService.updateLoginStatus(true);
        this.router.navigate(['/home'])
        Swal.fire("login Success!", "You login Successfully", "success")
      },
      (err: HttpErrorResponse) => {
        Swal.fire("Failde to Login")
        if (err.error.msg) {
          Swal.fire("wrong email and password ")
          // this.snackBar.open(err.error.msg, 'Undo');
        } else {
          Swal.fire("user not found")
          // this.snackBar.open('Something Went Wrong!');
        }
      }
    );
  }

}
