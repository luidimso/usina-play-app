import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { User } from '../models/user,interface';
import { Program } from '../models/program.interface';
import { ProgramsService } from '../services/programs.service';
import { AlertController } from '@ionic/angular';

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
  public programsCards: Program[];
  public background: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCfbdjhX8vUFbc-r7s-6vswI3Zpuz1PzcTug&usqp=CAU";
  
  constructor(
    private userService: UsersService,
    private programService: ProgramsService,
    private alertCtrl: AlertController
  ) {}



  ngOnInit(): void {
    this.users.subscribe(u => {
      this.user = u;
    });

    this.programs.subscribe(ps => {

      this.programsCards = ps.sort((a, b) => {
        if(new Date(a.createdAt) > new Date(b.createdAt)) {
          return -1;
        } else if(new Date(b.createdAt) > new Date(a.createdAt)) {
          return 1;
        } else {
          return 0;
        }
      });

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
  

  async addProgram() {
    const alert = await this.alertCtrl.create({
      header: 'Criar um novo programa',
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome do programa',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Criar',
          handler: res => {
            if(res.nome) {
              const date = new Date().toISOString();
              const body:Program = {
                createdAt: date,
                nome: res.nome,
                status: "Novo"
              }

              this.programService.addProgram(body).then(() => {
                window.location.reload();
              });
            };
          }
        }
      ]
    });

    await alert.present();
  }
}
