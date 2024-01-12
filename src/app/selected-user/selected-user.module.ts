import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedUserPageRoutingModule } from './selected-user-routing.module';

import { SelectedUserPage } from './selected-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectedUserPageRoutingModule
  ],
  declarations: [SelectedUserPage]
})
export class SelectedUserPageModule {}
