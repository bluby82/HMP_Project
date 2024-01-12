import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedUserPage } from './selected-user.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedUserPageRoutingModule {}
