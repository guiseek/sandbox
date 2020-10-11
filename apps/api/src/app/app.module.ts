import { ApiFeatureAuthModule } from '@sandbox/api/feature-auth'
import { ApiFeatureCoreModule } from '@sandbox/api/feature-core'
import { Module } from '@nestjs/common'

@Module({
  imports: [ApiFeatureAuthModule, ApiFeatureCoreModule],
})
export class AppModule {}
