import { MaterialIcons } from '@expo/vector-icons';
import { Box, Button, Icon, IconButton, Spinner, VStack } from 'native-base';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../auth/context';
import { SideMenuContext } from '../../context/SidemenuContext';

export const SidebarFooter = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const { isSideMenuCollapsed, isLargeScreen } = useContext(SideMenuContext);
  const { signOut } = useContext(AuthContext);

  const onPressSignOut = () => {
    try {
      setIsLoading(true);
      signOut();
    } finally {
      setIsLoading(false);
    }
  };

  return isSideMenuCollapsed && isLargeScreen ? (
    <VStack px="2" py="4">
      <IconButton
        {...logoutButtonProps}
        variant="ghost"
        disabled={isLoading}
        onPress={onPressSignOut}
        icon={
          isLoading ? <Spinner /> : <Icon size="5" mr="2" as={MaterialIcons} name="exit-to-app" />
        }
      />
    </VStack>
  ) : (
    <Box px="6" py="4">
      <Button
        {...logoutButtonProps}
        variant="ghost"
        justifyContent="flex-start"
        p="3"
        disabled={isLoading}
        onPress={onPressSignOut}
        leftIcon={
          isLoading ? <Spinner /> : <Icon size="5" mr="2" as={MaterialIcons} name="exit-to-app" />
        }>
        Logout
      </Button>
    </Box>
  );
};

const logoutButtonProps = {
  _light: {
    _text: { color: 'coolGray.800' },
    _icon: { color: 'coolGray.800' },
  },
  _dark: {
    _text: { color: 'coolGray.50' },
    _icon: { color: 'coolGray.50' },
  },
  _text: {
    fontSize: 'md',
    fontWeight: 'medium',
  },
  _hover: {
    _text: {
      _light: {
        color: 'primary.900',
      },
      _dark: {
        color: 'primary.500',
      },
    },

    _icon: {
      _light: {
        color: 'primary.900',
      },
      _dark: {
        color: 'primary.500',
      },
    },
    _light: {
      bg: 'primary.100',
    },
    _dark: {
      bg: 'coolGray.800',
    },
  },
};
