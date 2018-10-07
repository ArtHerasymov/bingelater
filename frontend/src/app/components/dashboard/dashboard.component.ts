import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { ServersideService } from '../../services/serverside.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: Object
  posts: Object
  dataArrivalFlag: boolean

  constructor(
    private authService: AuthenticationService,
    private serverService: ServersideService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataArrivalFlag = false;
    this.username = this.authService.getUsername()
    this.serverService.getRecommendations(this.username).subscribe(recs => {
        this.posts = recs.posts
        this.dataArrivalFlag = true
      })
  }

  onAdvisorRequested(advisor){
    this.dataArrivalFlag = false;
    this.serverService.getRecsByAdvisor(advisor).subscribe(recs => {
      console.log(recs)
      this.posts = recs.posts
      this.dataArrivalFlag = true
    })
  }

  onRemoveRecommendation(id){
    this.dataArrivalFlag = false
    this.serverService.removeRecommendation(id).subscribe(res => {
      if(res.success == true){
        this.posts = this.posts.filter(function( obj ) {
          return obj._id !== id;
        })
      }
      this.dataArrivalFlag = true
    })
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/'])
    return false
  }

}
