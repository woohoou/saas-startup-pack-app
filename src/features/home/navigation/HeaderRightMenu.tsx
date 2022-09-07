import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HStack, Icon, IconButton, Pressable } from 'native-base';
import React, { useContext } from 'react';
import { Platform } from 'react-native';
import { ProfileAvatar } from '../../auth/components';
import { AuthContext } from '../../auth/context';
import { HomeScreenNavProps } from './HomeNavigator';

export const HeaderRightMenu = () => {
  const { currentUser } = useContext(AuthContext);
  const { navigate } = useNavigation<HomeScreenNavProps['navigation']>();

  return (
    <HStack px={5} alignItems="flex-end">
      <IconButton onPress={() => null} icon={<Icon as={MaterialIcons} name="search" />} />
      {Platform.OS === 'web' && currentUser && (
        <Pressable onPress={() => navigate('Edit account')}>
          <ProfileAvatar user={currentUser} />
        </Pressable>
      )}
    </HStack>
  );
};
