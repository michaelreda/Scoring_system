import { AppSettings } from './../AppSettings';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})


export class TeamComponent implements OnInit {
  @Input() team: number;
  money: any;
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

  ngOnInit() {
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

    this.teams_money = JSON.parse(localStorage.getItem('money'));
    switch (this.team) {
      case 1: this.money = this.teams_money.team1; break;
      case 2: this.money = this.teams_money.team2; break;
      case 3: this.money = this.teams_money.team3; break;
      case 4: this.money = this.teams_money.team4; break;
    }
    this.teams_purchases = JSON.parse(localStorage.getItem('purchases'));
    switch (this.team) {
      case 1: this.purchases = this.teams_purchases.team1; break;
      case 2: this.purchases = this.teams_purchases.team2; break;
      case 3: this.purchases = this.teams_purchases.team3; break;
      case 4: this.purchases = this.teams_purchases.team4; break;
    }

  }

  buy_hotel() {
    if (this.money >= AppSettings.HOTEL_PRICE) {
      console.log("team " + this.team + " bought hotel");
      this.transaction(this.team, -AppSettings.HOTEL_PRICE);
      this.purchase("hotel");
      alert("team " + this.team + " bought hotel");
    } else {
      alert("you don't have enough money");
    }
  }
  buy_cars_shop() {
    if (this.money >= AppSettings.CARS_SHOP_PRICE) {
      console.log("team " + this.team + " bought cars shop");
      this.transaction(this.team, -AppSettings.CARS_SHOP_PRICE);
      this.purchase("cars_shop");
      alert("team " + this.team + " bought cars shop");
    } else {
      alert("you don't have enough money");
    }
  }

  buy_hospital() {
    if (this.money >= AppSettings.HOSPITAL_PRICE) {
      console.log("team " + this.team + " bought hospital");
      this.transaction(this.team, -AppSettings.HOSPITAL_PRICE);
      this.purchase("hospital");
      alert("team " + this.team + " bought hospital");
    } else {
      alert("you don't have enough money");
    }
  }

  buy_restaurant() {
    if (this.money >= AppSettings.RESTAURANT_PRICE) {
      console.log("team " + this.team + " bought restaurant");
      this.transaction(this.team, -AppSettings.RESTAURANT_PRICE);
      this.purchase("restaurant");
      alert("team " + this.team + " bought restaurant");
    } else {
      alert("you don't have enough money");
    }
  }

  transaction(team, amount) {
    this.money += amount;
    switch (team) {
      case 1: this.teams_money.team1 = this.money; break;
      case 2: this.teams_money.team2 = this.money; break;
      case 3: this.teams_money.team3 = this.money; break;
      case 4: this.teams_money.team4 = this.money; break;
    }
    localStorage.setItem('money', JSON.stringify(this.teams_money));
  }

  purchase(purchase) {
    console.log(this.purchases);
    switch (purchase) {
      case "hotel": this.purchases.hotel.purchased = true; 
                          this.purchases.hotel.rooms = AppSettings.DEFAULT_ROOMS_NUM; break;
      case "hospital": this.purchases.hospital.purchased = true;
                         this.purchases.hospital.beds = AppSettings.DEFAULT_BEDS_NUM; break;
      case "restaurant": this.purchases.restaurant.purchased = true;
                         this.purchases.restaurant.tables = AppSettings.DEFAULT_TABLES_NUM; break;
      case "cars_shop": this.purchases.cars_shop.purchased = true;
                         this.purchases.cars_shop.cars = AppSettings.DEFAULT_CARS_NUM; break;
    }

    switch (this.team) {
      case 1: this.teams_purchases.team1 = this.purchases; break;
      case 2: this.teams_purchases.team2 = this.purchases; break;
      case 3: this.teams_purchases.team3 = this.purchases; break;
      case 4: this.teams_purchases.team4 = this.purchases; break;
    }
    localStorage.setItem('purchases', JSON.stringify(this.teams_purchases));
  }

  current_profit(){
    var sum = 0;
    sum+= this.purchases.hospital.beds * AppSettings.bed_per_hour;
    sum+= this.purchases.hotel.rooms * AppSettings.room_per_hour;
    sum+= this.purchases.cars_shop.cars * AppSettings.car_per_hour;
    sum+= this.purchases.restaurant.tables * AppSettings.table_per_hour;
    return sum;
  }

}
