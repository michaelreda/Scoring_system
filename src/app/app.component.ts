import { AppSettings } from './AppSettings';
import { Component, NgZone } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  team1: Team;
  team2: Team;
  team3: Team;
  team4: Team;
  AppSettings;
  current_time: any;
  constructor(private zone: NgZone, public http: Http) {
    this.initialize();
    Observable.interval(1000).subscribe(x => {
      this.current_time = Date.now();
      if (new Date().getMinutes() == 0 && new Date().getSeconds() == 0) {
        this.zone.runOutsideAngular(() => {
          this.reload_page();
        });
      }
    });

  }

  reload_page() {
    this.zone.runOutsideAngular(() => {
      location.reload();
    });
  }

  initialize() {
    if (!localStorage.getItem('money')) {
      localStorage.setItem('money', JSON.stringify({ team1: 0, team2: 0, team3: 0, team4: 0 }));
    } else {
      console.log(JSON.parse(localStorage.getItem('money')));
    }
    this.AppSettings = AppSettings;
    if (!localStorage.getItem('purchases')) {
      var team = {
        hotel: {
          purchased: false,
          rooms: 0
        }, hospital: {
          purchased: false,
          beds: 0
        }, cars_shop: {
          purchased: false,
          cars: 0
        }, restaurant: {
          purchased: false,
          tables: 0
        }
      }
      localStorage.setItem('purchases', JSON.stringify({ team1: team, team2: team, team3: team, team4: team }));
    } else {
      console.log(JSON.parse(localStorage.getItem('purchases')))
    }

    if (!localStorage.getItem('upgrades')) {
      var team_upgrades = {
        beds: []
        , rooms: []
        , cars: []
        , tables: []
      }
      localStorage.setItem('upgrades', JSON.stringify({ team1: team_upgrades, team2: team_upgrades, team3: team_upgrades, team4: team_upgrades }));
    } else {
      console.log(JSON.parse(localStorage.getItem('upgrades')))
    }
  }

  backup() {
    var money = localStorage.getItem('money');
    var purchases = localStorage.getItem('purchases');
    var upgrades = localStorage.getItem('upgrades');
    this.http.post('http://localhost:8080/backup', { money: money, purchases: purchases, upgrades: upgrades }).subscribe((data) => {
      var res = JSON.parse(data['_body']);
      console.log(res);
    });
  }

  restore() {
    this.http.get('http://localhost:8080/restore_money').subscribe((data) => {
      var money = JSON.parse(data['_body']);
      console.log(money);
      localStorage.setItem('money',money);
      this.http.get('http://localhost:8080/restore_purchases').subscribe((data) => {
        var purchases = JSON.parse(data['_body']);
        console.log(purchases);
        localStorage.setItem('purchases',purchases);
        this.http.get('http://localhost:8080/restore_upgrades').subscribe((data) => {
          var upgrades = JSON.parse(data['_body']);
          console.log(upgrades);
          localStorage.setItem('upgrades',upgrades);
          // this.reload_page();
        });
      });
    });


  }
}
export interface Team {
  money: number;
}
