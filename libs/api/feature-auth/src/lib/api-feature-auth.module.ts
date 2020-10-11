import { Module } from '@nestjs/common'
import { ApiDataAccessAuthModule } from '@sandbox/api/data-access-auth'
import { ApiFeatureAuthResolver } from './api-feature-auth.resolver'

@Module({
  imports: [ApiDataAccessAuthModule],
  providers: [ApiFeatureAuthResolver],
})
export class ApiFeatureAuthModule {}
