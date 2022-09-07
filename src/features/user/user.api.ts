import { AUTH_CLIENT_ID } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { camelizeKeys } from 'humps';
import { getApolloClient } from '../../clients/apollo';
import { authAxios } from '../../clients/axios';
import {
  MeDocument,
  MeQuery,
  MeQueryVariables,
  UpsertDeviceDocument,
  UpsertDeviceMutation,
  UpsertDeviceMutationVariables,
} from '../../generated/graphql';
import { OAuthCredentials } from '../auth';
import { getCredentialsFromHeaders } from '../auth/context/AuthContext.helpers';
import { User } from './types';

/***** Send otp *****/

export interface SendOtpParams {
  phoneNumber: string;
  via: string;
  validationHash?: string;
}

export type SendOtpApi = (params: SendOtpParams) => Promise<void>;

export const sendOtpApi: SendOtpApi = async (otp) => {
  await authAxios.post('/api/auth/send_otp', { otp });
};

/***** Sign up by email *****/

interface SignUpByEmailResponse
  extends Omit<User, 'phoneNumber' | 'currentPasswordRequired' | 'createdAt' | 'updatedAt'> {
  phone_number: string;
  current_password_required: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserSignUpByEmail {
  email: string;
  name: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

type SignUpByEmailApi = (user: UserSignUpByEmail) => Promise<{
  user: User;
  credentials: OAuthCredentials;
}>;

export const signUpByEmailApi: SignUpByEmailApi = async (user) => {
  const result = await authAxios.post<
    UserSignUpByEmail,
    { data: SignUpByEmailResponse; headers: any }
  >(
    '/users.json',
    { user },
    {
      headers: {
        'Client-Id': AUTH_CLIENT_ID,
      },
    }
  );

  return {
    user: camelizeKeys<User>(result.data),
    credentials: getCredentialsFromHeaders(result.headers),
  };
};

/***** Sign in by email *****/

export interface SignInByEmailApiParams {
  email: string;
  password: string;
}

export type SignInByEmailApi = (params: SignInByEmailApiParams) => Promise<OAuthCredentials>;

export const signInByEmailApi: SignInByEmailApi = async ({ email, password }) => {
  const result = await authAxios.post<OAuthCredentials, { data: OAuthCredentials }>(
    '/oauth/token',
    {
      grantType: 'password',
      clientId: AUTH_CLIENT_ID,
      email,
      password,
    }
  );

  return result.data;
};

/***** Forgot password *****/

interface ForgotPasswordData {
  user?: UserForgotPassword;
}

export interface UserForgotPassword {
  email: string;
}

export type ForgotPasswordApi = (user: UserForgotPassword) => Promise<void>;

export const forgotPasswordApi: ForgotPasswordApi = async (user) => {
  await authAxios.post<ForgotPasswordData>('/users/password.json', { user });
};

/***** Sign up by phone number *****/

export interface UserSignUpByPhoneNumber {
  phoneNumber: string;
}

export type SignUpByPhoneNumberApi = (user: UserSignUpByPhoneNumber) => Promise<User>;

export const signUpByPhoneNumberApi: SignUpByPhoneNumberApi = async (user) => {
  const result = await authAxios.post<UserSignUpByPhoneNumber, { data: User }>(
    '/users.json',
    { user },
    {
      headers: {
        'Client-Id': AUTH_CLIENT_ID,
      },
    }
  );

  return result.data;
};

/***** Sign in by phone number *****/

interface SignInByPhoneNumberParams {
  phoneNumber: string;
  otpCode: string;
}

export interface SignInByPhoneNumberApiParams extends SignInByPhoneNumberParams {
  grantType: string;
  clientId: string;
}

type SignInByPhoneNumberApi = (params: SignInByPhoneNumberParams) => Promise<OAuthCredentials>;

export const signInByPhoneNumberApi: SignInByPhoneNumberApi = async ({ phoneNumber, otpCode }) => {
  const result = await authAxios.post<SignInByPhoneNumberApiParams, { data: OAuthCredentials }>(
    '/oauth/token',
    {
      grantType: 'password',
      clientId: AUTH_CLIENT_ID,
      phoneNumber,
      otpCode,
    }
  );

  return result.data;
};

/***** Sign in by assertion *****/

export interface SignInByAssertionParams {
  assertion: string;
  provider: string;
}

interface SignInByAssertionApiParams {
  grantType: string;
  clientId: string;
}

type SignInByAssertionApi = (params: SignInByAssertionParams) => Promise<OAuthCredentials>;

export const signInByAssertionApi: SignInByAssertionApi = async ({ provider, assertion }) => {
  const result = await authAxios.post<SignInByAssertionApiParams, { data: OAuthCredentials }>(
    '/oauth/token',
    {
      grantType: 'assertion',
      clientId: AUTH_CLIENT_ID,
      provider,
      assertion,
    }
  );

  return result.data;
};

/***** Sign out *****/

type SignOutApi = (token: string) => Promise<void>;

export const signOutApi: SignOutApi = async (token) => {
  await authAxios.post('/oauth/revoke', {
    clientId: AUTH_CLIENT_ID,
    token,
  });
};

/***** Update user *****/

export interface UpdateUserParams
  extends Omit<User, 'id' | 'avatar' | 'createdAt' | 'updatedAt' | 'phoneNumber'> {
  phone_number: string;
  password?: string;
  current_password: string;
}

type UpdateUserApi = (user: UpdateUserParams) => Promise<void>;

export const updateUserApi: UpdateUserApi = async (user) => {
  const credentialsString = await AsyncStorage.getItem('credentials');
  if (credentialsString) {
    const _credentials: OAuthCredentials = JSON.parse(credentialsString);
    await authAxios.put<UpdateUserParams>(
      '/users.json',
      { user },
      {
        headers: {
          Authorization: `${_credentials.tokenType} ${_credentials.accessToken}`,
        },
      }
    );
  }
};

/***** Me *****/

type MeApi = () => Promise<User | null>;

export const meApi: MeApi = async () => {
  const credentials = await AsyncStorage.getItem('credentials');
  if (credentials) {
    const apolloClient = await getApolloClient();
    const result = await apolloClient.query<MeQuery, MeQueryVariables>({
      query: MeDocument,
      fetchPolicy: 'network-only',
    });
    if (result.data.me) return camelizeKeys<User>(result.data.me);
  }
  return null;
};

/***** Upsert device *****/

export const upsertDevice = async (variables: UpsertDeviceMutationVariables) => {
  const apolloClient = await getApolloClient();
  await apolloClient.query<UpsertDeviceMutation, UpsertDeviceMutationVariables>({
    query: UpsertDeviceDocument,
    fetchPolicy: 'network-only',
    variables,
  });
};
