// @mui
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Container, Grid, Stack, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import MLPrediction from '../../components/MLPrediction'
import TopHolders from '../../components/TopHolders'
import Label from '../../components/Label'
import MutualHolders from '../../components/MutualHolders'
// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,

} from '../../sections/@dashboard/general/app';


// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    gridRow: '1 / span 2',
   height: '100%'

  },
  root2: {
    
    height: '100%',
    paddingBottom: '30px',
    
  }
}));

 

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();
  const theme = createTheme();
  const { themeStretch } = useSettings();

  return (
    <Page title="General: App">
      <Container>
        <Grid container spacing={4} direction="row" className={classes.root2}  >
     
          <Grid item xs={12} md={3} >
        
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
          <Grid item xs={12} md={3}  theme={theme}  >  
           
         <MLPrediction 
         
       className={classes.root}
         title="ML Prediction"
         />   </Grid>      
         
          <Grid item xs={12} md={3} >
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

          <Grid item xs={12} md={3} >
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
<Grid container spacing={2} >
          <Grid item xs={12} md={4} lg={4} minWidth={'470px'}>
            <TopHolders />
          </Grid>

          <Grid item xs={12} md={3} lg={3} >
          <MutualHolders />
          </Grid>

          <Grid item xs={12} lg={3}>
            <TopHolders />
          </Grid>
        

        
      
        </Grid>
      </Container>
    </Page>
  );
}
