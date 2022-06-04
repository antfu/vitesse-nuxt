import type * as Types from './types.d';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PersonQueryVariables = Types.Exact<{
  personInput: Types.PersonInput;
}>;


export type PersonQuery = { __typename?: 'Query', person: { __typename?: 'Person', name: string, tags?: Array<string | null> | null } };


export const PersonDocument = gql`
    query Person($personInput: PersonInput!) {
  person(personInput: $personInput) {
    name
    tags
  }
}
    `;

export function usePersonQuery(options: Omit<Urql.UseQueryArgs<never, PersonQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PersonQuery>({ query: PersonDocument, ...options });
};