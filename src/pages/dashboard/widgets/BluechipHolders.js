import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import Icon from './img/bluechip.svg';
import { formatNumber } from './utils';

const Root = styled('div')(() => ({
  gridArea: 'BluechipHolders',

  background: '#FFFFFF',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: 16,
  padding: 16,
}));

const BluechipHolders = () => {
  return (
    <Root>
      <Stack direction="column" alignItems="center">
        <img {...Icon} />
        <Typography variant="subtitle2" mb={1} mt={0.5}>
          Bluechip Holders
        </Typography>
        <Typography variant="h3">{formatNumber(66)}</Typography>
      </Stack>
    </Root>
  );
};

export default BluechipHolders;
