import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String
  password: String

  constructor(
    private authenticationService : AuthenticationService
  ) { }

  ngOnInit() {
  }

  testBackend() {

    const user = {
      username: this.username,
      password: this.password
    }


    this.authenticationService.registerUser(user).subscribe(data => {
      if(data.success){
        console.log("Success")
      } else {
        console.log("Failure")
      }
    })
  }
}
