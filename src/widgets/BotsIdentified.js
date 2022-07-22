import { styled } from '@mui/system';
import React from 'react';
import { Stack, Typography } from '@mui/material';
import { formatNumber } from './utils';
import Icon from './img/bots.svg';

const Root = styled('div')(() => ({
  gridArea: 'BotsIdentified',

  background: '#FFFFFF',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: 16,
  padding: 12,
}));

const BotsIdentified = ({ value }) => {
  return (
    <Root>
      <Stack direction="column" alignItems="center">
        <img {...Icon} />
        <Typography variant="subtitle2">Bots identified</Typography>
        <Typography variant="h3">{formatNumber(value)}</Typography>
      </Stack>
    </Root>
  );
};

export default BotsIdentified;
