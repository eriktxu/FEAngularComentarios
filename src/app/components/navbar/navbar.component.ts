import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  img = 'https://angular.io/assets/images/logos/angular/angular.png'

  constructor() { }

  ngOnInit(): void {
  }

}
