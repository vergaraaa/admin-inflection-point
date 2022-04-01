import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogged = true;
  currentRoute : String = '';

  constructor(private router: Router ) {
    console.log(router.url);

    router.events.subscribe(Event => {
        if(Event instanceof NavigationEnd){
            this.currentRoute = Event.url;
        }
    });
  }
}
