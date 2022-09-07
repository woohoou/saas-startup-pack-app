import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import {
  Box,
  Button,
  Center,
  FormControl,
  Hidden,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  Stack,
  StatusBar,
  Text,
  VStack,
} from 'native-base';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Keyboard, Platform, StyleSheet } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import RNOtpVerify from 'react-native-otp-verify';
import { useThemedToast } from '../../../../hooks/useThemedToast';
import { AuthContext } from '../../context/AuthContext';
import { AuthPhoneNumberStackParams } from '../../navigator';
import Logo from './components/logo.png';

const CELL_COUNT = 6;

export type SignUpByPhoneNumberScreenProps = StackScreenProps<AuthPhoneNumberStackParams, 'SignIn'>;

export const SignInByPhoneNumberScreen: React.FC<SignUpByPhoneNumberScreenProps> = ({
  navigation: { navigate },
  route: {
    params: { phoneNumber },
  },
}) => {
  const { signInByPhoneNumber, sendOtp } = useContext(AuthContext);
  const [restartListener, setRestartListener] = useState<boolean>(false);
  const [signInIsLoading, setSignInIsLoading] = React.useState<boolean>(false);
  const toast = useThemedToast();

  const [otp, setOtp] = useState<string>();
  const ref = useBlurOnFulfill({ value: otp, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });

  const maskedPhoneNumber = useMemo(() => {
    const maskedPhoneNumber = [...phoneNumber];
    for (let i = 4; i < phoneNumber.length - 2; ++i) {
      maskedPhoneNumber[i] = '*';
    }
    return maskedPhoneNumber.join('');
  }, [phoneNumber]);

  const otpHandler = (message: string) => {
    if (message) {
      const _otp = /(\d{6})/g.exec(message)!;
      if (_otp) {
        setOtp(_otp[1]);
        RNOtpVerify.removeListener();
        Keyboard.dismiss();
      }
    }
  };

  const sendOtpWithValidationHash = async (via: string) => {
    let validationHash;
    if (Platform.OS === 'android') {
      validationHash = await AsyncStorage.getItem('validationHash');
      if (!validationHash) {
        validationHash = (await RNOtpVerify.getHash())[0];
        AsyncStorage.setItem('validationHash', validationHash);
      }
    }
    sendOtp({ phoneNumber, via, validationHash });
    setRestartListener((listener) => !listener);
    toast.show({
      description:
        via === 'whatsapp'
          ? 'Please confirm the code sent to your whatsapp account.'
          : 'Please confirm the code sent to your phone number by sms.',
    });
  };

  useEffect(() => {
    if (otp && otp.length === 6) {
      onSubmit();
    }
  }, [otp]);

  useEffect(() => {
    sendOtpWithValidationHash('sms');
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      RNOtpVerify.getOtp().then((p) => RNOtpVerify.addListener(otpHandler));

      return () => {
        RNOtpVerify.removeListener();
      };
    }
  }, [restartListener]);

  const onSubmit = async () => {
    try {
      setSignInIsLoading(true);
      if (!otp) throw new Error('otp is required');
      await signInByPhoneNumber({ phoneNumber, otpCode: otp });
    } catch (err) {
      console.error(err);
      toast.error({
        description: 'User authentication failed due to invalid authentication code',
      });
    } finally {
      setSignInIsLoading(false);
    }
  };

  const onSignUpButtonPress = (): void => {
    navigate('SignUp');
  };

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
            <HStack space="2" px="4" mt="4" mb="5" alignItems="center">
              <IconButton
                variant="unstyled"
                onPress={onSignUpButtonPress}
                icon={
                  <Icon
                    alignItems="center"
                    justifyContent="center"
                    size="6"
                    as={AntDesign}
                    name="arrowleft"
                    color="coolGray.50"
                  />
                }
              />
              <Text color="coolGray.50" fontSize="lg">
                Create Password
              </Text>
            </HStack>
          </Hidden>
          <Hidden till="md">
            <Center
              flex="1"
              bg="primary.700"
              px={{ base: '4', md: '8' }}
              borderTopLeftRadius={{ md: 'xl' }}
              borderBottomLeftRadius={{ md: 'xl' }}>
              <Image
                h="24"
                size="80"
                alt="NativeBase Startup+ "
                resizeMode="contain"
                source={Logo}
              />
            </Center>
          </Hidden>
          <Box
            py={{ base: '6', md: '12' }}
            px={{ base: '4', md: '10' }}
            _light={{ bg: 'white' }}
            _dark={{ bg: 'coolGray.800' }}
            flex="1"
            borderTopRightRadius={{ md: 'xl' }}
            borderBottomRightRadius={{ md: 'xl' }}>
            <VStack justifyContent="space-between" flex="1" space="24">
              <Box>
                <VStack space={{ base: '4', md: '5' }}>
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    _dark={{ color: 'coolGray.50' }}
                    _light={{ color: 'coolGray.800' }}>
                    Enter OTP
                  </Text>
                  <HStack space="2" alignItems="center">
                    <Text _light={{ color: 'coolGray.800' }} _dark={{ color: 'coolGray.400' }}>
                      {`We have sent the OTP code to ${maskedPhoneNumber}`}
                    </Text>
                    <Text
                      fontWeight="bold"
                      _light={{ color: 'coolGray.800' }}
                      _dark={{ color: 'coolGray.300' }}>
                      {}
                    </Text>
                  </HStack>
                </VStack>
                <VStack space="12" mt="6">
                  <FormControl>
                    <CodeField
                      ref={ref}
                      {...props}
                      // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                      autoFocus
                      value={otp}
                      onChangeText={setOtp}
                      cellCount={CELL_COUNT}
                      rootStyle={styles.codeFieldRoot}
                      keyboardType="number-pad"
                      textContentType="oneTimeCode"
                      // autoCompleteType="postal-code"
                      renderCell={({ index, symbol, isFocused }) => (
                        <Text
                          key={index}
                          style={[styles.cell, isFocused && styles.focusCell]}
                          onLayout={getCellOnLayoutHandler(index)}>
                          {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                      )}
                    />
                    <FormControl.HelperText mt="7">
                      <VStack>
                        <Text _light={{ color: 'coolGray.800' }} _dark={{ color: 'coolGray.400' }}>
                          Didn’t receive the OTP?
                        </Text>
                        <Link
                          onPress={() => sendOtpWithValidationHash('sms')}
                          _text={{
                            _light: { color: 'primary.900' },
                            _dark: { color: 'violet.500' },
                            fontWeight: 'bold',
                            color: 'violet.700',
                            textDecoration: 'none',
                          }}>
                          {' '}
                          RESEND OTP BY SMS
                        </Link>
                        <Link
                          onPress={() => sendOtpWithValidationHash('whatsapp')}
                          _text={{
                            _light: { color: 'primary.900' },
                            _dark: { color: 'violet.500' },
                            fontWeight: 'bold',
                            color: 'violet.700',
                            textDecoration: 'none',
                          }}>
                          {' '}
                          RESEND OTP BY WHATSAPP
                        </Link>
                      </VStack>
                    </FormControl.HelperText>
                  </FormControl>
                  <Button
                    disabled={signInIsLoading}
                    size="md"
                    _light={{
                      bg: 'primary.900',
                    }}
                    _dark={{
                      bg: 'primary.700',
                    }}
                    onPress={() => {
                      navigate('ProductScreen');
                    }}>
                    PROCEED
                  </Button>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </Stack>
      </Center>
    </>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    width: '80%',
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#999',
    textAlign: 'center',
    marginHorizontal: 2,
    color: 'white',
  },
  focusCell: {
    borderColor: 'white',
  },
});
