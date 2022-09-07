import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Platform } from 'react-native';
import { AppContent } from '..';
import { AuthEmailNavigator, AuthPhoneNumberNavigator } from '../../auth';
import { AuthContext } from '../../auth/context';
import { SideMenuProvider } from '../../home/navigation/context/SidemenuContext';
import { Loading } from '../../loading';

enum LoginType {
  PhoneNumber,
  Email,
}

const LOGIN_TYPE: LoginType = Platform.OS === 'web' ? LoginType.Email : LoginType.PhoneNumber;

export const AppNavigator: React.FC = () => {
  const { isSignedIn, userLoading } = useContext(AuthContext);

  const linking = {
    prefixes: ['https://myapp.com', 'myapp://'],
  };

  const linkingAuth = Object.assign(linking, {
    config: {
      screens: {
        Splash: '',
        SignUp: 'sign_up',
        SignIn: 'sign_in',
        ForgotPassword: 'forgot_password',
      },
    },
  });

  const linkingMain = Object.assign(linking, {
    config: {
      screens: {
        Welcome: 'welcome',
        'Edit account': 'edit_account',
      },
    },
  });

  return userLoading ? (
    <Loading />
  ) : isSignedIn ? (
    <SideMenuProvider>
      <NavigationContainer linking={linkingMain}>
        <AppContent />
      </NavigationContainer>
    </SideMenuProvider>
  ) : (
    <NavigationContainer linking={linkingAuth}>
      {/* @ts-ignore */}
      {LOGIN_TYPE === LoginType.PhoneNumber && <AuthPhoneNumberNavigator />}
      {LOGIN_TYPE === LoginType.Email && <AuthEmailNavigator />}
    </NavigationContainer>
  );
};
