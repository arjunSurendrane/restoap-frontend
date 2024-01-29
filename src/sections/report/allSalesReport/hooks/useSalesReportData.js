import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '../../../../auth/useAuthContext';
import { getReportData } from '../../../../redux/slices/report';

export function useSalesReportData(
  startDate,
  endDate,
  search,
  paymentStatus,
  customDate,
  currentPage,
  rowsPerPage
) {
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const { branches, branch, isLoading } = useSelector((state) => state.branch);
  const { selectedStoreId } = useSelector((state) => state.report);

  useEffect(() => {
    if (branches?.results || branches?.id) {
      const storeId = user.storeId ? branch?.id : branches?.results[0]?.id;
      dispatch(
        getReportData({
          storeId: selectedStoreId || storeId,
          page: currentPage,
          limit: rowsPerPage,
          startDate,
          endDate,
          search,
          paymentStatus,
          customDate,
        })
      );
    }
  }, [
    branch,
    currentPage,
    branches,
    rowsPerPage,
    paymentStatus,
    search,
    selectedStoreId,
    customDate,
  ]);

  return {
    branches,
    branch,
    user,
    isLoading,
    selectedStoreId,
  };
}
