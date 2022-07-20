import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const Root = styled('div')(() => ({
  background: '#fff',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: 16,
  padding: 16,
  color: '#182415',
}));

const MutualHolders = () => {
  return (
    <Root>
      <Typography variant="h6" align="left" mb="13px">
        Mutual Holders
      </Typography>
    </Root>
  );
};

export default MutualHolders;
