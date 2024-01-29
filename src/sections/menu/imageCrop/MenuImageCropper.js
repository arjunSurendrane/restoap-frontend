/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-easy-crop';
import { Slider, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// import ImgDialog from './ImgDialog'
import getCroppedImg from './Cropping';
import { styles } from './style';

const CropContainer = styled(Box)(({ theme, Width }) => ({
  position: 'relative',
  width: '100%',
  height: 200,
  background: '#333',
  [theme.breakpoints.up('sm')]: {
    height: 400,
  },
}));

const Controls = styled(Box)(({ theme, Width }) => ({
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

const SliderContainer = styled(Box)(({ theme, Width }) => ({
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

const CropButton = styled(Box)(({ theme, Width }) => ({
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

const dogImg =
  'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000';

// eslint-disable-next-line react/prop-types
export const ImageCrop = ({ classes }) => {
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
      const croppedImage = await getCroppedImg(dogImg, croppedAreaPixels, rotation);
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const onClose = () => {
    setCroppedImage(null);
  };

  return (
    <div>
      <CropContainer>
        <Cropper
          image={dogImg}
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
        {/* <div className={classes.sliderContainer}> */}
        <SliderContainer>
          <Typography variant="overline">Zoom</Typography>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            //   classes={{ root: classes.slider }}
            // eslint-disable-next-line no-shadow
            onChange={(e, zoom) => setZoom(zoom)}
          />
          <SliderContainer>
            <Typography variant="overline">Rotation</Typography>
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              // eslint-disable-next-line no-shadow
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </SliderContainer>
          <SliderContainer>
            <CropButton>
              <Button onClick={showCroppedImage} variant="contained" color="primary">
                Show Result
              </Button>
            </CropButton>
          </SliderContainer>
        </SliderContainer>
      </Controls>
    </div>
  );
};
