import type { StackScreenProps } from '@react-navigation/stack';
import { Box } from 'native-base';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GuestLayout } from '../../../../layouts';
import { AuthEmailStackParams } from '../../navigator';
import { ForgotPasswordForm } from './components';

export type ForgotPasswordScreenProps = StackScreenProps<AuthEmailStackParams, 'ForgotPassword'>;

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation: { navigate },
}) => {
  return (
    <GuestLayout>
      <Box _light={{ bg: 'white' }} _dark={{ bg: 'coolGray.800' }} flex={1}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          enableOnAndroid>
          <ForgotPasswordForm />
        </KeyboardAwareScrollView>
      </Box>
    </GuestLayout>
  );
};
