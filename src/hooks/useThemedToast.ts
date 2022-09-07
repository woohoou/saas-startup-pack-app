import { useContrastText, useToast } from 'native-base';
import { InterfaceToastProps } from 'native-base/lib/typescript/components/composites/Toast';

export interface useThemedToastResult {
  show: (props: InterfaceToastProps) => void;
  info: (props: InterfaceToastProps) => void;
  warning: (props: InterfaceToastProps) => void;
  error: (props: InterfaceToastProps) => void;
}

export const useThemedToast = () => {
  const toast = useToast();

  const warningColor = 'yellow.500';
  const warningTextColor = useContrastText(warningColor);

  const dangerColor = 'red.500';
  const dangerTextColor = useContrastText(dangerColor);

  const show = (props: InterfaceToastProps) => {
    toast.show({ ...props });
  };

  const info = (props: InterfaceToastProps) => {
    toast.show({ ...props });
  };

  const warning = (props: InterfaceToastProps) => {
    toast.show({ ...props, color: warningTextColor, bgColor: warningColor });
  };

  const error = (props: InterfaceToastProps) => {
    toast.show({ ...props, color: dangerTextColor, bgColor: dangerColor });
  };

  return { show, info, warning, error };
};
