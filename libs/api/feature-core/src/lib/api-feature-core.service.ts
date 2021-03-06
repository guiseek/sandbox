import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'

@Injectable()
export class ApiFeatureCoreService {
  constructor(public readonly config: ConfigService) {}

  uptime(): number {
    return process.uptime()
  }

  get apiUrl(): string {
    return this.config.get('apiUrl')
  }
}
