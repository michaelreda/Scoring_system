import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  team1:Team;
  team2:Team;
  team3:Team;
  team4:Team;

  constructor(){
    this.initialize();
  }

  initialize(){
    if(!localStorage.getItem('money')){
      localStorage.setItem('money',JSON.stringify({team1:0,team2:0,team3:0,team4:0}));
    }else{
      console.log(JSON.parse(localStorage.getItem('money')));
    }

    if(!localStorage.getItem('purchases')){
      var team={
        hotel:{ 
          purchased:false,
          rooms: 0
        },hospital:{
          purchased:false,
          beds:0
        },cars_shop:{
          purchased:false,
          cars:0
        },restaurant:{
          purchased:false,
          tables:0
        }
      }
      localStorage.setItem('purchases',JSON.stringify({team1:team,team2:team,team3:team,team4:team}));
    }else{
      console.log(JSON.parse(localStorage.getItem('purchases')))
    }
  }

}
export interface Team{
  money:number;
}
