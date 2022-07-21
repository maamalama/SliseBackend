import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import Page from 'src/components/Page';
import Layout from 'src/layouts';
import CirclePercentageCard from 'src/widgets/CirclePercentageCard';
import BluechipBg from 'src/widgets/img/bluechipBg.svg';
import BotBg from 'src/widgets/img/botBg.svg';
import WhaleBg from 'src/widgets/img/whaleBg.svg';
import SwitchCard from 'src/widgets/SwitchCard';

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
const SwitchCards = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 24,
  '& > *': {
    minHeight: 0,
    minWidth: 0,
  },
  marginBottom: 24,
}));

const MintList = () => {
  const [mlWallets, setMlWallets] = useState(false);
  const [botsFilter, setBotsFilter] = useState(true);
  const toggleMlWallets = () => setMlWallets((s) => !s);
  const toggleBotsFilter = () => setBotsFilter((s) => !s);

  return (
    <Page
      sx={{
        height: 'calc(100vh - 60px)',
        display: 'grid',
        gridTemplateRows: 'min-content min-content min-content 1fr',
      }}
      title="Mint List"
    >
      <Typography align="left" variant="h3" mb={'14px'}>
        Mint List
      </Typography>
      <Cards>
        <CirclePercentageCard percent={0.01} count={55} title="Blue Chip Holders" bg={BluechipBg.src} />
        <CirclePercentageCard percent={0.004} count={20} title="Whales" bg={WhaleBg.src} />
        <CirclePercentageCard percent={0.128} count={671} title="Bots" bg={BotBg.src} />
      </Cards>
      <SwitchCards>
        <SwitchCard
          title="Add data from connected wallets found by our ML"
          value={mlWallets}
          onChange={toggleMlWallets}
        />
        <SwitchCard title="Filter out wallets identified as bots" value={botsFilter} onChange={toggleBotsFilter} />
      </SwitchCards>
    </Page>
  );
};

MintList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default MintList;
