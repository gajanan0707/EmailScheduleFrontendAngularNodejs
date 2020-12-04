import { Component } from '@angular/core';
import { AuthapiService } from './service/authapi.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'angularNode';


  constructor(public authService: AuthapiService) { }
  ngOnInit() {
    window.addEventListener("beforeunload",  (e)=> {
      this.authService.updateUserStatus();
      const options = {
        method: "GET",
        headers: new Headers({'Authorization': `Token ${localStorage.getItem('Token')}`}),
    };
      fetch('http://localhost:4001/user/updateuserStatus/1', options)
    });

    setTimeout(() => {
      this.authService.updateUserStatus().subscribe(res=>{
      });
    }, 4000);
  }
}
