import Layout from '../../layouts';
import { Card, CardMedia, Grid, Typography, Box, CircularProgress } from '@mui/material';
import Page from '../../components/Page';
import React, { useCallback, useEffect, useState } from 'react';
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
import axiosInstance from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

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
  const isMountedRef = useIsMountedRef();
  const [statistics, setStatistics] = useState(null);

  const getWhitelistStatistics = useCallback(async () => {
    const whitelistId = window.localStorage.getItem('whitelistId');
    if (whitelistId) {
      const response = await axiosInstance.get(
        `https://daoanalytics.herokuapp.com/api/analytics/getWhitelistStatistics?id=${whitelistId}`
      );
      window.localStorage.setItem('whitelistSize', response.data.data.whitelistSize);
      setStatistics(response.data.data);
    } else {
      const response = await axios.get(
        `https://daoanalytics.herokuapp.com/api/analytics/getWhitelistStatistics?id=afd7626f-388e-4f98-9f36-123d54688936`
      );
      window.localStorage.setItem('whitelistSize', response.data.data.whitelistSize);
      setStatistics(response.data.data);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getWhitelistStatistics();
  }, [getWhitelistStatistics]);

  if (!statistics) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  return (
    <Page sx={{ height: '100%', display: 'grid', gridTemplateRows: 'max-content max-content 1fr' }} title="Dashboard">
      <Typography align="left" variant="h3" mb={'14px'}>
        Dashboard
      </Typography>
      <CardsGrid>
        <BluechipHolders value={statistics?.bluechipHolders ?? 0} />
        <BotsIdentified value={statistics?.bots ?? 0} />
        <DiscordMembers value={statistics?.discordInfo?.approximateMemberCount ?? 0} />
        <Whales value={statistics?.whales ?? 0} />
        <WhitelistSize value={statistics?.whitelistSize ?? 0} />
        <TwitterFollowers value={statistics?.twitterFollowersCount ?? 0} />
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
