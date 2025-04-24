import { Component } from '@angular/core';

@Component({
  selector: 'app-formations',
  imports: [],
  templateUrl: './formations.component.html',
  styleUrl: './formations.component.css'
})
export class FormationsComponent {
  
ngOnInit(): void {
  document.addEventListener('DOMContentLoaded', () => {
    // Ensure Bootstrap tabs are initialized
    const tabTriggerList = Array.from(document.querySelectorAll<HTMLButtonElement>('#formationTabs button'));
    tabTriggerList.forEach((tabTriggerEl) => {
      // @ts-ignore: Assuming bootstrap is globally available
      const tabTrigger = new (window as any).bootstrap.Tab(tabTriggerEl);
      tabTriggerEl.addEventListener('click', (event: Event) => {
        event.preventDefault();
        tabTrigger.show();
      });
    });
  });
}
}
