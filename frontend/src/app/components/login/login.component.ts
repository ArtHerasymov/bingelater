import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String
  password: String

  constructor(
    private authenticationService : AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  registerUser() {
    const user = {
      username: this.username,
      password: this.password
    }
    this.authenticationService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.router.navigate([''])
      } else {
        console.log('Error')
      }
    })
  }

  loginUser() {
      const user = {
        username: this.username,
        password: this.password
      }

      this.authenticationService.loginUser(user)
        .subscribe(data => {
          if(data.success){
            this.authenticationService.storeUserData(data.token, data.user)
            this.router.navigate(['/dashboard'])
          } else {
            this.router.navigate([''])
          }
        })

  }

}
