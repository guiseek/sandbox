import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { AppLayoutComponent } from './app-layout.component'
import { LayoutFooterModule } from './components/layout-footer/layout-footer.module'
import { LayoutHeaderModule } from './components/layout-header/layout-header.module'

@NgModule({
  declarations: [AppLayoutComponent],
  imports: [CommonModule, RouterModule, LayoutHeaderModule, LayoutFooterModule],
})
export class AppLayoutModule {}
