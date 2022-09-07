import { Divider } from 'native-base';
import React from 'react';
import { SidebarBody } from './components/SidebarBody';
import { SidebarFooter } from './components/SidebarFooter';
import { SidebarHeader } from './components/SidebarHeader';

export const Sidebar: React.FC = () => {
  return (
    <>
      <SidebarHeader />
      <SidebarBody />
      <Divider _dark={{ bgColor: 'coolGray.700' }} />
      <SidebarFooter />
    </>
  );
};
