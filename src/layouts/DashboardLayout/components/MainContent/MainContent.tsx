import { Box, Hidden, HStack, Icon, Pressable, Text, VStack } from 'native-base';
import React from 'react';

import { AntDesign } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavProps } from '../../../../features/home/navigation/HomeNavigator';
import { DashboardLayoutProps } from '../../DashboardLayout';

type MainContentProps = DashboardLayoutProps;

export function MainContent(props: MainContentProps) {
  const { goBack, canGoBack } = useNavigation<HomeScreenNavProps['navigation']>();
  return (
    <VStack p={4} maxW={props.maxWidth} flex={1} width="100%">
      {props.displayScreenTitle && (
        <Hidden till="md">
          <HStack mb="4" space={4}>
            {canGoBack() && (
              <Pressable
                onPress={() => {
                  goBack();
                }}>
                <Icon
                  size="6"
                  pt="0.5"
                  as={AntDesign}
                  name="arrowleft"
                  _light={{ color: 'coolGray.800' }}
                  _dark={{ color: 'coolGray.50' }}
                />
              </Pressable>
            )}
            <VStack>
              <Text
                fontSize="lg"
                fontWeight="medium"
                _dark={{ color: 'coolGray.50' }}
                _light={{ color: 'coolGray.800' }}>
                {props.title}
              </Text>
              <Text
                _dark={{ color: 'coolGray.50' }}
                _light={{ color: 'coolGray.800' }}
                fontSize="sm"
                fontWeight="normal">
                {props.subTitle}
              </Text>
            </VStack>
          </HStack>
        </Hidden>
      )}
      <Box p={5} bgColor="white">
        {props.children}
      </Box>
    </VStack>
  );
}
