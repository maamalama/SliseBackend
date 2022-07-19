import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  Card,
  Avatar,
  CardHeader,
  LinearProgress,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableCell, TableBody
} from '@mui/material';
// utils
import {fCurrency, fNumber, fShortenNumber} from '../utils/formatNumber';
// _mock_
import { _appAuthors } from '../_mock';
// components
import Iconify from '../components/Iconify';
import TopHolders from './TopHolders';
import Label from './Label';
import {sentenceCase} from 'change-case';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
}));

// ----------------------------------------------------------------------
TopHolders.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
};
export default function MutualHolders({data}) {
  const displayAuthor = orderBy(_appAuthors, ['favourite'], ['desc']);
  if(!data){
    return <></>
  }
  return (
    <Card sx={{height:'357px'}}>
      <CardHeader title="Mutual Holders" sx={{paddingBottom:'10px'}}/>
      <TableContainer >
        <Table size="small">
      

          <TableBody >
            {Array.from(data).map((row) => (
              <TableRow key={row.address}>
               <TableCell size='small' > <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ width: 24, height: 24 }} alt='avatar name' src='https://i.ibb.co/WFD2Kj6/IMG.png' />
                <Typography>{row.name}</Typography></Stack></TableCell>
                {/* <TableCell><a href={`https://etherscan.io/address/${row.address}`}>{row.address.substring(0,6)}</a></TableCell> */}
  
<TableCell><Box sx={{width:'100%'}}><LinearProgress variant="determinate" value={1} color='primary'></LinearProgress></Box></TableCell>
                {/* <TableCell>{fNumber(row.holdings)}</TableCell> */}
                {/* <TableCell align="right">
                    <MoreMenuButton />
                  </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  
    </Card>
  );
}

// ----------------------------------------------------------------------

AuthorItem.propTypes = {
  author: PropTypes.shape({
    avatar: PropTypes.string,
    favourite: PropTypes.number,
    name: PropTypes.string,
  }),
  index: PropTypes.number,
};

function AuthorItem({ author, index }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={author.name} src={author.avatar} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{author.name}</Typography>
       
    
      
      </Box>

      
      
     
    </Stack>
  );
}
