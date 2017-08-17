import { Observable } from 'rxjs/Rx';

import { AppSettings } from './../AppSettings';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})


export class TeamComponent implements OnInit {
  islocked: number;
  team_name: string;
  upgrades: any;
  teams_upgrades: any;
  @Input() team: number;
  bank: any;
  hotel_price = AppSettings.HOTEL_PRICE;
  hospital_price = AppSettings.HOSPITAL_PRICE;
  restaurant_price = AppSettings.RESTAURANT_PRICE;
  cars_shop_price = AppSettings.CARS_SHOP_PRICE;
  teams_money: any;
  teams_purchases: any;
  purchases: any;
  hotelLeft;
  hotelTop;
  carsShopLeft;
  carsShopTop;
  AppSettings;
  total_money: number;

  ngOnInit() {
    this.AppSettings = AppSettings;
    if (this.team == 1) {
      this.hotelLeft = "439px";
      this.hotelTop = "150px";
      this.carsShopLeft = "104px";
      this.carsShopTop = "202px";
    } else if (this.team == 2) {
      this.hotelLeft = "1046px";
      this.hotelTop = "155px";
      this.carsShopLeft = "660px";
      this.carsShopTop = "210px";
    } else if (this.team == 3) {
      this.hotelLeft = "452px;";
      this.hotelTop = "515px";
      this.carsShopLeft = "104px";
      this.carsShopTop = "582px";
    } else if (this.team == 4) {
      this.hotelLeft = "1044px";
      this.hotelTop = "517px";
      this.carsShopLeft = "660px";
      this.carsShopTop = "582px";
    }

    switch (this.team) {
      case 1: this.team_name = AppSettings.team1_name; break;
      case 2: this.team_name = AppSettings.team2_name; break;
      case 3: this.team_name = AppSettings.team3_name; break;
      case 4: this.team_name = AppSettings.team4_name; break;
    }

    this.update_data_from_local_storage();
    console.log(this.purchases.hotel);
  }

  update_data_from_local_storage() {
    this.teams_money = JSON.parse(localStorage.getItem('money'));
    switch (this.team) {
      case 1: this.bank = this.teams_money.team1; break;
      case 2: this.bank = this.teams_money.team2; break;
      case 3: this.bank = this.teams_money.team3; break;
      case 4: this.bank = this.teams_money.team4; break;
    }
    this.teams_purchases = JSON.parse(localStorage.getItem('purchases'));
    switch (this.team) {
      case 1: this.purchases = this.teams_purchases.team1; break;
      case 2: this.purchases = this.teams_purchases.team2; break;
      case 3: this.purchases = this.teams_purchases.team3; break;
      case 4: this.purchases = this.teams_purchases.team4; break;
    }

    this.teams_upgrades = JSON.parse(localStorage.getItem('upgrades'));
    switch (this.team) {
      case 1: this.upgrades = this.teams_upgrades.team1; break;
      case 2: this.upgrades = this.teams_upgrades.team2; break;
      case 3: this.upgrades = this.teams_upgrades.team3; break;
      case 4: this.upgrades = this.teams_upgrades.team4; break;
    }

    this.total_money = this.calculate_money();
  }

  buy_hotel() {
    if (!this.password_check()) {
      return;
    }
    this.update_data_from_local_storage();
    if (this.bank >= AppSettings.HOTEL_PRICE) {
      console.log("team " + this.team + " bought hotel");
      this.transaction(this.team, -AppSettings.HOTEL_PRICE);
      this.purchase("hotel");
      alert("team " + this.team + " bought hotel");
    } else {
      alert("you don't have enough money");
    }
  }
  buy_cars_shop() {
    if (!this.password_check()) {
      return;
    }
    this.update_data_from_local_storage();
    if (this.bank >= AppSettings.CARS_SHOP_PRICE) {
      console.log("team " + this.team + " bought cars shop");
      this.transaction(this.team, -AppSettings.CARS_SHOP_PRICE);
      this.purchase("cars_shop");
      alert("team " + this.team + " bought cars shop");
    } else {
      alert("you don't have enough money");
    }
  }

  buy_hospital() {
    if (!this.password_check()) {
      return;
    }
    this.update_data_from_local_storage();
    if (this.bank >= AppSettings.HOSPITAL_PRICE) {
      console.log("team " + this.team + " bought hospital");
      this.transaction(this.team, -AppSettings.HOSPITAL_PRICE);
      this.purchase("hospital");
      alert("team " + this.team + " bought hospital");
    } else {
      alert("you don't have enough money");
    }
  }

