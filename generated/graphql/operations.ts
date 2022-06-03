import { DocumentNode } from 'graphql';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from '@vue/composition-api';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _Any: any;
};

export type Continent = {
  __typename?: 'Continent';
  code: Scalars['ID'];
  countries: Array<Country>;
  name: Scalars['String'];
};

export type ContinentFilterInput = {
  code?: InputMaybe<StringQueryOperatorInput>;
};

export type Country = {
  __typename?: 'Country';
  capital?: Maybe<Scalars['String']>;
  code: Scalars['ID'];
  continent: Continent;
  currency?: Maybe<Scalars['String']>;
  emoji: Scalars['String'];
  emojiU: Scalars['String'];
  languages: Array<Language>;
  name: Scalars['String'];
  native: Scalars['String'];
  phone: Scalars['String'];
  states: Array<State>;
};

export type CountryFilterInput = {
  code?: InputMaybe<StringQueryOperatorInput>;
  continent?: InputMaybe<StringQueryOperatorInput>;
  currency?: InputMaybe<StringQueryOperatorInput>;
};

export type Language = {
  __typename?: 'Language';
  code: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  native?: Maybe<Scalars['String']>;
  rtl: Scalars['Boolean'];
};

export type LanguageFilterInput = {
  code?: InputMaybe<StringQueryOperatorInput>;
};

export type Person = {
  __typename?: 'Person';
  name: Scalars['String'];
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type PersonInput = {
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _entities: Array<Maybe<_Entity>>;
  _service: _Service;
  continent?: Maybe<Continent>;
  continents: Array<Continent>;
  countries: Array<Country>;
  country?: Maybe<Country>;
  language?: Maybe<Language>;
  languages: Array<Language>;
  person: Person;
};


export type Query_EntitiesArgs = {
  representations: Array<Scalars['_Any']>;
};


export type QueryContinentArgs = {
  code: Scalars['ID'];
};


export type QueryContinentsArgs = {
  filter?: InputMaybe<ContinentFilterInput>;
};


export type QueryCountriesArgs = {
  filter?: InputMaybe<CountryFilterInput>;
};


export type QueryCountryArgs = {
  code: Scalars['ID'];
};


export type QueryLanguageArgs = {
  code: Scalars['ID'];
};


export type QueryLanguagesArgs = {
  filter?: InputMaybe<LanguageFilterInput>;
};


export type QueryPersonArgs = {
  personInput: PersonInput;
};

export type State = {
  __typename?: 'State';
  code?: Maybe<Scalars['String']>;
  country: Country;
  name: Scalars['String'];
};

export type StringQueryOperatorInput = {
  eq?: InputMaybe<Scalars['String']>;
  glob?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ne?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  regex?: InputMaybe<Scalars['String']>;
};

export type _Entity = Continent | Country | Language;

export type _Service = {
  __typename?: '_Service';
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied */
  sdl?: Maybe<Scalars['String']>;
};

export type CountryQueryVariables = Exact<{ [key: string]: never; }>;


export type CountryQuery = { __typename?: 'Query', country?: { __typename?: 'Country', name: string, code: string } | null };

export type PersonQueryVariables = Exact<{
  personInput: PersonInput;
}>;


export type PersonQuery = { __typename?: 'Query', person: { __typename?: 'Person', name: string, tags?: Array<string | null> | null } };


export const CountryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"StringValue","value":"CN","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __useCountryQuery__
 *
 * To run a query within a Vue component, call `useCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountryQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCountryQuery();
 */
export function useCountryQuery(options: VueApolloComposable.UseQueryOptions<CountryQuery, CountryQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CountryQuery, CountryQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CountryQuery, CountryQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CountryQuery, CountryQueryVariables>(CountryDocument, {}, options);
}
export function useCountryLazyQuery(options: VueApolloComposable.UseQueryOptions<CountryQuery, CountryQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CountryQuery, CountryQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CountryQuery, CountryQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CountryQuery, CountryQueryVariables>(CountryDocument, {}, options);
}
export type CountryQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CountryQuery, CountryQueryVariables>;
export const PersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Person"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"personInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PersonInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"personInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"personInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]} as unknown as DocumentNode;

/**
 * __usePersonQuery__
 *
 * To run a query within a Vue component, call `usePersonQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = usePersonQuery({
 *   personInput: // value for 'personInput'
 * });
 */
export function usePersonQuery(variables: PersonQueryVariables | VueCompositionApi.Ref<PersonQueryVariables> | ReactiveFunction<PersonQueryVariables>, options: VueApolloComposable.UseQueryOptions<PersonQuery, PersonQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PersonQuery, PersonQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PersonQuery, PersonQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<PersonQuery, PersonQueryVariables>(PersonDocument, variables, options);
}
export function usePersonLazyQuery(variables: PersonQueryVariables | VueCompositionApi.Ref<PersonQueryVariables> | ReactiveFunction<PersonQueryVariables>, options: VueApolloComposable.UseQueryOptions<PersonQuery, PersonQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PersonQuery, PersonQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PersonQuery, PersonQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<PersonQuery, PersonQueryVariables>(PersonDocument, variables, options);
}
export type PersonQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<PersonQuery, PersonQueryVariables>;