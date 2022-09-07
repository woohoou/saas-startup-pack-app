import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
  OpenSans_800ExtraBold_Italic,
  useFonts,
} from '@expo-google-fonts/open-sans';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getApolloClient } from '../clients/apollo';

interface UseAppIsReadyOutput {
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  onLayoutRootView: () => Promise<void>;
}

export const useAppIsReady: Hook<void, [boolean, UseAppIsReadyOutput]> = () => {
  const [prepareIsReady, setPrepareIsReady] = useState<boolean>(false);
  const [apolloClient, setApolloClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_300Light_Italic,
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold,
    OpenSans_800ExtraBold_Italic,
  });

  const appIsReady = useMemo(() => prepareIsReady && fontsLoaded, [prepareIsReady, fontsLoaded]);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        setApolloClient(await getApolloClient());
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setPrepareIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return [appIsReady, { apolloClient, onLayoutRootView }];
};
