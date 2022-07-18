import PropTypes from 'prop-types';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography, Stack, Slider } from '@mui/material';
// utils
import { fNumber, fPercent } from '../utils/formatNumber';
// components
import Iconify from '../components/Iconify';
import ReactApexChart from '../components/chart';
import Label from '../components/Label'
import { useState } from "react";

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 15,
  height: 15,
  
}));
// ----------------------------------------------------------------------

MLPrediction.propTypes = { 
  title: PropTypes.string.isRequired,
//   mintPrice: PropTypes.number.isRequired,
//   collectionSize: PropTypes.number.isRequired,
//   probabilityOfSoldOut: PropTypes.number.isRequired,
//   total: PropTypes.number.isRequired,
//   icon: PropTypes.string.isRequired,
};

export default function MLPrediction({title}) {
    const [price, setMintPrice] = useState(0.01)
    const [collectionSize, setCollectionSize] = useState(0)
    function handlePriceChange(event, newNumber) {
        setMintPrice(newNumber);
      }
      function handleCollectionChange(event, newNumber) {
        setCollectionSize(newNumber);
      }
  const theme = useTheme();

//   const chartOptions = {
//     colors: [chartColor],
//     chart: { sparkline: { enabled: true } },
//     plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
//     tooltip: {
//       x: { show: false },
//       y: {
//         formatter: (seriesName) => fNumber(seriesName),
//         title: {
//           formatter: () => '',
//         },
//       },
//       marker: { show: false },
//     },
//   };

  return (
    <Card sx={{  justifyContent:'center', p: 3, backgroundColor: '#DDFF55', fontFamily:'Public Sans', height: '100%', gridRow:'span 2' }} >
      <Box  >
        <Typography textAlign="left" variant="subtitle1">{title}</Typography>
        <Typography textAlign="left" variant="subtitle2">MINT PRICE</Typography>
        <Typography textAlign='left'variant="subtitle1">
        <IconStyle icon="codicon:three-bars" />{price}
      </Typography>
        <Slider
        value={price}
        min={.01}
        step={.01}
        max={10}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
        color="#131F0F"
      />
          <Typography textAlign="left" variant="subtitle2">COLLECTION SIZE</Typography>
          <Typography textAlign='left'variant="subtitle1">{collectionSize}</Typography>
          <Slider
        value={collectionSize}
        min={100}
        step={100}
        max={20000}
        onChange={handleCollectionChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
           <Typography textAlign="center" variant="subtitle2">PROBABILITY OF SOLD OUT</Typography>
           <Stack direction='row' spacing={2}  justifyContent="center"alignItems="center">
           <Typography textAlign="center" variant="h4">86%</Typography>
            <Label variant="outlined" >High</Label>
            </Stack>
        {/* <Typography textAlign="center" variant="h3">{fNumber(total)}</Typography> */}
      </Box>

      {/*<ReactApexChart type="bar" series={[{ data: chartData }]} options={chartOptions} width={60} height={36} />*/}
    </Card>
  );
}