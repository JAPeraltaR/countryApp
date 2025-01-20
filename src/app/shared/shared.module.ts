import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AboutPageComponent } from './pages/aboutPage/aboutPage.component';
import { ContactPageComponent } from './pages/contactPage/contactPage.component';
import { HomePageComponent } from './pages/homePage/homePage.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchBoxComponent } from './components/searchBox/searchBox.component';


@NgModule({
  declarations: [
    AboutPageComponent,
    ContactPageComponent,
    HomePageComponent,
    SidebarComponent,
    SearchBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AboutPageComponent,
    ContactPageComponent,
    HomePageComponent,
    SidebarComponent,
    SearchBoxComponent
  ]
})
export class SharedModule { }
