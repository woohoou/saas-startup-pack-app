import { Box, Spinner } from 'native-base';
import React from 'react';

export const Loading = () => {
  return (
    <Box w="full" h="full" alignItems="center" justifyContent="center">
      <Spinner />
    </Box>
  );
};
