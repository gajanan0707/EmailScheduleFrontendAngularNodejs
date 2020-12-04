import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnoozeService } from 'src/app/service/snooze.service';


@Component({
  selector: 'app-snooze-on',
  templateUrl: './snooze-on.component.html',
  styleUrls: ['./snooze-on.component.scss']
})
export class SnoozeOnComponent implements OnInit {
  getstop=[]
  getSheduleSnooze: any = []
  valueChange = "";
  onSnooze:any;
  idget='';
  snoozeonofform: FormGroup;

  constructor(public authService:SnoozeService,public formBuilder: FormBuilder) { }
  

  ngOnInit(): void {
    this.createSnoozeOnOff()
    this.authService.getsnoozeshedules().subscribe((res: any) => {
      this.getstop = [res];
      this.getstop.map(ress => {
        this.getSheduleSnooze = ress.data
        this.getSheduleSnooze.map(a => {
          this.onSnooze=a.snoozeStatus
          this.idget=a._id
        })
  
      })
    }
    )

  }

  //----------------Create Stop snooze Form----------------------------
  createSnoozeOnOff() {
    this.snoozeonofform = this.formBuilder.group({
      snoozeStatus: [''],
    });
  }

   //-----------on off value changes----------------------------------------
   onValueChange(value) {
    this.valueChange = value;
  }

  //-----------on off status For Snooze Email Sending-----------------------------------------------
  getid(id) {
    this.idget = id
    this.snoozeonofform.value.snoozeStatus = this.valueChange
    if (this.idget == id) {
      this.authService.updateSnooze(this.idget, this.snoozeonofform.value)
        .subscribe(res => {
        })
    }
  }

}
