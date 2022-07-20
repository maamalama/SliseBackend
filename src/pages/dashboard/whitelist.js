import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import Page from 'src/components/Page';
import Layout from 'src/layouts';
import CirclePercentageCard from './widgets/CirclePercentageCard';
import BluechipBg from './widgets/img/bluechipBg.svg';
import BotBg from './widgets/img/botBg.svg';
import WhaleBg from './widgets/img/whaleBg.svg';

const Cards = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 24,
  '& > *': {
    minHeight: 0,
    minWidth: 0,
  },
  marginBottom: 24,
}));

const Whitelist = () => {
  return (
    <Page
      sx={{
        height: 'calc(100vh - 60px)',
        display: 'grid',
        gridTemplateRows: 'min-content min-content min-content 1fr',
      }}
      title="Whitelist"
    >
      <Typography align="left" variant="h3" mb={'14px'}>
        Whitelist
      </Typography>
      <Cards>
        <CirclePercentageCard percent={0.01} count={55} title="Blue Chip Holders" bg={BluechipBg.src} />
        <CirclePercentageCard percent={0.004} count={20} title="Whales" bg={WhaleBg.src} />
        <CirclePercentageCard percent={0.128} count={671} title="Bots" bg={BotBg.src} />
      </Cards>
    </Page>
  );
};

Whitelist.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Whitelist;
