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
  advisors: Object
  dataArrivalFlag: boolean
  filterSelected: boolean
  currentFilter: String
  // Arrays that contain user's recommendations
  seenPosts: any
  pendingPosts: any
  posts: any
  cachedPosts: any

  constructor(
    private authService: AuthenticationService,
    private serverService: ServersideService,
    private router: Router
  ) {
    this.advisors = new Set()

    this.posts = new Set()
    this.pendingPosts = new Array()
    this.seenPosts = new Array()
    this.cachedPosts = new Array()
  }

  ngOnInit() {
    this.dataArrivalFlag = false
    this.filterSelected = false
    this.currentFilter = ''

    this.username = this.authService.getUsername()
    this.serverService.getRecommendations(this.username).subscribe(recs => {
        for(let post of recs.posts){
          if(post.status == "Pending") this.pendingPosts.push(post)
          else this.seenPosts.push(post)
        }
        this.posts = recs.posts
        this.cachedPosts = recs.posts
        this.dataArrivalFlag = true
      })
  }

  onAdvisorRequested(advisor){
    this.dataArrivalFlag = false
    this.serverService.getRecsByAdvisor(advisor).subscribe(recs => {
      this.posts = recs.posts
      this.dataArrivalFlag = true
      this.currentFilter = advisor
      this.filterSelected = true
    })
  }

  onPendingSelected(){
    this.dataArrivalFlag = false
    this.posts = this.pendingPosts
    this.dataArrivalFlag = true
  }

  onSeenSelected(){
    this.dataArrivalFlag = false;
    this.posts = this.seenPosts
    this.dataArrivalFlag = true
  }

  onAllSelected(){
    this.dataArrivalFlag = false
    this.posts = this.cachedPosts
    this.dataArrivalFlag = true
  }

  onAdvisorRemoved(){
    this.dataArrivalFlag = false
    this.dataArrivalFlag = true
    this.posts = this.cachedPosts
    this.filterSelected = false
  }

  onRemoveRecommendation(id){
    this.dataArrivalFlag = false
    this.serverService.removeRecommendation(id).subscribe(res => {
      if(res.success == true){
        this.posts = this.posts.filter(function( obj ) {
          return obj._id !== id
        })
        this.pendingPosts = this.pendingPosts.filter((obj) => {
          return obj._id !== id
        })
        this.seenPosts = this.seenPosts.filter((obj) => {
          return obj._id !== id
        })
      }
      this.dataArrivalFlag = true
    })
  }

  onMarkAsSeen(id){
    this.dataArrivalFlag = false
      this.serverService.updateStatus(id).subscribe(res => {
        for(let marked of this.pendingPosts){
          if(marked._id == id){
            marked.status = "Seen"
            this.seenPosts.push(marked)
            this.pendingPosts.splice(this.pendingPosts.findIndex(item => item._id === id), 1)
          }
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
