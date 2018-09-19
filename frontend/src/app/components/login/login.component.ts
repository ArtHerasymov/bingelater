import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticationService : AuthenticationService
  ) { }

  ngOnInit() {
  }

  testBackend() {
    this.authenticationService.registerUser(1).subscribe(data => {
      if(data.success){
        console.log("Success")
      } else {
        console.log("Failure")
      }
    })
  }
}
