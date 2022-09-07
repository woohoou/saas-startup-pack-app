import { StackScreenProps } from '@react-navigation/stack';
import { Box, Center, Hidden, HStack, Image, Stack, StatusBar, Text, VStack } from 'native-base';
import React from 'react';
import 'yup-phone';
import { AuthPhoneNumberStackParams } from '../../navigator';
import { SignUpForm } from './components';
import Logo from './components/logo.png';

export type SignUpByPhoneNumberScreenProps = StackScreenProps<AuthPhoneNumberStackParams, 'SignUp'>;

export const SignUpByPhoneNumberScreen: React.FC<SignUpByPhoneNumberScreenProps> = () => {
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
                {/* <IconButton
                  pl="0"
                  variant="unstyled"
                  onPress={() => {
                    navigation.goBack();
                  }}
                  icon={<Icon size="6" as={AntDesign} name="arrowleft" color="coolGray.50" />}
                /> */}
                <Text color="coolGray.50" fontSize="lg">
                  Sign Up
                </Text>
              </HStack>
              <VStack space="2">
                <Text fontSize="3xl" fontWeight="bold" color="coolGray.50">
                  Welcome
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
                  Sign up to continue
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
          <SignUpForm />
        </Stack>
      </Center>
    </>
  );
};
