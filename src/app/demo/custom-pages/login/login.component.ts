import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {fadeInAnimation} from "../../../route.animation";
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private router: Router, private userService: UserService
  ) { }

  ngOnInit() {
  }

  login() {
    //this.router.navigate(['/']);
    this.userService.login(this.username,this.password).subscribe((result) => {
      if (result) {
        this.router.navigate(['/']);
      }
    });
  }

}
