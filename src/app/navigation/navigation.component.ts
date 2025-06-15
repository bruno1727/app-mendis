import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TitleComponent } from '../title/title.component';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatTabsModule, RouterModule, TitleComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {

  activeLink = '';

  constructor(private router: Router) {}

  navLinks = [
    { label: 'Minha viagem', link: '/planning' },
    { label: 'Sugestões', link: '/suggestions' }
  ];

  ngOnInit() {
    
    
    const currentUrl = this.router.url;
    var encontrado = false;

    this.navLinks.forEach(link => {
      if (currentUrl.includes(link.link)) {
        this.activeLink = link.link;
        encontrado = true;
        return;
      }
    });

    if (!encontrado) {
      this.activeLink = '/suggestions';
    }
  }

  onTabClick(link: string) {
    this.activeLink = link;
    this.router.navigate([link]);
  }
}
