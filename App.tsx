import { ApolloProvider } from '@apollo/client';
import { extendTheme, NativeBaseProvider, theme as nbTheme, View } from 'native-base';
import React from 'react';
import { AuthProvider } from './src/features/auth/context';
import { AppNavigator } from './src/features/main/navigator/AppNavigator';
import { registerForPushNotificationsAsync } from './src/helpers/pushNotifications';
import { useAppIsReady } from './src/hooks/useAppIsReady';

const theme = extendTheme({
  fonts: {
    heading: 'OpenSans_600SemiBold',
    body: 'OpenSans_400Regular',
    mono: 'OpenSans_400Regular',
  },
  colors: {
    primary: nbTheme.colors.violet,
  },
});

export default function App() {
  const [appIsReady, { apolloClient, onLayoutRootView }] = useAppIsReady();

  if (!appIsReady || !apolloClient) {
    return null;
  }

  registerForPushNotificationsAsync();

  return (
    <NativeBaseProvider theme={theme}>
      <View flex={1} onLayout={onLayoutRootView}>
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </ApolloProvider>
      </View>
    </NativeBaseProvider>
  );
}
