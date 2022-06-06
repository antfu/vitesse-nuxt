import type * as Types from '../../types.d';

import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import * as Operations from '';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PersonQueryVariables = Types.Exact<{
  personInput: Types.PersonInput;
}>;


export type PersonQuery = { __typename?: 'Query', person: { __typename?: 'Person', name: string, tags?: Array<string | null> | null } };


export const PersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"person"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"personInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PersonInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"personInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"personInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]} as unknown as DocumentNode<PersonQuery, PersonQueryVariables>;


export function usePersonQuery(options: Omit<Urql.UseQueryArgs<never, PersonQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PersonQuery>({ query: PersonDocument, ...options });
};