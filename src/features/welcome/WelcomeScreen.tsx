import { Box, Heading } from 'native-base';
import React, { useContext } from 'react';
import { DashboardLayout } from '../../layouts';
import { AuthContext } from '../auth/context';
import { HomeScreenProps } from '../home/navigation/HomeNavigator';

export type WelcomeScreenProps = HomeScreenProps<'Edit account'>;

export const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <DashboardLayout title="Welcome">
      <Box>
        <Heading>Hello {currentUser?.name}</Heading>
      </Box>
    </DashboardLayout>
  );
};
