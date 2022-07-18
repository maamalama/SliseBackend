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
import {useCallback, useEffect, useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';

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
  const [statistics, setStatistics] = useState(null);

  const getWhitelistStatistics = useCallback(async () => {
    const whitelistId = window.localStorage.getItem('whitelistId');
    if (whitelistId !== 'undefined') {
      const response = await axios.get(`getWhitelistStatistics?id=${whitelistId}`);
      console.log(response.data.data);
      setStatistics(response.data.data);
      if (isMountedRef.current) {

      }
    }
    else{
      const response = await axios.get(`getWhitelistStatistics?id=9c755944-d9f1-4ac3-9ea1-84d9648de6e8`);
      console.log(response.data.data);
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
        style={{minHeight: '60vh'}}
      >

        <Grid item xs={3}>
          <CircularProgress/>
        </Grid>

      </Grid>
    );
  }

  return (
    <Page title="General: App">
      <Container>
        <Grid container spacing={4} direction="row" sx={{paddingBottom: '30px'}}>

          <Grid item xs={12} md={3}>
            {statistics === null || statistics.whitelistSize === null ?
              <AppWidgetSummary
                icon='majesticons:paper-fold-text-line'
                title="Whitelist Size"
                percent={2.6}
                total={null}
                chartColor={theme.palette.primary.main}
                chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
              />

              :
              <AppWidgetSummary
                icon='majesticons:paper-fold-text-line'
                title="Whitelist Size"
                percent={2.6}
                total={statistics.whitelistSize}
                chartColor={theme.palette.primary.main}
                chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
              />
            }
          </Grid>
          <Grid item xs={12} md={3}>
            {statistics === null || statistics.twitterFollowersCount === null ?
              <AppWidgetSummary
                title="Twitter Followers"
                icon="logos:twitter"
                percent={0.2}
                total={null}//
                chartColor={theme.palette.chart.blue[0]}
                chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
              />

              :
              <AppWidgetSummary
                title="Twitter Followers"
                icon="logos:twitter"
                percent={0.2}
                total={statistics.twitterFollowersCount}//
                chartColor={theme.palette.chart.blue[0]}
                chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
              />
            }
          </Grid>

          <Grid item xs={12} md={3}>
            {statistics === null || statistics.discordInfo === null ?
              <AppWidgetSummary
                icon="logos:discord-icon"
                title="Discord Members"
                percent={-0.1}
                total={null}
                chartColor={theme.palette.chart.red[0]}
                chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
              />

              :
              <AppWidgetSummary
                icon="logos:discord-icon"
                title="Discord Members"
                percent={-0.1}
                total={statistics.discordInfo.approximateMemberCount}
                chartColor={theme.palette.chart.red[0]}
                chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
              />
            }
          </Grid>
          <Grid item xs={12} md={3} sx={{gridRow: 'span 2'}}>
            <MLPrediction
              title="ML Prediction"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            {statistics === null || statistics.bluechipHolders === null ?
              <AppWidgetSummary
                icon="emojione:blue-circle"
                title="Bluechip Holders"
                percent={2.6}
                total={null}
                chartColor={theme.palette.primary.main}
                chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
              />

              :
              <AppWidgetSummary
                icon="emojione:blue-circle"
                title="Bluechip Holders"
                percent={2.6}
                total={statistics.bluechipHolders}
                chartColor={theme.palette.primary.main}
                chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
              />
            }
          </Grid>

          <Grid item xs={12} md={3}>
            {statistics === null || statistics.whales === null ?
              <AppWidgetSummary
                icon="fxemoji:whale"
                title="Whales"
                percent={0.2}
                total={null}
                chartColor={theme.palette.chart.blue[0]}
                chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
              />

              :
              <AppWidgetSummary
                icon="fxemoji:whale"
                title="Whales"
                percent={0.2}
                total={statistics.whales}
                chartColor={theme.palette.chart.blue[0]}
                chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
              />
            }

          </Grid>

          <Grid item xs={12} md={3}>
            {statistics === null || statistics.bots === null ?
              <AppWidgetSummary
                icon="noto:robot"
                title="Bots identified"
                percent={-0.1}
                total={null}
                chartColor={theme.palette.chart.red[0]}
                chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
              />

              :
              <AppWidgetSummary
                icon="noto:robot"
                title="Bots identified"
                percent={-0.1}
                total={statistics.bots}
                chartColor={theme.palette.chart.red[0]}
                chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
              />
            }
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            {statistics === null || statistics.topHolders === null ?
              <></>

              :
              <TopHolders data={statistics.topHolders}/>
            }

          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            {statistics === null || statistics.mutualHoldings === null ?
              <></>

              :
              <MutualHolders data={statistics.mutualHoldings}/>
            }
          </Grid>


        </Grid>
      </Container>
    </Page>
  );
}
