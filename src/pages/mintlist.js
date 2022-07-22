import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import Page from 'src/components/Page';
import Layout from 'src/layouts';
import CirclePercentageCard from 'src/widgets/CirclePercentageCard';
import BluechipBg from 'src/widgets/img/bluechipBg.svg';
import BotBg from 'src/widgets/img/botBg.svg';
import WhaleBg from 'src/widgets/img/whaleBg.svg';
import SwitchCard from 'src/widgets/SwitchCard';

import Datagrid from 'src/components/Datagrid';
import AddressCell from 'src/components/DatagridCells/AddressCell';
import AvgNtfPrice from 'src/components/DatagridCells/AvgNtfPrice';
import HoldingTimeCell from 'src/components/DatagridCells/HoldingTimeCell';
import NftStackCell from 'src/components/DatagridCells/NftStackCell';
import { formatNumber } from 'src/widgets/utils';
import nft1 from 'src/assets/nft1.svg';
import nft2 from 'src/assets/nft2.svg';
import nft3 from 'src/assets/nft3.svg';

const Cards = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 24,
  '& > *': {
    minHeight: 0,
    minWidth: 0,
  },
  marginBottom: 24,
}));
const SwitchCards = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 24,
  '& > *': {
    minHeight: 0,
    minWidth: 0,
  },
  marginBottom: 24,
}));
const TableCard = styled('div')(() => ({
  background: '#fff',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: '16px',
  overflow: 'hidden',
}));

const _mintList = [...Array(36)].map((_, index) => ({
  id: Math.floor(Math.random() * 1000).toString(16),
  address: `0x${Math.floor(Math.random() * 1_000_000_000_000)
    .toString(16)
    .slice(0, 32)}`,
  whale: [true, false][Math.floor(Math.random() * 2)],
  bluechipHolder: [true, false][Math.floor(Math.random() * 2)],
  holdings: [nft1, nft2, nft3, nft1, nft2, nft3, nft1, nft2, nft3],
  nfts: Math.floor(Math.random() * 1000),
  avgNftPrice: Math.floor(Math.random() * 1000),
  maxNftPrice: 1000,
  balance: 500_000 + Math.floor(Math.random() * 10_000_000),
  portfolio: 500_000 + Math.floor(Math.random() * 10_000_000),
  holdingTime: ['mixed', 'flipper', 'holder'][Math.floor(Math.random() * 3)],
  tradingVolume: 500_000 + Math.floor(Math.random() * 10_000_000),
}));

const columns = [
  {
    field: 'address',
    headerName: 'Wallet',
    // width: 92,
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    renderCell: AddressCell,
  },
  {
    field: 'holdings',
    headerName: 'What they hold',
    // width: 120,
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    renderCell: NftStackCell,
  },
  {
    field: 'nfts',
    headerName: 'NFTs',
    // width: 35,
    flex: 1,
    align: 'right',
    headerAlign: 'right',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    valueFormatter: ({ value }) => formatNumber(value),
  },
  {
    field: 'avgNftPrice',
    headerName: 'Avg. NFT Price',
    // width: 128,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    renderCell: AvgNtfPrice,
  },
  {
    field: 'balance',
    headerName: 'Balance',
    // width: 54,
    flex: 1,
    align: 'right',
    headerAlign: 'right',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    valueFormatter: ({ value }) => `$${formatNumber(value)}`,
  },
  {
    field: 'portfolio',
    headerName: 'Portfolio',
    // width: 58,
    flex: 1,
    align: 'right',
    headerAlign: 'right',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    valueFormatter: ({ value }) => `$${formatNumber(value)}`,
  },
  {
    field: 'holdingTime',
    headerName: 'Holding Time',
    // width: 88,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    renderCell: HoldingTimeCell,
  },
  {
    field: 'tradingVolume',
    headerName: 'Trading Volume',
    // width: 104,
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    valueFormatter: ({ value }) => `$${formatNumber(value)}`,
  },
];

const MintList = () => {
  const [mlWallets, setMlWallets] = useState(false);
  const [botsFilter, setBotsFilter] = useState(true);
  const toggleMlWallets = () => setMlWallets((s) => !s);
  const toggleBotsFilter = () => setBotsFilter((s) => !s);

  return (
    <Page
      sx={{
        display: 'grid',
        gridTemplateRows: 'min-content min-content min-content 1fr',
      }}
      title="Mint List"
    >
      <Typography align="left" variant="h3" mb={'14px'}>
        Mint List
      </Typography>
      <Cards>
        <CirclePercentageCard percent={0.01} count={55} title="Blue Chip Holders" bg={BluechipBg.src} />
        <CirclePercentageCard percent={0.004} count={20} title="Whales" bg={WhaleBg.src} />
        <CirclePercentageCard percent={0.128} count={671} title="Bots" bg={BotBg.src} />
      </Cards>
      <SwitchCards>
        <SwitchCard
          title="Add data from connected wallets found by our ML"
          value={mlWallets}
          onChange={toggleMlWallets}
        />
        <SwitchCard title="Filter out wallets identified as bots" value={botsFilter} onChange={toggleBotsFilter} />
      </SwitchCards>
      <TableCard>
        <Datagrid columns={columns} rows={_mintList} />
      </TableCard>
    </Page>
  );
};

MintList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default MintList;
