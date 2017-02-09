import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../../../route.animation";
import {Router} from "@angular/router";
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class RegisterComponent implements OnInit {

  user: string;
  email: string;
  password: string;
  passwordConfirm: string;
  firstname: string;
  lastname: string;

  constructor(
    private router: Router, private userService: UserService
  ) { }

  ngOnInit() {
  }

  register() {
    this.userService.register(this.user, this.email, this.password, this.firstname, this.lastname)
     .subscribe((result) => {
      if (result) {
        this.router.navigate(['/']);
      }
  });
}
}
