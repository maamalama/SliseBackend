import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import {styled, useTheme} from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  CardHeader,
  IconButton,
  TableContainer,
} from '@mui/material';
// utils
import { fCurrency } from '../utils/formatNumber';
// _mock_
import { _appInvoices } from '../_mock';
// components
import Label from '../components/Label';
import Iconify from '../components/Iconify';
import Scrollbar from '../components/Scrollbar';
import MenuPopover from '../components/MenuPopover';
import PropTypes from 'prop-types';
import AppWidgetSummary from '../sections/@dashboard/general/app/AppWidgetSummary';

// ----------------------------------------------------------------------

TopHolders.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
};

export default function TopHolders({data}) {
  const theme = useTheme();

  if(!data){
    return <></>
  }

  return (
    <Card sx={{height:'357px'}}>
      <CardHeader title="Top Holders"  sx={{paddingBottom:'10px'}}/>
      <TableContainer>
        <Table size="small">
          <TableRow >
            <TableCell><Typography align='center' variant="subtitle2">Wallet</Typography></TableCell>
            <TableCell><Typography variant="subtitle2">NFTS</Typography></TableCell>
            <TableCell><Typography variant="subtitle2">Portfolio</Typography></TableCell>
            <TableCell><Typography variant="subtitle2">Label</Typography></TableCell>

          </TableRow>

          <TableBody >
            {Array.from(data).map((row) => (
              <TableRow key={row.address}>
                <TableCell> <Box sx={{ display: 'flex' }}> {row.whale === true ? <IconStyle icon={'fxemoji:whale'} /> : <></>} <a href={`https://etherscan.io/address/${row.address}`}>{row.address.substring(0,6)}</a></Box></TableCell>
                <TableCell>{row.nfts}</TableCell>
                <TableCell>{fCurrency(row.totalBalanceUsd)}</TableCell>


                <TableCell>
                  <Label
                    color={
                      (row.label === 'mixed' && 'warning') ||
                      (row.label === 'out_of_date' && 'error') ||
                      'success'
                    }
                  >
                    {sentenceCase(row.label)}
                  </Label>
                </TableCell>
                {/* <TableCell align="right">
                    <MoreMenuButton />
                  </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>




      {/* <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          View All
        </Button>
      </Box> */}
    </Card>
  );
}

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  textAlign:'left',
  height: 20,
  marginRight: '7px'
}));

// ----------------------------------------------------------------------

function MoreMenuButton() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton size="large" onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:download-fill'} sx={{ ...ICON }} />
          Download
        </MenuItem>

        <MenuItem>
          <Iconify icon={'eva:printer-fill'} sx={{ ...ICON }} />
          Print
        </MenuItem>

        <MenuItem>
          <Iconify icon={'eva:share-fill'} sx={{ ...ICON }} />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}