import { AntDesign } from '@expo/vector-icons';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  Box,
  Center,
  Hidden,
  HStack,
  Icon,
  IconButton,
  Image,
  Stack,
  StatusBar,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import { AuthEmailStackParams } from '../../navigator';
import Logo from './components/logo.png';
import SignInForm from './components/SignInForm';

export type SignInByEmailScreenProps = StackScreenProps<AuthEmailStackParams, 'SignIn'>;

export const SignInByEmailScreen: React.FC<SignInByEmailScreenProps> = ({
  navigation: { navigate },
}) => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Box safeAreaTop _light={{ bg: 'primary.900' }} _dark={{ bg: 'coolGray.900' }} />
      <Center
        my="auto"
        _dark={{ bg: 'coolGray.900' }}
        _light={{ bg: 'primary.900' }}
        flex="1"
        p={{ md: 8 }}>
        <Stack
          flexDirection={{ base: 'column', md: 'row' }}
          w="100%"
          maxW={{ md: '1016px' }}
          flex={{ base: '1', md: 'none' }}>
          <Hidden from="md">
            <VStack px="4" mt="4" mb="5" space="9">
              <HStack space="2" alignItems="center">
                <IconButton
                  variant="unstyled"
                  pl="0"
                  onPress={() => navigate('Splash')}
                  icon={<Icon size="6" as={AntDesign} name="arrowleft" color="coolGray.50" />}
                />
                <Text color="coolGray.50" fontSize="lg">
                  Sign In
                </Text>
              </HStack>
              <VStack space="2">
                <Text fontSize="3xl" fontWeight="bold" color="coolGray.50">
                  Welcome back,
                </Text>
                <Text
                  fontSize="md"
                  fontWeight="normal"
                  _dark={{
                    color: 'coolGray.400',
                  }}
                  _light={{
                    color: 'primary.300',
                  }}>
                  Sign in to continue
                </Text>
              </VStack>
            </VStack>
          </Hidden>
          <Hidden till="md">
            <Center
              flex="1"
              bg="primary.700"
              borderTopLeftRadius={{ base: '0', md: 'xl' }}
              borderBottomLeftRadius={{ base: '0', md: 'xl' }}>
              <Image
                h="24"
                size="80"
                alt="NativeBase Startup+ "
                resizeMode="contain"
                source={Logo}
              />
            </Center>
          </Hidden>
          <SignInForm />
        </Stack>
      </Center>
    </>
  );
};
