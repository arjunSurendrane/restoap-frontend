import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-easy-crop';
import { Slider, Button, Typography, styled, Box } from '@mui/material';
import getCroppedImg from './Cropping';
import { StyledAddButton, StyledCancelButton } from '../../../theme/overrides/Button';

const CropContainer = styled(Box)(({ theme, color }) => ({
  position: 'relative',
  width: '100%',
  height: 200,
  background: '#333',
  [theme.breakpoints.up('sm')]: {
    height: 400,
  },
}));

const Controls = styled(Box)(({ theme, color }) => ({
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
}));

const SliderContainer = styled(Box)(({ theme, color }) => ({
  display: 'flex',
  flex: '1',
  gap: 10,
  alignItems: 'center',
}));

const SliderLabel = styled(Typography)(({ theme, color }) => ({
  [theme.breakpoints.down('xs')]: {
    minWidth: 65,
  },
}));

const CustomSlider = styled(Slider)(({ theme, color }) => ({
  [theme.breakpoints.down('xs')]: {
    minWidth: 65,
  },
}));

// eslint-disable-next-line react/prop-types
export const ImageCrop = ({ classes, image, setCropImage, setOpenModal, setImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // eslint-disable-next-line no-shadow
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      // eslint-disable-next-line no-shadow
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
      setCroppedImage(croppedImage);
      setCropImage(croppedImage);
      setOpenModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  const onClose = () => {
    setCroppedImage(null);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <CropContainer>
        <Cropper
          image={image}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </CropContainer>
      <Controls>
        <SliderContainer>
          <SliderLabel variant="overline">Zoom</SliderLabel>
          <CustomSlider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            // eslint-disable-next-line no-shadow
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel variant="overline">Rotation</SliderLabel>
          <CustomSlider
            value={rotation}
            min={0}
            max={360}
            step={1}
            aria-labelledby="Rotation"
            // eslint-disable-next-line no-shadow
            onChange={(e, rotation) => setRotation(rotation)}
          />
          {/* </div> */}
        </SliderContainer>
        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
          <StyledCancelButton
            onClick={() => {
              setOpenModal(false);
              setCroppedImage(null);
              setImage(null);
            }}
            variant="contained"
            color="primary"
          >
            Cancel
          </StyledCancelButton>
          <StyledAddButton onClick={showCroppedImage} variant="contained" color="primary">
            Crop Image
          </StyledAddButton>
        </Box>
      </Controls>
    </Box>
  );
};
