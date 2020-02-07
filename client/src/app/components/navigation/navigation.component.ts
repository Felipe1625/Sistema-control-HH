import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public authServiceLogin:AuthService,private router:Router) { }

  ngOnInit() {
  }


  loggOut(){
    this.authServiceLogin.logOut();
    this.router.navigate(['/index'])

  }

}
