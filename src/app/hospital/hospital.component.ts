import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  left:any;
  top:any;
  @Input() team:number;
  constructor() { 

  }

  ngOnInit() {
    if(this.team==1){
      this.left= "330px";
      this.top= "66px";
    }else if(this.team==2){
      this.left= "745px";
      this.top= "66px";
    }else if(this.team==3){
      this.left= "330px";
      this.top= "315px";
    }else if(this.team==4){
      this.left= "745px";
      this.top= "315px";
    }
  }

}
