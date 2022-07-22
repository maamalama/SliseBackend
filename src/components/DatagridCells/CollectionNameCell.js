import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';
import BluechipIcon from 'src/widgets/img/bluechip.svg';

const CollectionNameCell = ({ value, row }) => {
  return (
    <Stack direction={'row'} gap={0.5} alignItems="center">
      {row.bluechip && <img src={BluechipIcon.src} width={16} height={16} />}
      <Avatar sx={{ width: 32, height: 32, bgcolor: '#DDFF55' }} src={row?.image?.src} />
      <Typography whiteSpace={'break-spaces'} variant="body2">
        {value}
      </Typography>
    </Stack>
  );
};

export default CollectionNameCell;
