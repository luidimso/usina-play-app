import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { User } from '../models/user,interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private user: Observable<User> = this.userService.getUserById("Qc8chmCKIo0KPkzZDDeU");

  constructor(
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    console.log(this.user);
  }

}
