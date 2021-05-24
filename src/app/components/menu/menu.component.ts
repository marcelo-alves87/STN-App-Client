import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements AfterViewInit {

  static events1 : Events;

  constructor(private elementRef:ElementRef, public events : Events) { 
    MenuComponent.events1 = events;
  }
 
  ngAfterViewInit(): void {
    
    this.elementRef.nativeElement.children[0].children[1].children[0].children[1].addEventListener('click', function () {
      MenuComponent.events1.publish('about');
    });  
  }

     
}