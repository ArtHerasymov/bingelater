import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http'

@Injectable({
  providedIn: 'root'
})

export class ServersideService {

  constructor(private http: Http) { }

  getRecommendations(){
    let headers = new Headers()
    headers.append('Content-Type' , 'application/json')
    return this.http.get('http://localhost:3000/getRecommendations/1', {headers:headers})
      .map(res => res.json())
  }
}
