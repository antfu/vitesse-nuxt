import * as pulumi from '@pulumi/pulumi'
// import * as kx from '@pulumi/kubernetesx'

export const config = new pulumi.Config()
export const namespace = 'nuxt-starter-demo'

export interface ApiConfig {
  restHost?: string
  wsHost?: string
}

export const api = config.getObject<ApiConfig>('api')
