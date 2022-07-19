// @mui
import {useTheme} from '@mui/material/styles';
import {Card, CardMedia, Container, Grid, Typography} from '@mui/material';
import Icon from '@material-ui/core/Icon';
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

function NoteIcon() {
  return (<Icon>
    <img src={Note}/>
  </Icon>)

}


// ----------------------------------------------------------------------

export default function GeneralApp() {
  const {user} = useAuth();
  const theme = useTheme();
  const {themeStretch} = useSettings();
  const isMountedRef = useIsMountedRef();
  const [statistics, setStatistics] = useState(null);

  const getWhitelistStatistics = useCallback(async () => {
    const whitelistId = window.localStorage.getItem('whitelistId');
    if (whitelistId) {
      const response = await axios.get(`https://daoanalytics.herokuapp.com/api/analytics/getWhitelistStatistics?id=${whitelistId}`);
      window.localStorage.setItem('whitelistSize', response.data.data.whitelistSize);
      setStatistics(response.data.data);
      if (isMountedRef.current) {

      }
    } else {
      const response = await axios.get(`https://daoanalytics.herokuapp.com/api/analytics/FgetWhitelistStatistics?id=afd7626f-388e-4f98-9f36-123d54688936`);
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
        <Grid container spacing={4} direction="row"
              alignItems="stretch" sx={{paddingBottom: '30px', height: '100%'}}>

          <Grid item xs={12} md={3}>
            {statistics === null || statistics.whitelistSize === null ?
              <AppWidgetSummary
                icon={Note}
                title="Whitelist Size"
                percent={2.6}
                total={null}
                chartColor={theme.palette.primary.main}
                chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
              />

              :
              <AppWidgetSummary
                icon=''
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
          <Grid item xs={6} md={3}>
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
          <Grid item xs={12} md={4} lg={4} sx={{height: '362px'}}>
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
          <Grid item xs={12} md={4} lg={4}>

            <Card sx={{
              justifyContent: 'center',
              p: 3,
              backgroundColor: '#131F0F',
              fontFamily: 'Public Sans',
              height: '100%'
            }}>

              <Typography color="white" textAlign="left" variant="h3">4,887</Typography>
              <Typography color="#FFFFFF" textAlign="left" variant="subtitle2" sx={{opacity: '0.72'}}>Target Wallets
                identified</Typography>

              <CardMedia
                sx={{marginTop: '20px'}}
                component="img"
                height="220px"
                image='https://i.ibb.co/k1GH2YF/Type-ML-dashboard.png'
                alt="Wallet Chart"
              >
              </CardMedia>
            </Card>

          </Grid>


        </Grid>
      </Container>
    </Page>
  );
}
