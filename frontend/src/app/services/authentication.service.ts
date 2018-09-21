import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authToken: any
  user: any

  constructor(private http: Http) { }

  registerUser(user){
    let headers = new Headers()
    headers.append('Content-Type' , 'application/json')
    return this.http.post('http://localhost:3000/users/register',user, {headers:headers})
      .map(res => res.json())
  }

  loginUser(user){
    let headers = new Headers()
    headers.append('Content-Type' , 'application/json')
    return this.http.post('http://localhost:3000/users/login' , user, {headers:headers})
      .map(res => res.json())
  }

  storeUserData(token , user){
    localStorage.setItem('id_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token
    this.user = user
  }


}
