import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 currentUser:any
  constructor() { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'))
  }

}
