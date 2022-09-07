import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context';
import {
  SignInByEmailScreen,
  SignInByPhoneNumberScreen,
  SignUpByEmailScreen,
  SignUpByPhoneNumberScreen,
} from '../screens';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import { SplashScreen } from '../screens/Splash';

export type AuthEmailStackParams = {
  Splash: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
};

const StackEmail = createStackNavigator<AuthEmailStackParams>();

export const AuthEmailNavigator: React.FC = () => {
  return (
    <StackEmail.Navigator>
      <StackEmail.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <StackEmail.Screen
        name="SignUp"
        component={SignUpByEmailScreen}
        options={{ headerShown: false }}
      />
      <StackEmail.Screen
        name="SignIn"
        component={SignInByEmailScreen}
        options={{ headerShown: false }}
      />
      <StackEmail.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
    </StackEmail.Navigator>
  );
};

export type AuthPhoneNumberStackParams = {
  SignUp: undefined;
  SignIn: {
    phoneNumber: string;
  };
};

const StackPhoneNumber = createStackNavigator<AuthPhoneNumberStackParams>();

export const AuthPhoneNumberNavigator: React.FC = () => {
  return (
    <StackPhoneNumber.Navigator>
      <StackPhoneNumber.Screen
        name="SignUp"
        component={SignUpByPhoneNumberScreen}
        options={{ headerShown: false }}
      />
      <StackPhoneNumber.Screen
        name="SignIn"
        component={SignInByPhoneNumberScreen}
        options={{ headerShown: false }}
      />
    </StackPhoneNumber.Navigator>
  );
};

export const AuthOAuth2Navigator = () => {
  const { oauth2SignIn } = useContext(AuthContext);
  useEffect(() => {
    oauth2SignIn();
  }, []);
  return <></>;
};
