declare module '*.graphql' {
  import { DocumentNode } from 'graphql';

  const value: DocumentNode;
  export default value;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '@env' {
  export const AUTH_URL: string;
  export const AUTH_CLIENT_ID: string;
  export const API_URL: string;
  export const GOOGLE_EXPO_CLIENT_ID: string;
  export const GOOGLE_IOS_CLIENT_ID: string;
  export const GOOGLE_ANDROID_CLIENT_ID: string;
  export const GOOGLE_WEB_CLIENT_ID: string;
  export const FACEBOOK_CLIENT_ID: string;
  export const STEAM_CLIENT_ID: string;
  export const STEAM_OPEN_ID_URL: string;
  export const GITHUB_CLIENT_ID: string;
  export const TWITCH_CLIENT_ID: string;
}

declare type Hook<P = any, T = any> = (args: P) => T;
