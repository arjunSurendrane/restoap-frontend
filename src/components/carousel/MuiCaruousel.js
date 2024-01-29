import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DefaultImage from '../../assets/images/defaultaddonsImage.svg';

MuiCarousel.propTypes = {
  image: PropTypes.array,
  status: PropTypes.bool,
};

function MuiCarousel({ image, status }) {
  console.log('image in mui', image, status);
  const theme = useTheme();
  // const maxSteps = image.length;

  return (
    <Box
      sx={{
        maxWidth: 400,
        flexGrow: 1,
        zIndex: 999,
      }}
    >
      {/* {image?.map((img, index) => ( */}
      <div>
        <Box
          component="div"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '50%',
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.27) 0%, rgba(217, 217, 217, 0.00) 100%)',
            zIndex: 99,
          }}
        />

        <img
          style={{
            height: 160,
            display: 'block',
            maxWidth: '100%',
            zIndex: -1,
            width: '100%',
            objectFit: 'cover',
            opacity: status ? '' : '0.5',
          }}
          src={image.length > 0 ? image[0]?.name : DefaultImage}
          alt="Descriptive alt text"
        />
      </div>
      {/* ))} */}
    </Box>
  );
}
export default MuiCarousel;
