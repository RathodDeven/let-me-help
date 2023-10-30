import type { CodegenConfig } from '@graphql-codegen/cli'
import { GRAPHQL_API } from './src/utils/config'

const config: CodegenConfig = {
  overwrite: true,
  schema: GRAPHQL_API,
  documents: './graphql/*.graphql',
  generates: {
    'generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        'fragment-matcher'
      ]
    }
  },
  hooks: {
    afterAllFileWrite: [
      'prettier --write'
    ]
  }
}

export default config
