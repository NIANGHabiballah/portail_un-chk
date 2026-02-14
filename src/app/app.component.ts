import { Component, Renderer2, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { MenuComponent } from "./components/menu/menu.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, MenuComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'portail_un-chk';
  showMenu = true;

  constructor(
    private router: Router, 
    private renderer: Renderer2,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.updateMenuState(this.router.url || '/');
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateMenuState(event.url);
      }
    });

    this.notificationService.requestPermission();
    this.notificationService.startPolling();
  }

  private updateMenuState(url: string) {
    this.showMenu = !url.includes('/login') && !url.includes('/register') && url !== '/';
    
    if (!this.showMenu) {
      this.renderer.addClass(document.body, 'no-menu');
    } else {
      this.renderer.removeClass(document.body, 'no-menu');
    }
  }
}
