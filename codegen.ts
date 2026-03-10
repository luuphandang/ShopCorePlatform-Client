import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3670/graphql',
  documents: ['src/**/*.{tsx,ts,graphql,gql}'],
  generates: {
    './src/graphql/@types/graphql.type.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        strictScalars: true,
        scalars: {
          DateTime: 'string',
          JSON: 'string',
        },
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
