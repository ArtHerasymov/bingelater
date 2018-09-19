import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: Http) { }

  registerUser(user){
    let headers = new Headers()
    headers.append('Content-Type' , 'application/json')
    console.log("in")
    return this.http.get('http://localhost:3000/users/register', user, {headers:headers})
      .map(res => res.json())
  }

}
