import { Box } from '@mui/material';
import react, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { PATH_DASHBOARD } from '../../../routes/paths';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import AllSalesReportContent from '../../../sections/report/allSalesReport';
import { getReportData, getReportSummary } from '../../../redux/slices/report';
import { useAuthContext } from '../../../auth/useAuthContext';
import { getBranches } from '../../../redux/slices/branch';

function AllSalesReport() {
  const { user } = useAuthContext();
  const { branches, isLoading, branch } = useSelector((state) => state.branch);
  const { selectedStoreId } = useSelector((state) => state.report);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBranches());
  }, []);

  useEffect(() => {
    console.log(branches?.results);
    if (branches?.results || branches?.id) {
      const storeId = user.storeId ? branch?.id : branches?.results[0]?.id;
      dispatch(getReportSummary(selectedStoreId || storeId));
    }
  }, [branch, branches,selectedStoreId]);

  return (
    <Box>
      <Helmet>
        <title>Restoap-reports</title>
      </Helmet>
      <CustomBreadcrumbs
        iconName="/assets/icons/navbar/salesReport.svg"
        heading="Reports"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.dashboard },
          {
            name: 'Report',
          },
          { name: 'Sales Report' },
          { name: 'All Sales Report' },
        ]}
      />
      <AllSalesReportContent />
    </Box>
  );
}

export default AllSalesReport;
