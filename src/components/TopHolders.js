import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
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
    <Card>
      <CardHeader title="Top Holders"  />
      <TableContainer >
        <Table size="small">
          <TableRow >
            <TableCell>Wallet</TableCell>
            <TableCell>NFTS</TableCell>
            <TableCell>Portfolio</TableCell>
            <TableCell>Label</TableCell>

          </TableRow>

          <TableBody >
            {Array.from(data).map((row) => (
              <TableRow key={row.address}>
                <TableCell><a href={`https://etherscan.io/address/${row.address}`}>{row.address.substring(0,6)}</a></TableCell>
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