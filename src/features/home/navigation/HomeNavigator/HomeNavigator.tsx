import { createDrawerNavigator, DrawerNavigationOptions } from '@react-navigation/drawer';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { useColorModeValue, useTheme } from 'native-base';
import React, { useContext } from 'react';
import { isMobile } from 'react-device-detect';
import { LogBox, Platform } from 'react-native';
import { EditAccountScreen } from '../../../user';
import { WelcomeScreen } from '../../../welcome';
import { WebHeaderTitle } from '../components/WebHeaderTitle';
import { SideMenuContext } from '../context/SidemenuContext';
import { HeaderRightMenu } from '../HeaderRightMenu';
import { HomeDrawer } from '../HomeDrawer';
import { HomeDrawerParams } from './HomeNavigator.types';

const Drawer = createDrawerNavigator<HomeDrawerParams>();
const Stack = Platform.OS === 'web' && !isMobile ? createStackNavigator<HomeDrawerParams>() : null;

const SCREENS = [
  {
    name: 'Welcome',
    screen: WelcomeScreen,
  },
  {
    name: 'Edit account',
    screen: EditAccountScreen,
  },
];

export const HomeNavigator: React.FC = () => {
  const { colors } = useTheme();
  const stackHeaderBgColor = useColorModeValue(colors.white[900], colors.blueGray[800]);
  const drawerHeaderBgColor = useColorModeValue(colors.primary[900], colors.blueGray[800]);
  const headerTintColor = colors.coolGray[50];
  const { isLargeScreen } = useContext(SideMenuContext);

  const stackScreenOptions: StackNavigationOptions = {
    headerTitle: WebHeaderTitle,
    headerRight: HeaderRightMenu,
    headerStyle: {
      backgroundColor: stackHeaderBgColor,
    },
    headerTintColor,
  };

  const drawerScreenOptions: DrawerNavigationOptions = {
    gestureEnabled: true,
    headerRight: HeaderRightMenu,
    headerStyle: {
      backgroundColor: drawerHeaderBgColor,
    },
    headerTintColor,
  };

  if (isLargeScreen) {
    drawerScreenOptions['drawerType'] = 'permanent';
    drawerScreenOptions['overlayColor'] = 'transparent';
    stackScreenOptions['headerLeft'] = () => null;
  }

  return Stack ? (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      {SCREENS.map(({ name, screen, ...props }) => (
        <Stack.Screen
          key={name}
          name={name as keyof HomeDrawerParams}
          component={screen}
          {...props}
        />
      ))}
    </Stack.Navigator>
  ) : (
    <Drawer.Navigator
      screenOptions={drawerScreenOptions}
      drawerContent={(props) => <HomeDrawer {...props} />}>
      {SCREENS.map(({ name, screen, ...props }) => (
        <Drawer.Screen
          key={name}
          name={name as keyof HomeDrawerParams}
          component={screen}
          {...props}
        />
      ))}
    </Drawer.Navigator>
  );
};

LogBox.ignoreLogs(['Accessing the state']);
