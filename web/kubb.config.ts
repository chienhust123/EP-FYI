import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/swagger-ts';
import { pluginClient } from '@kubb/swagger-client'

const plugins = [
  pluginOas(
    {
      output: false,
      validate: true,
    },
  ),
  pluginTs(
    {
      output: {
        path: 'models',
      },
    },
  ),
  pluginClient({
    output: {
      path: './http',
    },

    client: {
      importPath: '../../api-client'
    }
  })
]

export default defineConfig(() => {
  return [
    {
      root: '.',
      input: {
        path: '../account_core/api/account_core/account_core.swagger.json',
      },
      output: {
        path: './services/account',

      },
      plugins: plugins
    },
    {
      root: '.',
      input: {
        path: '../offer_service/api/offer_service/v1/api.swagger.json',
      },
      output: {
        path: './services/offer',
      },
      plugins: plugins
    }]
})