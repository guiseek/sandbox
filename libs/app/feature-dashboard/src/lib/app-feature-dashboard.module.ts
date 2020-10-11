import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AppDataAccessCoreModule } from '@sandbox/app/data-access-core'
import { AppFeatureDashboardComponent } from './app-feature-dashboard.component'

@NgModule({
  declarations: [AppFeatureDashboardComponent],
  imports: [
    CommonModule,
    AppDataAccessCoreModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: AppFeatureDashboardComponent }]),
  ],
})
export class AppFeatureDashboardModule {}
