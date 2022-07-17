// @mui
import {useTheme} from '@mui/material/styles';
import {Container, Grid} from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import MLPrediction from '../../components/MLPrediction'
import TopHolders from '../../components/TopHolders'
import MutualHolders from '../../components/MutualHolders'
// sections
import {AppWidgetSummary,} from '../../sections/@dashboard/general/app';
import useIsMountedRef from "../../hooks/useIsMountedRef";
import axios from '../../utils/axios';
import {useCallback, useEffect} from 'react';

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const {user} = useAuth();
  const theme = useTheme();
  const {themeStretch} = useSettings();
  const isMountedRef = useIsMountedRef();

  const getWhitelistStatistics = useCallback(async () => {
    const whitelistId = window.localStorage.getItem('whitelistId');
    console.log(whitelistId);
    if (whitelistId !== 'undefined') {
      const response = await axios.get(`getWhitelistStatistics?id=${whitelistId}`);
      console.log(response.data.data);
      if (isMountedRef.current) {

      }
    }


  }, [isMountedRef]);

  useEffect(() => {
    getWhitelistStatistics();
  }, [getWhitelistStatistics]);


  return (
    <Page title="General: App">
      <Container>
        <Grid container spacing={4} direction="row" sx={{paddingBottom: '30px'}}>

          <Grid item xs={12} md={3}>

            <AppWidgetSummary
              icon='majesticons:paper-fold-text-line'
              title="Whitelist Size"
              percent={2.6}
              total={18765}
              chartColor={theme.palette.primary.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              title="Twitter Followers"
              icon="logos:twitter"
              percent={0.2}
              total={4876}//
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              icon="logos:discord-icon"
              title="Discord Members"
              percent={-0.1}
              total={678}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>
          <Grid item xs={12} md={3} sx={{gridRow: 'span 2'}}>
            <MLPrediction
              title="ML Prediction"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              icon="emojione:blue-circle"
              title="Bluechip Holders"
              percent={2.6}
              total={18765}
              chartColor={theme.palette.primary.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              icon="fxemoji:whale"
              title="Whales"
              percent={0.2}
              total={4876}
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <AppWidgetSummary
              icon="noto:robot"
              title="Bots identified"
              percent={-0.1}
              total={678}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <TopHolders/>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <MutualHolders/>
          </Grid>

          <Grid item xs={12} lg={4}>
            <TopHolders/>
          </Grid>


        </Grid>
      </Container>
    </Page>
  );
}
