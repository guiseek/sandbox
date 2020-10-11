import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { AppFeatureCoreGraphQLModule } from './app-feature-core-graphql.module'

@NgModule({
  imports: [HttpClientModule, AppFeatureCoreGraphQLModule],
})
export class AppFeatureCoreModule {}
