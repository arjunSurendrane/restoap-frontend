import React from 'react';
import { Grid, Skeleton } from '@mui/material';

const SkeltonForInvoiceTable = () => (
  <div style={{ padding: 3 }}>
    <div style={{ padding: 1 }}>
      <Skeleton variant="rectangular" width="100%" height={70} />
    </div>
    <div style={{ padding: 1 }}>
      <Skeleton variant="rectangular" width="100%" height={70} />
    </div>
    <div style={{ padding: 1 }}>
      <Skeleton variant="rectangular" width="100%" height={70} />
    </div>
    <div style={{ padding: 1 }}>
      <Skeleton variant="rectangular" width="100%" height={70} />
    </div>
  </div>
);

export default SkeltonForInvoiceTable;
