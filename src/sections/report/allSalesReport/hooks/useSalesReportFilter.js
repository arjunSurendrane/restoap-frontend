import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findstartAndend } from '../constant';
import { useAuthContext } from '../../../../auth/useAuthContext';
import { downloadReportData } from '../../../../redux/slices/report';

// useSalesReportFilter.js
export function useSalesReportFilter() {
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterEndDate, setFilterEndDate] = useState(null);
  const [filterService, setFilterService] = useState('all');
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [endDate, setEndDate] = useState('');
  const [customDate, setCustomDate] = useState('Today');
  const [search, setSearch] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useAuthContext();
  const { branches, branch, isLoading } = useSelector((state) => state.branch);
  const { selectedStoreId } = useSelector((state) => state.report);

  const dispatch = useDispatch();

  useEffect(() => {
    const { start, endDate: end } = findstartAndend('Today');
    setStartDate(start);
    setEndDate(end);
  }, []);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (data) => {
    setAnchorEl(null);
    if (data === 'clear') {
      setStartDate('');
      setEndDate('');
      setPaymentStatus('');
      setCustomDate('');
      setCurrentPage(1);
      setSearch('');
    } else if (data === 'download') {
      const storeId = user.storeId ? branch?.id : branches?.results[0]?.id;
      dispatch(
        downloadReportData({
          storeId: selectedStoreId || storeId,
          startDate,
          endDate,
          search,
          paymentStatus,
          customDate,
        })
      );
    }
  };

  const handleStartDate = (date) => {
    setCurrentPage(1);
    setStartDate(date?.$d);
  };

  const handleEndDate = (date) => {
    setCurrentPage(1);
    setEndDate(date?.$d);
  };

  const handleSearch = (event) => {
    setCurrentPage(1);
    setSearch(event.target.value);
  };

  const handleSelectPaymentType = (data) => {
    setCurrentPage(1);
    setPaymentStatus(data.target.value);
  };

  const handleCustomDate = (data) => {
    const value = data.target.value === 'None' ? '' : data.target.value;
    setCustomDate(value);
    const { start, endDate: end } = findstartAndend(value);
    setCurrentPage(1);
    setStartDate(start);
    setEndDate(end);
  };

  return {
    filterName,
    setFilterName,
    filterStatus,
    setFilterStatus,
    filterEndDate,
    setFilterEndDate,
    filterService,
    setFilterService,
    filterStartDate,
    setFilterStartDate,
    startDate,
    endDate,
    customDate,
    search,
    paymentStatus,
    handleStartDate,
    handleEndDate,
    handleSearch,
    handleSelectPaymentType,
    handleCustomDate,
    open,
    anchorEl,
    currentPage,
    rowsPerPage,
    setCurrentPage,
    setRowsPerPage,
    handleClick,
    handleClose,
  };
}
