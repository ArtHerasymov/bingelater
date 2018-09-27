import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: Object

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile =>{
      this.user = profile.user
    }, err => {
      console.log(err)
      return false
    })
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/'])
    return false
  }

}
