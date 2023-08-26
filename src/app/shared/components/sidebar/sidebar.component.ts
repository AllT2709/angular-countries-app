import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public sidebarRoutes = [
    // {
    //   path: '/',
    //   title: 'Home Page'
    // },
    // {
    //   path: '/about',
    //   title: 'About Page'
    // },
    // {
    //   path: '/contact',
    //   title: 'Contact Page'
    // },
    {
      path: 'countries/by-capital',
      title: 'By Capital'
    },
    {
      path: 'countries/by-country',
      title: 'By Country'
    },
    {
      path: 'countries/by-region',
      title: 'By Region'
    },
    
  ]

}
