import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button, Icon, IconButton, useColorModeValue, VStack } from 'native-base';
import React, { useContext } from 'react';
import { SideMenuContext } from '../../context/SidemenuContext';
import { HomeDrawerParams, HomeScreenNavProps } from '../../HomeNavigator/HomeNavigator.types';

interface SidebarLink {
  name: keyof HomeDrawerParams;
  navigateTo?: string;
  icon: string;
  as: any;
}

const menu: SidebarLink[] = [
  { name: 'Welcome', icon: 'home', as: MaterialIcons },
  { name: 'Edit account', icon: 'edit', as: MaterialIcons },
];

export const SidebarBody: React.FC = () => {
  const activeSectionColor = useColorModeValue('blueGray.100', 'blueGray.700');
  const { isSideMenuCollapsed, isLargeScreen } = useContext(SideMenuContext);

  const { navigate, getState } = useNavigation<HomeScreenNavProps['navigation']>();
  const state = getState();

  return (
    <VStack px="2" py="4">
      {menu.map(({ name, as, icon }, index: number) =>
        isSideMenuCollapsed && isLargeScreen ? (
          <IconButton
            {...buttonProps}
            key={index}
            variant="ghost"
            justifyContent="flex-start"
            bg={
              state && name === state.routes[state.index]?.name ? activeSectionColor : 'transparent'
            }
            onPress={() => {
              navigate(name);
            }}
            icon={<Icon size="5" mr="2" as={as} name={icon} />}
          />
        ) : (
          <Button
            {...buttonProps}
            key={index}
            variant="ghost"
            justifyContent="flex-start"
            bg={
              state && name === state.routes[state.index]?.name ? activeSectionColor : 'transparent'
            }
            onPress={() => {
              navigate(name);
            }}
            leftIcon={<Icon size="5" mr="2" as={as} name={icon} />}>
            {name}
          </Button>
        )
      )}
    </VStack>
  );
};

const buttonProps = {
  py: '3',
  px: '5',
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
