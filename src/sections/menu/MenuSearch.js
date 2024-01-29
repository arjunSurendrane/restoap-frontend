/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Typography, Autocomplete, InputAdornment } from '@mui/material';
// utils
// import axios from '../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { useDispatch, useSelector } from '../../redux/store';
import { getMenus } from '../../redux/slices/menu';
// components
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import { CustomTextField } from '../../components/custom-input';
import SearchNotFound from '../../components/search-not-found';

// ----------------------------------------------------------------------

MenuSearch.propTypes = {
  search: PropTypes.func,
};
export default function MenuSearch({ search }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { menus } = useSelector((state) => state.menu);
  console.log('menus in serach', menus);
  const [searchMenu, setSearchMenu] = useState('');

  const searchResults = [];

  // menus.map((data)=>searchResults.push({name:data.categoryName}))

  const handleChangeSearch = async (value) => {
    try {
      console.log('search value', value);
      search(value);
      setSearchMenu(value);
      // if (value) {
      //   const searchValue = value;
      //   dispatch(getMenus(value));
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGotoMenu = (name) => {
    navigate(PATH_DASHBOARD.eCommerce.view(paramCase(name)));
  };

  // const handleKeyUp = (event) => {
  //   if (event.key === 'Enter') {
  //     handleGotoMenu(searchMenu);
  //   }
  // };
  const handleBlur = (e) => {
    console.log({ searchMenu });
    setSearchMenu(searchMenu);
    search(searchMenu);
    if (e.target !== this && searchMenu) {
      e.preventDefault();
    }
  };

  return (
    <Autocomplete
      size="small"
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      onInputChange={(event, value) => handleChangeSearch(value)}
      options={searchResults}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          width={220}
          placeholder="Search here..."
          // onKeyUp={handleKeyUp}
          InputProps={{
            // ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
    // <Autocomplete
    //   size="small"
    //   autoHighlight
    //   popupIcon={null}
    //   // eslint-disable-next-line react/jsx-boolean-value
    //   keepfocus="true"
    //   onBlur={handleBlur}
    //   options={searchResults}
    //   onInputChange={(event, value) => handleChangeSearch(value)}
    //   // getOptionLabel={(product) => product.name}
    //   // noOptionsText={<SearchNotFound query={searchMenu} />}
    //   // isOptionEqualToValue={(option, value) => option.id === value.id}
    //   componentsProps={{
    //     popper: {
    //       sx: {
    //         width: `280px !important`,
    //       },
    //     },
    //     paper: {
    //       sx: {
    //         '& .MuiAutocomplete-option': {
    //           px: `8px !important`,
    //         },
    //       },
    //     },
    //   }}
    //   renderInput={(params) => (
    //     <CustomTextField
    //       {...params}
    //       width={220}
    //       placeholder="Search here..."
    //       // onKeyUp={handleKeyUp}
    //       InputProps={{
    //         // ...params.InputProps,
    //         startAdornment: (
    //           <InputAdornment position="start">
    //             <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
    //           </InputAdornment>
    //         ),
    //       }}
    //     />
    //   )}
    // renderOption={(props, product, { inputValue }) => {
    //   const { name, cover } = product;
    //   const matches = match(name, inputValue);
    //   const parts = parse(name, matches);

    //   return (
    //     <li {...props}>
    //       <Image
    //         alt={cover}
    //         src={cover}
    //         sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }}
    //       />

    //       <Link underline="none" onClick={() => handleGotoMenu(name)}>
    //         {parts.map((part, index) => (
    //           <Typography
    //             key={index}
    //             component="span"
    //             variant="subtitle2"
    //             color={part.highlight ? 'primary' : 'textPrimary'}
    //           >
    //             {part.text}
    //           </Typography>
    //         ))}
    //       </Link>
    //     </li>
    //   );
    // }}
    // />
  );
}
