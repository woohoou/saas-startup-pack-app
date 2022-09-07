import { DrawerScreenProps } from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';

export type HomeDrawerParams = {
  Welcome: undefined;
  'Edit account': undefined;
};

export type HomeScreenNavProps =
  | DrawerScreenProps<HomeDrawerParams>
  | StackScreenProps<HomeDrawerParams>;

export type HomeScreenProps<V extends keyof HomeDrawerParams> =
  | DrawerScreenProps<HomeDrawerParams, V>
  | StackScreenProps<HomeDrawerParams, V>;
