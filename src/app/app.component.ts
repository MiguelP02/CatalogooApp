import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, DoCheck{
  public title = 'CatalogoApp';
  public identity: any;
  public token: any;

  constructor(
    public _userService: UserService
  ){
    this.loadUser();
  }

  ngOnInit(): void {
    console.log('it works...')
  }

  ngDoCheck(): void {
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}
