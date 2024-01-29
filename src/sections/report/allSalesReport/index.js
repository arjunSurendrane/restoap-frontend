import { useDispatch, useSelector } from 'react-redux';
import { Box, MenuItem, TextField } from '@mui/material';
import OrderSummary from './OrderSummary';
import FilteredSalesReport from './FilteredSalesReport';
import { setSelectedStoreId } from '../../../redux/slices/report';

function AllSalesReportContent() {
  const { branches, isLoading, branch } = useSelector((state) => state.branch);
  const dispatch = useDispatch();
  const handleSelectedStore = (data) => {
    dispatch(setSelectedStoreId(data.target.value));
  };
  return (
    <div>
      {branches?.results?.length ? (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right', my: 2 }}>
          <TextField
            fullWidth
            select
            label="Branches"
            // value={paymentStatus || branches?.results[0]?.name}
            onChange={handleSelectedStore}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: { maxHeight: 220 },
                },
              },
            }}
            sx={{
              maxWidth: { md: 160 },
              minWidth: 150,
              textTransform: 'capitalize',
              backgroundColor: 'white',
            }}
            size="small"
          >
            {branches?.results?.map((option) => (
              <MenuItem
                key={option.name}
                value={option.id}
                sx={{
                  mx: 1,
                  borderRadius: 0.75,
                  typography: 'body2',
                  textTransform: 'capitalize',
                }}
              >
                {option.name},{option.location}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      ) : (
        ''
      )}
      <OrderSummary />
      <FilteredSalesReport />
    </div>
  );
}

export default AllSalesReportContent;
