import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AppDataAccessCoreModule } from '@sandbox/app/data-access-core'
import { AppFeatureAboutComponent } from './app-feature-about.component'

@NgModule({
  declarations: [AppFeatureAboutComponent],
  imports: [
    CommonModule,
    AppDataAccessCoreModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: AppFeatureAboutComponent }]),
  ],
})
export class AppFeatureAboutModule {}
