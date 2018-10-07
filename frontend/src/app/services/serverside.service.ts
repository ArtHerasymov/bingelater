import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http'

@Injectable({
  providedIn: 'root'
})

export class ServersideService {

  constructor(
    private http: Http
  ) { }

  getRecommendations(user){
    let headers = new Headers()
    headers.append('Content-Type' , 'application/json')
    return this.http.get('http://localhost:3001/users/getRecommendations/'+ user, {headers:headers})
      .map(res => res.json())
  }

  getRecsByAdvisor(advisor){
    console.log('ss in : ' + advisor)
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.get('http://localhost:3001/users/getByAdvisor/'+ advisor, {headers:headers})
      .map(res => res.json())
  }
}
