import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmplyelandingtabPage } from './emplyelandingtab.page';

const routes: Routes = [
  {
    path: '',
    component: EmplyelandingtabPage,
    children: [
      {
        path: 'leave',
        loadChildren: () => import('../leavedashboardpage/leavedashboardpage.module').then(m => m.LeavedashboardpagePageModule)
      },
      {
        path: 'attendance',
        loadChildren: () => import('../attendancepageemp/attendancepageemp.module').then(m => m.AttendancepageempPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'holiday',
        loadChildren: () => import('../holydaycalender/holydaycalender.module').then(m => m.HolydaycalenderPageModule)
      },
      {
        path: 'myprofile',
        loadChildren: () => import('../../pages/userprofile/userprofile.module').then(m => m.UserprofilePageModule)
      },
      {
        path: '',
        redirectTo: 'attendance',
        pathMatch: 'full'
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmplyelandingtabPageRoutingModule { }
