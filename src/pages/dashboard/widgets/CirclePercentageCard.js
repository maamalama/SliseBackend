import { NoSsr, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import ReactApexChart from 'src/components/chart';

const Root = styled('div')((props) => ({
  padding: 24,
  background: '#fff',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: '16px',
  backgroundImage: `url(${props.bgImage})`,
  backgroundPosition: 'right center',
  backgroundRepeat: 'no-repeat',
  overflow: 'hidden',
}));
const ChartWrapper = styled('div')(() => ({
  width: 60,
  height: 60,
}));

const CirclePercentageCard = ({ count, title, bg = '', percent }) => {
  return (
    <Root bgImage={bg}>
      <Stack direction={'row'} gap={12}>
        <ChartWrapper>
          <NoSsr defer>
            <ReactApexChart
              type="radialBar"
              height={60}
              width={60}
              series={[percent * 100]}
              options={{
                chart: { height: 60, width: 60, type: 'radialBar' },
                plotOptions: {
                  radialBar: {
                    hollow: {
                      size: '180px',
                      background: 'red',
                    },
                  },
                },
                labels: [''],
              }}
            />
          </NoSsr>
        </ChartWrapper>
        <div>
          <Typography variant="h4">{count}</Typography>
          <Typography variant="subtitle2">{title}</Typography>
        </div>
      </Stack>
    </Root>
  );
};

export default CirclePercentageCard;
