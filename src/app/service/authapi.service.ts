import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthapiService {

  //--------------defiend base url-----------------------------------------
  baseUri: string = 'http://localhost:4001/';

  //--------------Defiend headers------------------------------------------
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  //--------------Register New User Api--------------------------------------
  createNewUser(payload) {
    return this.http.post(`${this.baseUri}user/register`, payload);
  }

  //--------------Login User Api --------------------------------------------
  userLogin(payload) {
    return this.http.post(`${this.baseUri}user/login`, payload);
  }

  //--------------------login user get----------------------------------------
  getuserlogin() {
    return this.http.get(`${this.baseUri}user/profile`)
  }

  //--------------------logout user get----------------------------------------
  logoutuser() {
    return this.http.get(`${this.baseUri}user/logout`)
  }

  //--------------Create Email Shedule Api----------------------------------------
  createemailshedule(payload) {
    return this.http.post(`${this.baseUri}user/sheduleemail`, payload)
  }

  //--------------------getemail shedule------------------------------------------
  getemailshedules() {
    return this.http.get(`${this.baseUri}user/getemailshedule`)
  }

  //--------------Update Shdeule-------------------------------------------
  updateshedule(id, data) {
    let url = `${this.baseUri}user/updateShedule/${id}`
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  //--------------Update Status-------------------------------------------
  updateStatus(id, data) {
    let url = `${this.baseUri}user/status/${id}`
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  //--------------delete shdedule-----------------------------------------
  deleteshedule(id) {
    let url = `${this.baseUri}user/deletshedule/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  //--------------get all users-------------------------------------------
  usergetall() {
    return this.http.get(`${this.baseUri}user/getusers`)
  }

  //--------------Update email user----------------------------------------
  updateemailuser(id, data) {
    let url = `${this.baseUri}user/adduser/${id}`
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  //--------------user status------------------------------------------------
  updateUserStatus() {
    return this.http.get(`${this.baseUri}user/updateuserStatus/2`)
  }

  //---------------Error handling--------------------------------
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
