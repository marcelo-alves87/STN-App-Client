import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ChartModule } from 'angular2-chartjs';
import { NaPage } from './na.page';

const routes: Routes = [
  {
    path: '',
    component: NaPage
  }
];

@NgModule({
  imports: [
    ChartModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NaPage]
})
export class NaPageModule {}
