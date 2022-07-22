import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import Page from 'src/components/Page';
import Layout from 'src/layouts';

import Datagrid from 'src/components/Datagrid';
import CollectionNameCell from 'src/components/DatagridCells/CollectionNameCell';
import MutualHoldersCell from 'src/components/DatagridCells/MutualHoldersCell';
import { formatNumber } from 'src/widgets/utils';
import nft1 from 'src/assets/nft1.svg';
import nft2 from 'src/assets/nft2.svg';
import nft3 from 'src/assets/nft3.svg';
import MutualHoldersCard from 'src/widgets/MutualHoldersCard';

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

const TableCard = styled('div')(() => ({
  background: '#fff',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
  borderRadius: '16px',
  overflow: 'hidden',
}));

const _mutualHolders = [...Array(36)].map((_, index) => ({
  id: Math.floor(Math.random() * 1000).toString(16),
  bluechip: [true, false][Math.floor(Math.random() * 2)],
  image: [nft1, nft2, nft3][Math.floor(Math.random() * 3)],
  name: [
    'Bored Ape Yacht Club',
    'CryptoPunks',
    'MeeBits',
    'Doodles',
    'Moonbirds',
    'Azuki',
    'Cool Cats NFT',
    'Nouns',
    'World of Women',
  ][Math.floor(Math.random() * 9)],
  mutualHolders: Math.floor(Math.random() * 1_000),
  maxMutualHolders: 1_000,
  totalHolders: Math.floor(Math.random() * 10_000),
  supply: Math.floor(Math.random() * 10_000),
  floorPrice: (Math.random() * 100).toFixed(2),
  mintPrice: (Math.random() * 100).toFixed(2),
  twitterFollowers: Math.floor(Math.random() * 1_000_000),
}));

const columns = [
  {
    field: 'name',
    headerName: 'Collection',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    renderCell: CollectionNameCell,
  },
  {
    field: 'mutualHolders',
    headerName: 'Mutual Holders',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    renderCell: MutualHoldersCell,
  },
  {
    field: 'totalHolders',
    headerName: 'Total Holders',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    valueFormatter: ({ value }) => formatNumber(value),
  },
  {
    field: 'supply',
    headerName: 'Supply',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    valueFormatter: ({ value }) => formatNumber(value),
  },
  {
    field: 'floorPrice',
    headerName: 'Floor Price',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    valueFormatter: ({ value }) => `Ξ ${value}`,
  },
  {
    field: 'mintPrice',
    headerName: 'Mint Price',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    valueFormatter: ({ value }) => `Ξ ${value}`,
  },
  {
    field: 'twitterFollowers',
    headerName: 'Twitter Followers',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    disableReorder: true,
    valueFormatter: ({ value }) => formatNumber(value),
  },
];

const MutualHolders = () => {
  return (
    <Page
      sx={{
        height: 'calc(100vh - 60px)',
        display: 'grid',
        gridTemplateRows: 'min-content min-content 1fr',
      }}
      title="Mutual Holders"
    >
      <Typography align="left" variant="h3" mb={'14px'}>
        Mutual Holders
      </Typography>
      <Cards>
        <MutualHoldersCard image={nft3} title="Bored Ape Yacht Club" value={412} />
        <MutualHoldersCard image={nft1} title="CryptoPunks" value={234} />
        <MutualHoldersCard image={nft2} title="MeeBits" value={221} />
      </Cards>
      <TableCard>
        <Datagrid columns={columns} rows={_mutualHolders} />
      </TableCard>
    </Page>
  );
};

MutualHolders.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default MutualHolders;
