import { EditAccountScreen } from '../../../user';
import { WelcomeScreen } from '../../../welcome';

export const SCREENS = [
  {
    name: 'Welcome',
    screen: WelcomeScreen,
    initialProps: null,
  },
  { name: 'Edit account', screen: EditAccountScreen, initialProps: null },
];
