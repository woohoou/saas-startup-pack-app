import { Box, IInputProps, Text, useColorModeValue, VStack } from 'native-base';
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import React from 'react';
import { FloatingLabelInput } from './FloatingLabelInput';

export interface FormInputProps extends IVStackProps {
  label: string;
  editable?: boolean;
  errorMessage?: string;
  inputProps?: IInputProps;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  editable = true,
  errorMessage,
  inputProps,
  ...containerProps
}): React.ReactElement => {
  const labelBgColor = useColorModeValue('#fff', '#1f2937');

  return (
    <VStack {...containerProps}>
      <FloatingLabelInput
        labelColor="#9ca3af"
        labelBGColor={labelBgColor}
        label={label}
        isDisabled={!editable}
        borderRadius="4"
        _text={{
          fontSize: 'sm',
          fontWeight: 'medium',
        }}
        _dark={{
          borderColor: 'coolGray.700',
        }}
        _light={{
          borderColor: 'coolGray.300',
        }}
        {...inputProps}
      />
      {errorMessage && editable && (
        <Box alignSelf="flex-end">
          <Text color="danger.500">{errorMessage}</Text>
        </Box>
      )}
    </VStack>
  );
};
