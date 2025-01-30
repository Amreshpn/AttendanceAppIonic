import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },

  {
    path: 'userprofile',
    loadChildren: () => import('./pages/userprofile/userprofile.module').then(m => m.UserprofilePageModule)
  },

  {
    path: 'map',
    loadChildren: () => import('./patient/map/map.module').then(m => m.MapPageModule)
  },

  {
    path: 'attendance',
    loadChildren: () => import('./pages/attendance/attendance.module').then(m => m.AttendancePageModule)
  },

  {
    path: 'forgetpassword',
    loadChildren: () => import('./pages/forgetpassword/forgetpassword.module').then(m => m.ForgetpasswordPageModule)
  },

  {
    path: 'mapforattendanc',
    loadChildren: () => import('./patient/mapforattendanc/mapforattendanc.module').then(m => m.MapforattendancPageModule)
  },

  {
    path: 'emplyelandingtab',
    loadChildren: () => import('./employeepages/emplyelandingtab/emplyelandingtab.module').then(m => m.EmplyelandingtabPageModule)
  },
  {
    path: 'holydaycalender',
    loadChildren: () => import('./employeepages/holydaycalender/holydaycalender.module').then(m => m.HolydaycalenderPageModule)
  },
  {
    path: 'leavepage',
    loadChildren: () => import('./employeepages/leavepage/leavepage.module').then(m => m.LeavepagePageModule)
  },
  {
    path: 'attendancepageemp',
    loadChildren: () => import('./employeepages/attendancepageemp/attendancepageemp.module').then(m => m.AttendancepageempPageModule)
  },
  {
    path: 'leavedashboardpage',
    loadChildren: () => import('./employeepages/leavedashboardpage/leavedashboardpage.module').then(m => m.LeavedashboardpagePageModule)
  },
  {
    path: 'attendanceregularizatio',
    loadChildren: () => import('./employeepages/attendanceregularizatio/attendanceregularizatio.module').then(m => m.AttendanceregularizatioPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
