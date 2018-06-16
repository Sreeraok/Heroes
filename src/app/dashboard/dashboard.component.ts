import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
	heroes: Hero[];
 
  constructor(
	  private heroService: HeroService) { }

  ngOnInit() {
	this.getHeroes();
  }

  getHeroes() {
     return this.heroService.getHeroes()
		.subscribe(
			res => {this.heroes = res as Hero[]}
		);
	}
}
