import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'read/:idCerbung',
    loadChildren: () => import('./read/read.module').then(m => m.ReadPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then(m => m.CreatePageModule)
  },
  {
    path: 'following',
    loadChildren: () => import('./following/following.module').then(m => m.FollowingPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule)
  },
  {
    path: 'preferences',
    loadChildren: () => import('./preferences/preferences.module').then(m => m.PreferencesPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule)
  },
  {
    path: 'respond',
    loadChildren: () => import('./respond/respond.module').then(m => m.RespondPageModule)
  },
  {
    path: 'create2',
    loadChildren: () => import('./create2/create2.module').then(m => m.Create2PageModule)
  },
  {
    path: 'selected-user/:userId',
    loadChildren: () => import('./selected-user/selected-user.module').then( m => m.SelectedUserPageModule)
  },
  {
    path: 'create3',
    loadChildren: () => import('./create3/create3.module').then(m => m.Create3PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
