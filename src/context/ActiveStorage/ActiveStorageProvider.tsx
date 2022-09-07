import React, { createContext } from 'react';
import { ContextType, Props } from './ActiveStorateProvider.types';

const defaultContext = {
  host: 'http://localhost:3000',
  mountPath: '/rails/active_storage',
  headers: {},
};

export const ActiveStorageProvider: React.FC<Props> = ({ host, mountPath, headers, children }) => (
  <Provider
    value={{ host, mountPath, directUploadsUrl: `${host}${mountPath}/direct_uploads`, headers }}>
    {children}
  </Provider>
);

export const Context = createContext<ContextType>(defaultContext);
export const { Consumer, Provider } = Context;
