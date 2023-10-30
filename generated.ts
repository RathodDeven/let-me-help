import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AnySort = {
  field: Scalars['String']['input'];
  order?: InputMaybe<Order>;
};

export type AuthPayLoad = {
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addVolunteerToTask?: Maybe<VolunteerTask>;
  createUser?: Maybe<User>;
  createVolunteerTask?: Maybe<VolunteerTask>;
};


export type MutationAddVolunteerToTaskArgs = {
  AuthPayLoad?: InputMaybe<AuthPayLoad>;
  volunteerTaskId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreateUserArgs = {
  AuthPayLoad?: InputMaybe<AuthPayLoad>;
  email?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateVolunteerTaskArgs = {
  AuthPayLoad?: InputMaybe<AuthPayLoad>;
  VolunteerTaskPayLoad?: InputMaybe<VolunteerTaskPayLoad>;
};

export enum Order {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Query = {
  __typename?: 'Query';
  users?: Maybe<Array<Maybe<User>>>;
  volunteerTask?: Maybe<VolunteerTask>;
  volunteerTasks?: Maybe<Array<Maybe<VolunteerTask>>>;
};


export type QueryVolunteerTaskArgs = {
  where?: InputMaybe<VolunteerTaskWhere>;
};


export type QueryVolunteerTasksArgs = {
  sort?: InputMaybe<AnySort>;
  where?: InputMaybe<VolunteerTaskWhere>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type VolunteerTask = {
  __typename?: 'VolunteerTask';
  createdAt?: Maybe<Scalars['String']['output']>;
  dateTime?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  images?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<User>;
  volunteers?: Maybe<Array<Maybe<User>>>;
};

export type VolunteerTaskPayLoad = {
  dateTime?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type VolunteerTaskWhere = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  attendingUserId?: InputMaybe<Scalars['ID']['input']>;
  owner?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateUserMutationVariables = Exact<{
  authPayLoad?: InputMaybe<AuthPayLoad>;
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id?: string | null, username?: string | null, email?: string | null, createdAt?: string | null } | null };

export type CreateVolunteerTaskMutationVariables = Exact<{
  authPayLoad?: InputMaybe<AuthPayLoad>;
  volunteerTaskPayLoad?: InputMaybe<VolunteerTaskPayLoad>;
}>;


export type CreateVolunteerTaskMutation = { __typename?: 'Mutation', createVolunteerTask?: { __typename?: 'VolunteerTask', id?: string | null, name?: string | null, description?: string | null, location?: string | null, dateTime?: string | null, duration?: string | null, images?: Array<string | null> | null, createdAt?: string | null, volunteers?: Array<{ __typename?: 'User', id?: string | null, username?: string | null, email?: string | null, createdAt?: string | null } | null> | null, owner?: { __typename?: 'User', id?: string | null, username?: string | null, email?: string | null, createdAt?: string | null } | null } | null };

export type VolunteerTaskQueryVariables = Exact<{
  where?: InputMaybe<VolunteerTaskWhere>;
}>;


export type VolunteerTaskQuery = { __typename?: 'Query', volunteerTask?: { __typename?: 'VolunteerTask', id?: string | null, name?: string | null, description?: string | null, location?: string | null, dateTime?: string | null, duration?: string | null, images?: Array<string | null> | null, createdAt?: string | null, volunteers?: Array<{ __typename?: 'User', id?: string | null, username?: string | null, email?: string | null, createdAt?: string | null } | null> | null, owner?: { __typename?: 'User', id?: string | null, username?: string | null, email?: string | null, createdAt?: string | null } | null } | null };

export type VolunteerTasksQueryVariables = Exact<{
  where?: InputMaybe<VolunteerTaskWhere>;
  sort?: InputMaybe<AnySort>;
}>;


export type VolunteerTasksQuery = { __typename?: 'Query', volunteerTasks?: Array<{ __typename?: 'VolunteerTask', id?: string | null, name?: string | null, description?: string | null, location?: string | null, dateTime?: string | null, duration?: string | null, images?: Array<string | null> | null, createdAt?: string | null, volunteers?: Array<{ __typename?: 'User', id?: string | null, username?: string | null, email?: string | null, createdAt?: string | null } | null> | null, owner?: { __typename?: 'User', id?: string | null, username?: string | null, email?: string | null, createdAt?: string | null } | null } | null> | null };

export type AddVolunteerToTaskMutationVariables = Exact<{
  authPayLoad?: InputMaybe<AuthPayLoad>;
  volunteerTaskId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type AddVolunteerToTaskMutation = { __typename?: 'Mutation', addVolunteerToTask?: { __typename?: 'VolunteerTask', id?: string | null, name?: string | null, description?: string | null, location?: string | null, dateTime?: string | null, duration?: string | null, images?: Array<string | null> | null, createdAt?: string | null, volunteers?: Array<{ __typename?: 'User', id?: string | null, username?: string | null, email?: string | null, createdAt?: string | null } | null> | null, owner?: { __typename?: 'User', id?: string | null, username?: string | null, email?: string | null, createdAt?: string | null } | null } | null };


export const CreateUserDocument = gql`
    mutation CreateUser($authPayLoad: AuthPayLoad, $email: String) {
  createUser(AuthPayLoad: $authPayLoad, email: $email) {
    id
    username
    email
    createdAt
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      authPayLoad: // value for 'authPayLoad'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const CreateVolunteerTaskDocument = gql`
    mutation CreateVolunteerTask($authPayLoad: AuthPayLoad, $volunteerTaskPayLoad: VolunteerTaskPayLoad) {
  createVolunteerTask(
    AuthPayLoad: $authPayLoad
    VolunteerTaskPayLoad: $volunteerTaskPayLoad
  ) {
    id
    name
    description
    location
    dateTime
    duration
    images
    volunteers {
      id
      username
      email
      createdAt
    }
    owner {
      id
      username
      email
      createdAt
    }
    createdAt
  }
}
    `;
export type CreateVolunteerTaskMutationFn = Apollo.MutationFunction<CreateVolunteerTaskMutation, CreateVolunteerTaskMutationVariables>;

/**
 * __useCreateVolunteerTaskMutation__
 *
 * To run a mutation, you first call `useCreateVolunteerTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVolunteerTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVolunteerTaskMutation, { data, loading, error }] = useCreateVolunteerTaskMutation({
 *   variables: {
 *      authPayLoad: // value for 'authPayLoad'
 *      volunteerTaskPayLoad: // value for 'volunteerTaskPayLoad'
 *   },
 * });
 */
export function useCreateVolunteerTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateVolunteerTaskMutation, CreateVolunteerTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVolunteerTaskMutation, CreateVolunteerTaskMutationVariables>(CreateVolunteerTaskDocument, options);
      }
export type CreateVolunteerTaskMutationHookResult = ReturnType<typeof useCreateVolunteerTaskMutation>;
export type CreateVolunteerTaskMutationResult = Apollo.MutationResult<CreateVolunteerTaskMutation>;
export type CreateVolunteerTaskMutationOptions = Apollo.BaseMutationOptions<CreateVolunteerTaskMutation, CreateVolunteerTaskMutationVariables>;
export const VolunteerTaskDocument = gql`
    query VolunteerTask($where: VolunteerTaskWhere) {
  volunteerTask(where: $where) {
    id
    name
    description
    location
    dateTime
    duration
    images
    volunteers {
      id
      username
      email
      createdAt
    }
    owner {
      id
      username
      email
      createdAt
    }
    createdAt
  }
}
    `;

/**
 * __useVolunteerTaskQuery__
 *
 * To run a query within a React component, call `useVolunteerTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useVolunteerTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVolunteerTaskQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useVolunteerTaskQuery(baseOptions?: Apollo.QueryHookOptions<VolunteerTaskQuery, VolunteerTaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VolunteerTaskQuery, VolunteerTaskQueryVariables>(VolunteerTaskDocument, options);
      }
export function useVolunteerTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VolunteerTaskQuery, VolunteerTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VolunteerTaskQuery, VolunteerTaskQueryVariables>(VolunteerTaskDocument, options);
        }
export function useVolunteerTaskSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VolunteerTaskQuery, VolunteerTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VolunteerTaskQuery, VolunteerTaskQueryVariables>(VolunteerTaskDocument, options);
        }
export type VolunteerTaskQueryHookResult = ReturnType<typeof useVolunteerTaskQuery>;
export type VolunteerTaskLazyQueryHookResult = ReturnType<typeof useVolunteerTaskLazyQuery>;
export type VolunteerTaskSuspenseQueryHookResult = ReturnType<typeof useVolunteerTaskSuspenseQuery>;
export type VolunteerTaskQueryResult = Apollo.QueryResult<VolunteerTaskQuery, VolunteerTaskQueryVariables>;
export const VolunteerTasksDocument = gql`
    query VolunteerTasks($where: VolunteerTaskWhere, $sort: AnySort) {
  volunteerTasks(where: $where, sort: $sort) {
    id
    name
    description
    location
    dateTime
    duration
    images
    volunteers {
      id
      username
      email
      createdAt
    }
    owner {
      id
      username
      email
      createdAt
    }
    createdAt
  }
}
    `;

/**
 * __useVolunteerTasksQuery__
 *
 * To run a query within a React component, call `useVolunteerTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useVolunteerTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVolunteerTasksQuery({
 *   variables: {
 *      where: // value for 'where'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useVolunteerTasksQuery(baseOptions?: Apollo.QueryHookOptions<VolunteerTasksQuery, VolunteerTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VolunteerTasksQuery, VolunteerTasksQueryVariables>(VolunteerTasksDocument, options);
      }
export function useVolunteerTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VolunteerTasksQuery, VolunteerTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VolunteerTasksQuery, VolunteerTasksQueryVariables>(VolunteerTasksDocument, options);
        }
export function useVolunteerTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VolunteerTasksQuery, VolunteerTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VolunteerTasksQuery, VolunteerTasksQueryVariables>(VolunteerTasksDocument, options);
        }
export type VolunteerTasksQueryHookResult = ReturnType<typeof useVolunteerTasksQuery>;
export type VolunteerTasksLazyQueryHookResult = ReturnType<typeof useVolunteerTasksLazyQuery>;
export type VolunteerTasksSuspenseQueryHookResult = ReturnType<typeof useVolunteerTasksSuspenseQuery>;
export type VolunteerTasksQueryResult = Apollo.QueryResult<VolunteerTasksQuery, VolunteerTasksQueryVariables>;
export const AddVolunteerToTaskDocument = gql`
    mutation AddVolunteerToTask($authPayLoad: AuthPayLoad, $volunteerTaskId: ID) {
  addVolunteerToTask(AuthPayLoad: $authPayLoad, volunteerTaskId: $volunteerTaskId) {
    id
    name
    description
    location
    dateTime
    duration
    images
    volunteers {
      id
      username
      email
      createdAt
    }
    owner {
      id
      username
      email
      createdAt
    }
    createdAt
  }
}
    `;
export type AddVolunteerToTaskMutationFn = Apollo.MutationFunction<AddVolunteerToTaskMutation, AddVolunteerToTaskMutationVariables>;

/**
 * __useAddVolunteerToTaskMutation__
 *
 * To run a mutation, you first call `useAddVolunteerToTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddVolunteerToTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addVolunteerToTaskMutation, { data, loading, error }] = useAddVolunteerToTaskMutation({
 *   variables: {
 *      authPayLoad: // value for 'authPayLoad'
 *      volunteerTaskId: // value for 'volunteerTaskId'
 *   },
 * });
 */
export function useAddVolunteerToTaskMutation(baseOptions?: Apollo.MutationHookOptions<AddVolunteerToTaskMutation, AddVolunteerToTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddVolunteerToTaskMutation, AddVolunteerToTaskMutationVariables>(AddVolunteerToTaskDocument, options);
      }
export type AddVolunteerToTaskMutationHookResult = ReturnType<typeof useAddVolunteerToTaskMutation>;
export type AddVolunteerToTaskMutationResult = Apollo.MutationResult<AddVolunteerToTaskMutation>;
export type AddVolunteerToTaskMutationOptions = Apollo.BaseMutationOptions<AddVolunteerToTaskMutation, AddVolunteerToTaskMutationVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    