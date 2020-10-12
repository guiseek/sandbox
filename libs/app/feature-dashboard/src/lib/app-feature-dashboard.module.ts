import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AppUiFormModule } from '@sandbox/app-ui-form'
// import { AppDataAccessCoreModule } from '@sandbox/app/data-access-core'
import { AppFeatureDashboardComponent } from './app-feature-dashboard.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [AppFeatureDashboardComponent],
  imports: [
    CommonModule,
    AppUiFormModule,
    ReactiveFormsModule,
    // AppDataAccessCoreModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: AppFeatureDashboardComponent }]),
  ],
})
export class AppFeatureDashboardModule {}
