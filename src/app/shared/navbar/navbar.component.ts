import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthapiService } from 'src/app/service/authapi.service';
import { RxjsdataService } from 'src/app/service/rxjsdata.service';
import { SnoozeService } from 'src/app/service/snooze.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: any
  username: ''
  userName: ''
  unreadMessageCount: number = 0;
  notification: any
  isLogin: boolean = false;
  notific: any;
  getnotified: any
  time_get_create: any
  messageget: any
  fromuser: any
  getusername: any

  notification_id: ''
  public statusofnotification: Boolean
  getunread: "";
  getunreadnotification: any
  getunreadLength: any
  countlength = new BehaviorSubject(0);

  constructor(public router: Router, public authService: AuthapiService,
    public snoozeService: SnoozeService, public rxjsDataService: RxjsdataService) {
    
      this.rxjsDataService.isLoginSerivce.subscribe((isLogin) => {
      if (!isLogin) {
        if (localStorage.getItem('Token')) {
          this.rxjsDataService.updateLoginStatus(true)
        }else{
          this.isLogin  = isLogin;
        }
      } else {
        this.isLogin = isLogin;
      }
    });
  

  
  }
  
  ngOnInit(): void {
    //-----------get login user info-------------------------------------


    this.authService.getuserlogin().subscribe((res: any) => {
      this.getusername = res.name
    })


    //-----------get all notification-----------------------------------------
    this.snoozeService.notificationget().subscribe((res: any) => {
      this.notific = [res];
      this.notific.map(ress => {
        this.getnotified = ress.data
        setTimeout(() => { this.ngOnInit() }, 1000 * 2)
        this.getnotified.map(a => {
          this.time_get_create = a.createdAt
          this.messageget = a.message
          this.fromuser = a.from
          this.notification_id = a._id
          this.statusofnotification = a.statusRead

        })
      })
    }
    )

    //-----------get unread notification status---------------------------------------------
    this.snoozeService.getunreadnotification().subscribe((res: any) => {
      this.getunreadnotification = [res]
      this.unreadMessageCount = res?.data ? res?.data?.length : 0;
      this.getunreadnotification.map(gets => {
        this.getunreadLength = gets.data
      })
    })


  }


  //--------------------Notification click and update true---------------------------------------
  onclickstatus(id) {
    if (this.unreadMessageCount > 0) {
      this.unreadMessageCount -= 1;
    }
    this.notification_id = id
    this.statusofnotification = true
    if (this.notification_id === id) {
      this.snoozeService.changestatusnotification(this.notification_id, { statusRead: this.statusofnotification }).subscribe(res => {
      })
    }
  }


  //-------------logout ---------------------------------------------------
  logout() {
    Swal.fire({
      title: 'Are you sure want to logout?',
      text: 'You will Back to login !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        localStorage.removeItem('Token');
        localStorage.removeItem('currentUserLogin')
        localStorage.removeItem('user')

        this.authService.logoutuser().subscribe((res: any) => {

        })
        this.rxjsDataService.updateLoginStatus(false)
        this.router.navigate(['/login'])

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'welcomeback :)',
          'error'
        )

      }

    })

  }


}

