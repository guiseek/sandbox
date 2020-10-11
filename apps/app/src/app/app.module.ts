import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AppFeatureCoreModule } from '@sandbox/app/feature-core'
import { AppFeatureShellModule } from '@sandbox/app/feature-shell'

import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule, AppFeatureCoreModule, AppFeatureShellModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
