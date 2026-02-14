import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-formations',
  imports: [],
  templateUrl: './formations.component.html',
  styleUrl: './formations.component.css'
})
export class FormationsComponent implements AfterViewInit {
  
  ngAfterViewInit(): void {
    const tabButtons = document.querySelectorAll('#formationTabs button');
    tabButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const target = (button as HTMLElement).getAttribute('data-bs-target');
        if (target) {
          document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('show', 'active');
          });
          document.querySelectorAll('#formationTabs button').forEach(btn => {
            btn.classList.remove('active');
          });
          button.classList.add('active');
          const targetPane = document.querySelector(target);
          if (targetPane) {
            targetPane.classList.add('show', 'active');
          }
        }
      });
    });
  }
}
