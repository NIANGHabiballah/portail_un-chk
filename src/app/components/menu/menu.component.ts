import { Component, AfterViewInit, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-menu',
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements AfterViewInit, OnInit {
  userRole: string = 'etudiant';
  
  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.userRole = userData.role || 'etudiant';
    }
  }
  ngAfterViewInit() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');
    const closeBtn = document.querySelector('#closeMenu');
    
    const closeMenu = () => {
      navbarCollapse?.classList.remove('show');
      document.body.classList.remove('menu-open');
    };
    
    if (navbarToggler && navbarCollapse) {
      navbarToggler.addEventListener('click', () => {
        const isOpen = navbarCollapse.classList.toggle('show');
        if (isOpen) {
          document.body.classList.add('menu-open');
        } else {
          document.body.classList.remove('menu-open');
        }
      });
      
      closeBtn?.addEventListener('click', closeMenu);
      
      document.body.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        if (document.body.classList.contains('menu-open') && 
            !navbarCollapse.contains(target) && 
            !navbarToggler.contains(target)) {
          closeMenu();
        }
      });
    }
  }
}
