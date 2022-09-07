import { Path, UseFormSetError } from 'react-hook-form';

interface IFormData {
  [key: string]: any;
}

interface IDataError {
  [key: string]: string | string[];
}

export const setErrors = <T extends IFormData>(
  setError: UseFormSetError<T>,
  dataErrors: IDataError
): void => {
  for (const error in dataErrors) {
    let message: string;
    if (Array.isArray(dataErrors[error])) {
      message = (dataErrors[error] as string[]).join(', ');
    } else {
      message = dataErrors[error] as string;
    }
    setError(error as Path<T>, { type: 'custom', message });
  }
};
