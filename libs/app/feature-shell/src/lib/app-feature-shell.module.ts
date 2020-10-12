import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppLayoutComponent } from '@sandbox/app/layout'

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      // Application routes here
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'about',
        loadChildren: () => import('@sandbox/app/feature-about').then((m) => m.AppFeatureAboutModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('@sandbox/app/feature-dashboard').then((m) => m.AppFeatureDashboardModule),
      },
    ],
  },
]

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppFeatureShellModule {}
