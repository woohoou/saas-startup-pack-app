import { Box, Hidden, ScrollView, VStack } from 'native-base';
import React from 'react';

import { SlideMenu } from '../../features/home/navigation/SlideMenu';
import { MainContent } from './components/MainContent';

export type DashboardLayoutProps = {
  scrollable?: boolean;
  displayScreenTitle?: boolean;
  displaySidebar?: boolean;
  displayBackButton?: boolean;
  showIcons?: boolean;
  displaySearchButton?: boolean;
  displayNotificationButton?: boolean;
  displayMenuButton?: boolean;
  displayAlternateMobileHeader?: boolean;
  maxWidth?: number;
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  showGroupInfoHeader?: boolean;
  displayBackIcon?: boolean;
  rightPanelMobileHeader?: boolean;
};

export function DashboardLayout({
  displayScreenTitle = true,
  displaySidebar = true,
  maxWidth,
  ...props
}: DashboardLayoutProps) {
  return (
    <VStack flex={1} _light={{ bg: 'primary.50' }} _dark={{ bg: 'customGray' }}>
      <Box
        flex={1}
        safeAreaBottom
        flexDirection={{ base: 'column', md: 'row' }}
        _light={{
          borderTopColor: 'coolGray.200',
        }}
        _dark={{
          bg: 'coolGray.700',
          borderTopColor: 'coolGray.700',
        }}>
        {displaySidebar && <SlideMenu />}

        {/* Web */}
        <Hidden till="md">
          <ScrollView
            flex={1}
            p={{ md: 8 }}
            contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>
            <MainContent {...props} displayScreenTitle={displayScreenTitle} maxWidth={maxWidth} />
          </ScrollView>
        </Hidden>

        {/* Mobile */}
        <Hidden from="md">
          <MainContent {...props} displayScreenTitle={displayScreenTitle} />
        </Hidden>
      </Box>
    </VStack>
  );
}
