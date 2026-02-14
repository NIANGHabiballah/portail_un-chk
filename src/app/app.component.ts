import { Component, Renderer2, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { MenuComponent } from "./components/menu/menu.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, MenuComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'portail_un-chk';
  showMenu = true;

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit() {
    // Appliquer no-menu immédiatement au chargement
    this.updateMenuState(this.router.url || '/');
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateMenuState(event.url);
      }
    });
  }

  private updateMenuState(url: string) {
    // Cacher le menu sur les pages de connexion et inscription
    this.showMenu = !url.includes('/login') && !url.includes('/register') && url !== '/';
    
    // Ajouter/retirer la classe no-menu sur le body
    if (!this.showMenu) {
      this.renderer.addClass(document.body, 'no-menu');
    } else {
      this.renderer.removeClass(document.body, 'no-menu');
    }
  }
}
