import { Component, Input, OnInit } from '@angular/core';
import { Program } from 'src/app/models/program.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  @Input() program:Program;
  @Input() background:string;

  constructor() { }

  ngOnInit() {}

}
