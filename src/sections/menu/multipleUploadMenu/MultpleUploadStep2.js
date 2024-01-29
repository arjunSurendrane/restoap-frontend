import { Box, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { read, utils } from 'xlsx';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import FormProvider, {
  RHFAutocomplete,
  RHFUpload,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form';
import Iconify from '../../../components/iconify/Iconify';
import { SingleFilePreview } from '../../../components/upload';

MultipleUploadStep2.propTypes = {
  setMenuData: PropTypes.func,
  storeId: PropTypes.string,
  menuData: PropTypes.string,
};
function MultipleUploadStep2({ setMenuData, storeId, menuData }) {
  const [fileData, setFileData] = useState(null);

  console.log('storeId in excel upload', storeId);

  const headingData = [
    'Name',
    'Food-Category(Veg/Non-Veg)',
    'Short-Description',
    'Description',
    'Price',
    'Featured(Yes/No)',
    'Preparation-Time',
    'TaxInclude(Yes/No)',
    'Category',
    'KitchenType',
  ];
  const onDelete = () => {
    setMenuData([]);
  };

  const isHeadingsEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      toast.error('No Permission to modify fields length');
      return false;
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        toast.error('No Permission to modify headings');
        return false;
      }
    }
    return true;
  };

  // eslint-disable-next-line consistent-return
  const checkEmptyFields = (jsonData) => {
    console.log('jsondata in check', jsonData);
    if (jsonData.length < 2) {
      toast.error('File not to be empty');
      return true;
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < jsonData.length; i++) {
      console.log('eeeeeeeeeee', jsonData[1]);
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < jsonData[0].length; j++) {
        console.log('working');
        const value = jsonData[i][j];
        console.log('value in excel filed', value);
        if (!value) {
          toast.error('Fields not to be empty');
          return true;
        }

        switch (j) {
          case 0:
            if (typeof value !== 'string') {
              toast.error('Name Must be in String Format');
              return true;
            }
            break;
          case 1:
            if (typeof value !== 'string') {
              const categoryOptions = ['Veg', 'Non-Veg'];
              if (!categoryOptions.includes(value)) {
                toast.error('Category only include Veg/Non-Veg');
                return true;
              }
              return true;
            }
            break;
          case 2:
            if (typeof value !== 'string') {
              toast.error('ShortDescription Must be in String Format');
              return true;
            }
            if (value.trim().length > 100) {
              console.log('true in case3');
              toast.error('Short Description must be at most 100 characters');
              return true;
            }
            break;
          case 3:
            break;
          case 4:
            if (!/^[0-9]+$/.test(value)) {
              console.log('true in case4');
              toast.error(typeof value);
              toast.error('Price must be number');
              return true;
            }

            break;
          case 5:
            if (typeof value !== 'string') {
              const categoryOptions = ['Yes', 'No'];
              if (!categoryOptions.includes(value)) {
                toast.error('featured only include Yes/No');
                return true;
              }
            }
            break;
          case 6:
            if (!/^[0-9]+$/.test(value)) {
              toast.error('Preparation time must be in number');
              return true;
              // Handle the error as needed
            }
            // eslint-disable-next-line no-case-declarations
            const preparationTimeInMinutes = parseInt(value, 10);
            if (!(preparationTimeInMinutes >= 0 && preparationTimeInMinutes <= 60)) {
              toast.error('Preparation Time must be between 0 and 60 minutes');
              return true;
            }

            break;

          case 7:
            if (typeof value !== 'string') {
              const categoryOptions = ['Yes', 'No'];
              if (!categoryOptions.includes(value)) {
                toast.error('taxInclude only include Yes/No');
                return true;
              }
              return true;
            }
            break;
          case 8:
            if (typeof value !== 'string') {
              toast.error('Category Must be in String Format');
              return true;
            }
            break;
          case 9:
            break;
          default:
            return false;
          // break;
        }
      }
    }
  };

  // eslint-disable-next-line consistent-return
  const handleDrop = (file) => {
    setMenuData([]);
    console.log('excel');
    console.log('excelData', file[0]);
    setFileData(file);
    if (!file) {
      toast.error('No File chosen');
      return false;
    }
    if (file) {
      const fileName = file[0].name.toLowerCase();
      if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
        // File is of the allowed type (Excel)
        // Handle the file or store it in the state
        console.log('Selected file:', file[0]);
      } else {
        // File is not of the allowed type
        toast.error('Please choose format like this .xls/.xlsx');
      }
    }

    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file[0]);
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
        const headingEqual = isHeadingsEqual(jsonData[0], headingData);
        if (headingEqual) {
          const isEmptyField = checkEmptyFields(jsonData);

          if (!isEmptyField) {
            const header = [
              'name',
              'foodCategory',
              'shortDescription',
              'description',
              'price',
              'featured',
              'preparationTime',
              'taxInclude',
              'categoryName',
              'kitchen',
            ];
            const objectsArray = [];
            // eslint-disable-next-line no-plusplus
            for (let i = 1; i < jsonData.length; i++) {
              const currentArray = jsonData[i];
              const currentObject = {};

              // eslint-disable-next-line no-plusplus
              for (let j = 0; j < header.length; j++) {
                currentObject[header[j]] = currentArray[j];
                currentObject.storeId = [storeId];
              }
              objectsArray.push(currentObject);
            }
            setMenuData(objectsArray);
          }
        }
      };
    } catch (err) {
      console.log(err);
    }
  };

  const defaultValues = {
    file: null,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    // handleChange,
    formState: { isSubmitting },
  } = methods;
  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit}>
        <RHFUpload
          name="file"
          onDrop={handleDrop}
          onUpload={(e) => console.log('ON UPLOAD', e.target)}
        />
      </FormProvider>
      {menuData.length > 0 && (
        <Box
          sx={{
            width: '44px',
            height: '60px',
            marginTop: '20px',
            marginBottom: '20px',
            position: 'relative',
          }}
        >
          <IconButton
            size="small"
            onClick={onDelete}
            sx={{
              top: 6,
              right: 6,
              zIndex: 9,
              position: 'absolute',
              color: '#fff',
              bgcolor: '#565656',
              '&:hover': {
                bgcolor: 'black',
              },
            }}
          >
            <Iconify icon="eva:close-fill" width={18} />
          </IconButton>
          <img
            alt="file preview"
            src="/assets/images/Menu/excelimg.svg"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              borderRadius: '8px',
            }}
          />
          {/* <SingleFilePreview file={menuData} /> */}
        </Box>
      )}
    </Box>
  );
}

export default MultipleUploadStep2;
