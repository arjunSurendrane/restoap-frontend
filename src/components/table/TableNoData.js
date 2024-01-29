import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell } from '@mui/material';
//
import EmptyContent from '../empty-content';

// ----------------------------------------------------------------------

TableNoData.propTypes = {
  isNotFound: PropTypes.bool,
  text: PropTypes.string,
  description: PropTypes.string,
};

export default function TableNoData({ isNotFound, text, description }) {
  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <EmptyContent
            title="No Data"
            text={text}
            description={description}
            sx={{
              '& span.MuiBox-root': { height: 160 },
              p:0,
            }}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