  buy_restaurant() {
    if (!this.password_check()) {
      return;
    }
    this.update_data_from_local_storage();
    if (this.bank >= AppSettings.RESTAURANT_PRICE) {
      console.log("team " + this.team + " bought restaurant");
      this.transaction(this.team, -AppSettings.RESTAURANT_PRICE);
      this.purchase("restaurant");
      alert("team " + this.team + " bought restaurant");
    } else {
      alert("you don't have enough money");
    }
  }

  upgrade_cars_shop() {
    if (!this.password_check()) {
      return;
    }
    this.update_data_from_local_storage();
    this.transaction(this.team, -AppSettings.ten_cars_price);
    this.upgrades.cars.push(Date.now());
    switch (this.team) {
      case 1: this.teams_upgrades.team1 = this.upgrades; break;
      case 2: this.teams_upgrades.team2 = this.upgrades; break;
      case 3: this.teams_upgrades.team3 = this.upgrades; break;
      case 4: this.teams_upgrades.team4 = this.upgrades; break;
    }
    localStorage.setItem('upgrades', JSON.stringify(this.teams_upgrades));
    this.update_data_from_local_storage();
  }
  upgrade_hotel() {
    if (!this.password_check()) {
      return;
    }
    this.update_data_from_local_storage();
    this.transaction(this.team, -AppSettings.ten_rooms_price);
    this.upgrades.rooms.push(Date.now());
    switch (this.team) {
      case 1: this.teams_upgrades.team1 = this.upgrades; break;
      case 2: this.teams_upgrades.team2 = this.upgrades; break;
      case 3: this.teams_upgrades.team3 = this.upgrades; break;
      case 4: this.teams_upgrades.team4 = this.upgrades; break;
    }
    localStorage.setItem('upgrades', JSON.stringify(this.teams_upgrades));
    this.update_data_from_local_storage();
  }

  upgrade_hospital() {
    if (!this.password_check()) {
      return;
    }
    this.update_data_from_local_storage();
    this.transaction(this.team, -AppSettings.ten_beds_price);
    this.upgrades.beds.push(Date.now());
    switch (this.team) {
      case 1: this.teams_upgrades.team1 = this.upgrades; break;
      case 2: this.teams_upgrades.team2 = this.upgrades; break;
      case 3: this.teams_upgrades.team3 = this.upgrades; break;
      case 4: this.teams_upgrades.team4 = this.upgrades; break;
    }
    localStorage.setItem('upgrades', JSON.stringify(this.teams_upgrades));
    this.update_data_from_local_storage();
  }

  upgrade_restaurant() {
    if (!this.password_check()) {
      return;
    }
    this.update_data_from_local_storage();
    this.transaction(this.team, -AppSettings.ten_tables_price);
    this.upgrades.tables.push(Date.now());
    switch (this.team) {
      case 1: this.teams_upgrades.team1 = this.upgrades; break;
      case 2: this.teams_upgrades.team2 = this.upgrades; break;
      case 3: this.teams_upgrades.team3 = this.upgrades; break;
      case 4: this.teams_upgrades.team4 = this.upgrades; break;
    }
    localStorage.setItem('upgrades', JSON.stringify(this.teams_upgrades));
    this.update_data_from_local_storage();
  }

  transaction(team, amount) {
    this.bank += amount;
    switch (team) {
      case 1: this.teams_money.team1 = this.bank; break;
      case 2: this.teams_money.team2 = this.bank; break;
      case 3: this.teams_money.team3 = this.bank; break;
      case 4: this.teams_money.team4 = this.bank; break;
    }
    localStorage.setItem('money', JSON.stringify(this.teams_money));
  }

