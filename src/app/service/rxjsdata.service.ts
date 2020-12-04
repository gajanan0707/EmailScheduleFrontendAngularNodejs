import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import 'rxjs/add/operator/distinctUntilChanged'

@Injectable({
  providedIn: 'root'
})
export class RxjsdataService {

  constructor() { }


  public isLoginSerivceSubject = new  BehaviorSubject(false);
  public isLoginSerivce = this.isLoginSerivceSubject.asObservable().distinctUntilChanged();


  updateLoginStatus(isLogin){
    this.isLoginSerivceSubject.next(isLogin)
  }
}

