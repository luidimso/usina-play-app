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
  public userId:string = "Qc8chmCKIo0KPkzZDDeU";

  private users: Observable<User> = this.userService.getUserById(this.userId);
  public user: User;

  constructor(
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.users.subscribe(u => {
      this.user = u;
    });
  }

}
