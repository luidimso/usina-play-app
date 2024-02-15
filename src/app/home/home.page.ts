import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { User } from '../models/user,interface';
import { Program } from '../models/program.interface';
import { ProgramsService } from '../services/programs.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public userId:string = "Qc8chmCKIo0KPkzZDDeU";

  private users: Observable<User> = this.userService.getUserById(this.userId);
  public programs: Observable<Program[]> = this.programService.getPrograms();

  public hasNewProgram:boolean = false;

  public user: User;
  public background: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCfbdjhX8vUFbc-r7s-6vswI3Zpuz1PzcTug&usqp=CAU";
  
  constructor(
    private userService: UsersService,
    private programService: ProgramsService
  ) {}

  ngOnInit(): void {
    this.users.subscribe(u => {
      this.user = u;
    });

    this.programs.subscribe(ps => {
      this.hasNewProgram = false;
      const today = new Date();
      const sevenDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

      ps.forEach(p => {
        const programDate = new Date(p.createdAt);

        if(programDate > sevenDaysAgo) {
          this.hasNewProgram = true;
        }
      })
    });
  }

}
