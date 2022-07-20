import Layout from '../../layouts';
import { Card, CardMedia, Grid, Typography, Box } from '@mui/material';
import Page from '../../components/Page';
import React from 'react';
import { styled } from '@mui/styles';
import BluechipHolders from './widgets/BluechipHolders';
import BotsIdentified from './widgets/BotsIdentified';
import DiscordMembers from './widgets/DiscordMembers';
import Whales from './widgets/Whales';
import WhitelistSize from './widgets/WhitelistSize';
import TwitterFollowers from './widgets/TwitterFollowers';
import MlPrediction from './widgets/MlPrediction';
import TopHolders from './widgets/TopHolders';
import MutualHolders from './widgets/MutualHolders';
import TargetWallets from './widgets/TargetWallets';

const CardsGrid = styled('div')(() => ({
  display: 'grid',
  gridTemplateAreas: `
  "WhitelistSize TwitterFollowers DiscordMembers MlPrediction"
  "BluechipHolders Whales BotsIdentified MlPrediction"
`,
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gridTemplateRows: '1fr 1fr',
  gap: 24,
  marginBottom: 24,
}));

const BigCardsGrid = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: 24,
}));

const DashboardIndex = () => {
  return (
    <Page title="Dashboard">
      <Typography align="left" variant="h3" mb={'14px'}>
        Dashboard
      </Typography>
      <CardsGrid>
        <BluechipHolders />
        <BotsIdentified />
        <DiscordMembers />
        <Whales />
        <WhitelistSize />
        <TwitterFollowers />
        <MlPrediction />
      </CardsGrid>
      <BigCardsGrid>
        <TopHolders />
        <MutualHolders />
        <TargetWallets />
      </BigCardsGrid>
    </Page>
  );
};

DashboardIndex.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default DashboardIndex;
