export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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
  person: Person;
};


export type QueryPersonArgs = {
  personInput: PersonInput;
};
