import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  HStack,
  Icon,
  IconButton,
  MoonIcon,
  Pressable,
  SunIcon,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from 'native-base';
import React, { useContext } from 'react';
import { ProfileAvatar } from '../../../../auth/components/ProfileAvatar';
import { AuthContext } from '../../../../auth/context';
import { SideMenuContext } from '../../context/SidemenuContext';
import { HomeScreenNavProps } from '../../HomeNavigator';

export const SidebarHeader: React.FC = () => {
  const { currentUser, displayName } = useContext(AuthContext);
  const { isSideMenuCollapsed, isLargeScreen } = useContext(SideMenuContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const profileBgColor = useColorModeValue('primary.900', 'blueGray.900');
  const { navigate } = useNavigation<HomeScreenNavProps['navigation']>();

  return currentUser && !(isSideMenuCollapsed && isLargeScreen) ? (
    <VStack
      pb="4"
      alignItems="center"
      borderBottomWidth="1"
      bg={profileBgColor}
      _light={{
        borderBottomColor: 'coolGray.200',
      }}
      _dark={{
        borderBottomColor: 'coolGray.700',
      }}>
      <IconButton
        variant="ghost"
        colorScheme="light"
        alignSelf="flex-end"
        onPress={toggleColorMode}
        _icon={{ color: 'coolGray.50' }}
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      />
      <ProfileAvatar size="xl" user={currentUser} />

      <HStack alignItems="center" justifyContent="center" space="2" pt={3}>
        <Text fontSize="xl" fontWeight="bold" _light={{ color: 'coolGray.50' }}>
          {displayName}
        </Text>
        <Pressable onPress={() => navigate('Edit account')}>
          <Icon
            as={MaterialIcons}
            name="mode-edit"
            size={4}
            _light={{ color: 'coolGray.50' }}
            _dark={{ color: 'white' }}
          />
        </Pressable>
      </HStack>
      <Text
        fontSize="sm"
        fontWeight="medium"
        textAlign="center"
        pt={1}
        _light={{ color: 'coolGray.50' }}
        _dark={{ color: 'coolGray.400' }}>
        {currentUser.email}
      </Text>
    </VStack>
  ) : (
    <></>
  );
};
