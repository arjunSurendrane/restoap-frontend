import React from 'react';
import PropTypes from 'prop-types';
import OrderDrawerContent from './OrderDrawerContent';
import ItemDetailTable from './ItemDetailTable';
import OrderDrawerBillDetails from './OrderDrawerBillDetails';

const FinalOrderBill = ({ data }) => (
  <>
    <OrderDrawerContent data={data} />
    <ItemDetailTable data={data} />
    <OrderDrawerBillDetails data={data} />
  </>
);
FinalOrderBill.propTypes = {
  data: PropTypes.object,
};

export default FinalOrderBill;
