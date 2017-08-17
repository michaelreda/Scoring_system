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
        this.backup();
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
    this.http.post('https://landscoringsys.herokuapp.com/backup', { money: money, purchases: purchases, upgrades: upgrades }).subscribe((data) => {
      var res = data['_body'];
      console.log(res);
      if (res == "OK") {
        alert("backed up");
      } else {
        alert("error backing up");
      }
    });

  }

  restore() {
    this.http.get('https://landscoringsys.herokuapp.com/restore_money').subscribe((data) => {
      var money = JSON.parse(data['_body']);
      console.log(money);
      localStorage.setItem('money', money.backup);
      this.http.get('https://landscoringsys.herokuapp.com/restore_purchases').subscribe((data) => {
        var purchases = JSON.parse(data['_body']);
        console.log(purchases);
        localStorage.setItem('purchases', purchases.backup);
        this.http.get('https://landscoringsys.herokuapp.com/restore_upgrades').subscribe((data) => {
          console.log(data)
          var upgrades = JSON.parse(data['_body']);
          console.log(upgrades);
          localStorage.setItem('upgrades', upgrades.backup);
          this.reload_page();
        });
      });
    });
  }

  get_winners() {
    var password = prompt("WINNERS PASSWORD ?");
    if (password != "HOBA") {
      return;
    }
    var teams_wealth = [];
    var teams_money = JSON.parse(localStorage.getItem("money"));
    var teams_purchases = JSON.parse(localStorage.getItem("purchases"));
    var teams_upgrades = JSON.parse(localStorage.getItem("upgrades"));
    for (let i = 1; i < 5; i++) {
      let team_wealth = 0;
      team_wealth += this.calculate_money(i,teams_money['team'+i]);
      team_wealth += this.spent_money(i);
      console.log(team_wealth);
      // AppSettings['team'+i+'_name']
      teams_wealth.push(JSON.stringify({'team_name': AppSettings['team'+i+'_name'],'team_wealth':team_wealth}));
    }
    teams_wealth=teams_wealth.sort((a,b)=>{
      var aa= JSON.parse(a);
      var bb= JSON.parse(b);
      return bb.team_wealth-aa.team_wealth;
    });
    var results="Rankings: \n";
    for(let i=0;i<teams_wealth.length;i++){
      let rank = i+1;
      results+= ""+rank+") "+JSON.parse(teams_wealth[i]).team_name+" : "+JSON.parse(teams_wealth[i]).team_wealth+"\n";
    }
    alert(results);
  }

  public calculate_money(team, team_money) {
    var money = 0;
    money += team_money;//bank
    money += this.total_profit(JSON.parse(localStorage.getItem('purchases'))['team'+team],JSON.parse(localStorage.getItem('upgrades'))['team'+team]);
    // money -= this.spent_money();
    return money;
  }

  total_profit(team_purchases,team_upgrades) {
    var sum = 0;
    if (team_purchases.hotel.purchased) {
      sum += this.calculate_hours(team_purchases.hotel.purchased_since) * team_purchases.hotel.rooms * AppSettings.room_per_hour;
      for (let i = 0; i < team_upgrades.rooms.length; i++) {
        sum += this.calculate_hours(team_upgrades.rooms[i]) * 10 * AppSettings.room_per_hour;
      }
    }
    return sum;
  }

  calculate_hours(x) {
    var input_date: any = new Date(x);
    var now: any = new Date(Date.now());
    return Math.floor(Math.abs(now - input_date) / 36e5);
  }

   public spent_money(team) {
    var sum = 0;
    var team_purchases=JSON.parse(localStorage.getItem('purchases'))['team'+team];
    var team_upgrades=JSON.parse(localStorage.getItem('upgrades'))['team'+team];
    if (team_purchases.hospital.purchased) {
      sum += AppSettings.HOSPITAL_PRICE;
      sum += team_upgrades.beds.length * AppSettings.ten_beds_price;
    }

    if (team_purchases.hotel.purchased) {
      sum += AppSettings.HOTEL_PRICE;
      sum += team_upgrades.rooms.length * AppSettings.ten_rooms_price;
    }

    if (team_purchases.restaurant.purchased) {
      sum += AppSettings.RESTAURANT_PRICE;
      sum += team_upgrades.tables.length * AppSettings.ten_tables_price;
    }

    if (team_purchases.cars_shop.purchased) {
      sum += AppSettings.CARS_SHOP_PRICE;
      sum += team_upgrades.cars.length * AppSettings.ten_cars_price;
    }

    // console.log("spent money : " + sum);
    return sum;
  }

}
export interface Team {
  money: number;
}
