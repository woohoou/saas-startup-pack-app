import { AuthSessionResult } from 'expo-auth-session';
import { OAuthCredentials } from '..';
import { User } from '../../user';
import {
  ForgotPasswordApi,
  SendOtpApi,
  SignInByAssertionParams,
  SignInByEmailApiParams,
  SignInByPhoneNumberApiParams,
  SignUpByPhoneNumberApi,
  UpdateUserParams,
  UserSignUpByEmail,
} from '../../user/user.api';

interface AuthorizeResult {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  scopes: string;
  accessTokenExpirationDate: string;
  tokenAdditionalParameters: {
    created_at: string;
  };
}

export type SignUpByEmail = (user: UserSignUpByEmail) => Promise<void>;

export type SignInByEmail = (params: SignInByEmailApiParams) => Promise<void>;

export type ForgotPassword = ForgotPasswordApi;

export type SignUpByPhoneNumber = SignUpByPhoneNumberApi;

export type SendOtp = SendOtpApi;

export type SignInByPhoneNumber = (params: SignInByPhoneNumberApiParams) => Promise<void>;

export type SignInByAssertion = (params: SignInByAssertionParams) => Promise<void>;

export type SignInByOAuth2 = (authState: AuthorizeResult) => Promise<void>;

export type SignOut = () => Promise<void>;

export type UpdateUser = (user: UpdateUserParams) => Promise<User | undefined>;

export type OAuth2SignIn = () => Promise<void>;

export type GoogleSignIn = () => Promise<AuthSessionResult>;

export type FacebookSignIn = () => Promise<AuthSessionResult>;

export type SteamSignIn = () => Promise<AuthSessionResult>;

export type TwitchSignIn = () => Promise<AuthSessionResult>;

export type GithubSignIn = () => Promise<AuthSessionResult>;

export interface AuthContextData {
  currentUser?: User;
  credentials?: OAuthCredentials;
  displayName: string;
  refreshUser: () => void;
  setCurrentUser: (user: User) => void;
  isSignedIn: boolean;
  userLoading: boolean;
  signUpByEmail: SignUpByEmail;
  signInByEmail: SignInByEmail;
  forgotPassword: ForgotPassword;
  signUpByPhoneNumber: SignUpByPhoneNumber;
  sendOtp: SendOtp;
  signInByPhoneNumber: SignInByPhoneNumber;
  signInByAssertion: SignInByAssertion;
  signInByOAuth2: SignInByOAuth2;
  updateUser: UpdateUser;
  signOut: SignOut;
  oauth2SignIn: OAuth2SignIn;
  googleSignIn: GoogleSignIn;
  facebookSignIn: FacebookSignIn;
  twitchSignIn: TwitchSignIn;
  steamSignIn: SteamSignIn;
  githubSignIn: GithubSignIn;
}