  purchase(purchase) {
    console.log(this.purchases);
    switch (purchase) {
      case "hotel": this.purchases.hotel.purchased = true;
        this.purchases.hotel.rooms = AppSettings.DEFAULT_ROOMS_NUM;
        this.purchases.hotel.purchased_since = Date.now(); break;
      case "hospital": this.purchases.hospital.purchased = true;
        this.purchases.hospital.beds = AppSettings.DEFAULT_BEDS_NUM;
        this.purchases.hospital.purchased_since = Date.now(); break;
      case "restaurant": this.purchases.restaurant.purchased = true;
        this.purchases.restaurant.tables = AppSettings.DEFAULT_TABLES_NUM;
        this.purchases.restaurant.purchased_since = Date.now(); break;
      case "cars_shop": this.purchases.cars_shop.purchased = true;
        this.purchases.cars_shop.cars = AppSettings.DEFAULT_CARS_NUM;
        this.purchases.cars_shop.purchased_since = Date.now(); break;
    }

    switch (this.team) {
      case 1: this.teams_purchases.team1 = this.purchases; break;
      case 2: this.teams_purchases.team2 = this.purchases; break;
      case 3: this.teams_purchases.team3 = this.purchases; break;
      case 4: this.teams_purchases.team4 = this.purchases; break;
    }
    localStorage.setItem('purchases', JSON.stringify(this.teams_purchases));
    this.update_data_from_local_storage();
  }

  current_profit() {
    var sum = 0;
    sum += (this.purchases.hospital.beds + this.upgrades.beds.length * 10) * AppSettings.bed_per_hour;
    sum += (this.purchases.hotel.rooms + this.upgrades.rooms.length * 10) * AppSettings.room_per_hour;
    sum += (this.purchases.cars_shop.cars + this.upgrades.cars.length * 10) * AppSettings.car_per_hour;
    sum += (this.purchases.restaurant.tables + this.upgrades.tables.length * 10) * AppSettings.table_per_hour;
    return sum;
  }

  spent_money() {
    var sum = 0;

    if (this.purchases.hospital.purchased) {
      sum += AppSettings.HOSPITAL_PRICE;
      sum += this.upgrades.beds.length * AppSettings.ten_beds_price;
    }

    if (this.purchases.hotel.purchased) {
      sum += AppSettings.HOTEL_PRICE;
      sum += this.upgrades.rooms.length * AppSettings.ten_rooms_price;
    }

    if (this.purchases.restaurant.purchased) {
      sum += AppSettings.RESTAURANT_PRICE;
      sum += this.upgrades.tables.length * AppSettings.ten_tables_price;
    }

    if (this.purchases.cars_shop.purchased) {
      sum += AppSettings.CARS_SHOP_PRICE;
      sum += this.upgrades.cars.length * AppSettings.ten_cars_price;
    }

    console.log("spent money : " + sum);
    return sum;
  }

  total_profit() {
    var sum = 0;
    if (this.purchases.hotel.purchased) {
      sum += this.calculate_hours(this.purchases.hotel.purchased_since) * this.purchases.hotel.rooms * AppSettings.room_per_hour;
      for (let i = 0; i < this.upgrades.rooms.length; i++) {
        sum += this.calculate_hours(this.upgrades.rooms[i]) * 10 * AppSettings.room_per_hour;
      }
    }
    return sum;
  }

  calculate_money() {
    var money = 0;
    money += this.bank;//bank
    money += this.total_profit();
    // money -= this.spent_money();
    return money;
  }

  calculate_hours(x) {
    var input_date: any = new Date(x);
    var now: any = new Date(Date.now());
    return Math.floor(Math.abs(now - input_date) / 36e5);
  }

  add_money() {
    if (this.password_check()) {
      var input = prompt("Enter amount of money");
      if (input != "" && input != null) {
        console.log(input);
        this.bank += parseInt(input);
        console.log(this.bank);
        switch (this.team) {
          case 1: this.teams_money.team1 = this.bank; break;
          case 2: this.teams_money.team2 = this.bank; break;
          case 3: this.teams_money.team3 = this.bank; break;
          case 4: this.teams_money.team4 = this.bank; break;
        }
        console.log(this.teams_money);
        localStorage.setItem('money', JSON.stringify(this.teams_money));
        this.update_data_from_local_storage();
      }
    }

  }
  
  password_check() {

    if (this.islocked <= 0 || !this.islocked) {
      var password = prompt("PASSWORD ?");
      var now = new Date(Date.now());
      if (parseInt(password) == now.getMinutes()) {
        this.islocked = 30;
        Observable.interval(1000).subscribe(() => {
          this.islocked -= 1;
        });
        return true;
      } else {
        alert("wrong password");
        return false;
      }
    } else {
      this.islocked = 30;
      return true;
    }
  }
}
