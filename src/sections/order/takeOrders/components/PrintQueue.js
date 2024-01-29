import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import KOTPrint from './KOTPrint';

const PrintQueue = (items) =>  (
    <div>
      <div>
        <KOTPrint {...items} />
      </div>
    </div>
  )

export default PrintQueue;
