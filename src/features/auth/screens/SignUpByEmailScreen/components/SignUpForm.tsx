import { Entypo } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Center,
  Checkbox,
  Divider,
  Hidden,
  HStack,
  Icon,
  IconButton,
  Link,
  Pressable,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import React, { useContext, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { FormInput, IconFacebook, IconGoogle } from '../../../../../components';
import { setErrors } from '../../../../../helpers/forms';
import { useThemedToast } from '../../../../../hooks/useThemedToast';
import { UserSignUpByEmail } from '../../../../user/user.api';
import { AuthContext } from '../../../context/AuthContext';
import { SignUpByEmailScreenProps } from '../SignUpByEmailScreen';
YupPassword(Yup);

interface UserSignUpByEmailForm extends UserSignUpByEmail {
  termsAccepted: boolean;
}

export const SignUpForm: React.FC = () => {
  const { navigate } = useNavigation<SignUpByEmailScreenProps['navigation']>();
  const [showPass, setShowPass] = React.useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState<boolean>(false);
  const [signUpIsLoading, setSignUpIsLoading] = React.useState<boolean>(false);
  const [googleSignInIsLoading, setGoogleSignInIsLoading] = React.useState<boolean>(false);
  const [facebookSignInIsLoading, setFacebookSignInIsLoading] = React.useState<boolean>(false);
  const { signUpByEmail, facebookSignIn, googleSignIn } = useContext(AuthContext);
  const toast = useThemedToast();

  const anySignUpIsLoading = useMemo(
    () => signUpIsLoading || googleSignInIsLoading || facebookSignInIsLoading,
    [signUpIsLoading, googleSignInIsLoading, facebookSignInIsLoading]
  );

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Must have at least 3 characters')
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    // name: Yup.string()
    //   .min(3, 'Must have at least 3 characters')
    //   .max(15, 'Must be 15 characters or less')
    // .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().password().required('Required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
    termsAccepted: Yup.bool().oneOf([true], 'Field must be checked'),
  });

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<UserSignUpByEmailForm>({
    defaultValues: {
      username: '',
      email: '',
      name: '',
      password: '',
      passwordConfirmation: '',
      termsAccepted: true,
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: UserSignUpByEmailForm) => {
    setSignUpIsLoading(true);
    try {
      const { username, email, name, password, passwordConfirmation } = values;
      await signUpByEmail({
        username,
        email,
        name,
        password,
        passwordConfirmation,
      });
      reset();
      navigate('SignIn');
    } catch (err: any) {
      const dataErrors = err?.response?.data?.errors;
      if (dataErrors) {
        setErrors<UserSignUpByEmailForm>(setError, dataErrors);
      } else {
        console.error(err);
        toast.error({
          description: 'User could not be created',
        });
      }
    } finally {
      setSignUpIsLoading(false);
    }
  };

  const onGoogleSignInPress = async (): Promise<void> => {
    setGoogleSignInIsLoading(true);
    try {
      await googleSignIn();
    } catch (err) {
      console.error(err);
      toast.show({ description: 'We are sorry, something went wrong' });
    } finally {
      setGoogleSignInIsLoading(false);
    }
  };

  const onFacebookSignInPress = async (): Promise<void> => {
    setFacebookSignInIsLoading(true);
    try {
      await facebookSignIn();
    } catch (err) {
      console.error(err);
      toast.show({ description: 'We are sorry, something went wrong' });
    } finally {
      setFacebookSignInIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{ flex: 1 }}>
      <VStack
        flex="1"
        px="6"
        py="9"
        _light={{ bg: 'white' }}
        _dark={{ bg: 'coolGray.800' }}
        justifyContent="space-between"
        space="3"
        borderTopRightRadius={{ base: '2xl', md: 'xl' }}
        borderBottomRightRadius={{ base: '0', md: 'xl' }}
        borderTopLeftRadius={{ base: '2xl', md: '0' }}>
        <VStack space="7">
          <Hidden till="md">
            <Text fontSize="lg" fontWeight="normal">
              Sign up to continue!
            </Text>
          </Hidden>
          <VStack>
            <VStack space="8">
              <VStack space={{ base: '7', md: '4' }}>
                <Controller
                  name="username"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormInput
                      label="Username"
                      errorMessage={errors.username?.message}
                      inputProps={{
                        onChangeText: onChange,
                        onBlur,
                        defaultValue: value,
                      }}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormInput
                      label="Email"
                      errorMessage={errors.email?.message}
                      inputProps={{
                        onChangeText: onChange,
                        onBlur,
                        defaultValue: value,
                      }}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormInput
                      label="Password"
                      errorMessage={errors.password?.message}
                      inputProps={{
                        onChangeText: onChange,
                        onBlur,
                        defaultValue: value,
                        type: showPass ? undefined : 'password',
                        InputRightElement: (
                          <IconButton
                            variant="unstyled"
                            py={0}
                            my={0}
                            icon={
                              <Icon
                                size="4"
                                color="coolGray.400"
                                as={Entypo}
                                name={showPass ? 'eye-with-line' : 'eye'}
                              />
                            }
                            onPress={() => {
                              setShowPass(!showPass);
                            }}
                          />
                        ),
                      }}
                    />
                  )}
                />
                <Controller
                  name="passwordConfirmation"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormInput
                      label="Password confirmation"
                      errorMessage={errors.passwordConfirmation?.message}
                      inputProps={{
                        onChangeText: onChange,
                        onBlur,
                        defaultValue: value,
                        type: showConfirmPass ? undefined : 'password',
                        InputRightElement: (
                          <IconButton
                            variant="unstyled"
                            py={0}
                            my={0}
                            icon={
                              <Icon
                                size="4"
                                color="coolGray.400"
                                as={Entypo}
                                name={showConfirmPass ? 'eye-with-line' : 'eye'}
                              />
                            }
                            onPress={() => {
                              setShowConfirmPass(!showConfirmPass);
                            }}
                          />
                        ),
                      }}
                    />
                  )}
                />
              </VStack>
              <Controller
                name="termsAccepted"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox
                    alignItems="flex-start"
                    defaultIsChecked={value}
                    value="termsAccepted"
                    onChange={onChange}
                    color="primary"
                    accessibilityLabel="Accept terms and conditions">
                    <HStack alignItems="center">
                      <Text fontSize="sm" color="coolGray.400" pl="2">
                        I accept the{' '}
                      </Text>
                      <Link
                        _text={{
                          fontSize: 'sm',
                          fontWeight: 'semibold',
                          textDecoration: 'none',
                        }}
                        _light={{
                          _text: {
                            color: 'primary.900',
                          },
                        }}
                        _dark={{
                          _text: {
                            color: 'primary.500',
                          },
                        }}>
                        Terms of Use
                      </Link>
                      <Text fontSize="sm"> & </Text>

                      <Link
                        _text={{
                          fontSize: 'sm',
                          fontWeight: 'semibold',
                          textDecoration: 'none',
                        }}
                        _light={{
                          _text: {
                            color: 'primary.900',
                          },
                        }}
                        _dark={{
                          _text: {
                            color: 'primary.500',
                          },
                        }}>
                        Privacy Policy
                      </Link>
                    </HStack>
                  </Checkbox>
                )}
              />
              {errors.termsAccepted ? (
                <Text color="danger.500">{errors.termsAccepted.message}</Text>
              ) : null}
              <Button
                size="md"
                borderRadius="4"
                onPress={() => {
                  handleSubmit(onSubmit)();
                }}
                disabled={anySignUpIsLoading}
                leftIcon={signUpIsLoading ? <Spinner color="white" /> : <></>}
                _text={{
                  fontSize: 'sm',
                  fontWeight: 'medium',
                }}
                _light={{
                  bg: 'primary.900',
                }}
                _dark={{
                  bg: 'primary.700',
                }}>
                SIGN UP
              </Button>
              <HStack
                space="2"
                mb={{ base: '6', md: '7' }}
                alignItems="center"
                justifyContent="center">
                <Divider w="30%" _light={{ bg: 'coolGray.200' }} _dark={{ bg: 'coolGray.700' }} />
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  _light={{ color: 'coolGray.300' }}
                  _dark={{ color: 'coolGray.500' }}>
                  or
                </Text>
                <Divider w="30%" _light={{ bg: 'coolGray.200' }} _dark={{ bg: 'coolGray.700' }} />
              </HStack>
            </VStack>
            <Center>
              <HStack space="4">
                <Pressable disabled={anySignUpIsLoading} onPress={onFacebookSignInPress}>
                  {facebookSignInIsLoading ? <Spinner /> : <IconFacebook />}
                </Pressable>
                <Pressable disabled={anySignUpIsLoading} onPress={onGoogleSignInPress}>
                  {googleSignInIsLoading ? <Spinner /> : <IconGoogle />}
                </Pressable>
              </HStack>
            </Center>
          </VStack>
        </VStack>
        <HStack
          mb="4"
          space="1"
          alignItems="center"
          justifyContent="center"
          mt={{ base: 'auto', md: '8' }}>
          <Text fontSize="sm" _light={{ color: 'coolGray.800' }} _dark={{ color: 'coolGray.400' }}>
            Already have an account?
          </Text>
          {/* Opening Link Tag navigateTo:"SignIn" */}
          <Link
            _text={{
              fontSize: 'sm',
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
            _light={{
              _text: {
                color: 'primary.900',
              },
            }}
            _dark={{
              _text: {
                color: 'primary.500',
              },
            }}
            onPress={() => {
              navigate('SignIn');
            }}>
            Sign in
          </Link>
          {/* Closing Link Tag */}
        </HStack>
      </VStack>
    </KeyboardAwareScrollView>
  );
};
