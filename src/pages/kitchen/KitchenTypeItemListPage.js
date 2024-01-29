import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FieldArray, Form, Formik, FormikProvider, setIn, useFormik } from 'formik';

// @mui
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PATH_DASHBOARD } from '../../routes/paths';

// Redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBranches } from '../../redux/slices/branch';
import {
  getKitchens,
  deleteKitchen,
  kitchenStatus,
  deleteAllKitchenItems,
} from '../../redux/slices/kitchen';

// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import FormProvider, { RHFAutocomplete, RHFTextField } from '../../components/hook-form';
import RoleListTable from '../../sections/roles/rolesList';
import KitchenAddForm from '../../sections/kitchen/KitchenAddForm';
import KitchenListTable from '../../sections/kitchen/KitchensListTable';
import DeletePopUp from '../../components/PopUp/DeletePopUp';
import Iconify from '../../components/iconify/Iconify';
import { StyledAddButton, StyledCancelButton } from '../../theme/overrides/Button';
import KitchenItemListTable from '../../sections/kitchen/KitchenTypeItemList';

// ----------------------------------------------------------------------

export default function KitchenPage() {
  const { themeStretch } = useSettingsContext();
  const stores = [];
  const dispatch = useDispatch();
  const { branches, isLoading } = useSelector((state) => state.branch);
  const { kitchens } = useSelector((state) => state.Kitchen);
  const [selectedStore, setSelectedStore] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editValues, setEditValues] = useState({});
  const [store, setStore] = useState('');
  const [openPopUp, setOpenPopUp] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [kitchenId, setKitchen] = useState({});
  const [selectedValue, setSelectedValue] = useState('move');
  const [deleteResponse, setDeleteResponse] = useState({});
  const [dropdownValue, setDropdownValue] = useState('');
  useEffect(() => {
    const limit = 1000;
    dispatch(getBranches(limit));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getKitchens(store));
  }, [dispatch, store]);
  const handleDelete = async (id, storeId) => {
    setDeleteResponse({});
    const response = await dispatch(deleteKitchen(id, storeId));
    if (response.status === 409) {
      setOpenDeleteModal(true);
    }
  };

  
  const filteredKitchen = kitchens.filter(
    (kitchen) => kitchen.id !== kitchenId.id && kitchen.isActive !== false
  );
  branches?.results?.map((data) => stores.push({ id: data.id, store: data.location }));

  return (
    <>
      <Helmet>
        <title>Restoap</title>
      </Helmet>

      <>
        <CustomBreadcrumbs
          iconName="/assets/icons/navbar/kitchentypeicon.svg"
          heading="Kitchen Type"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.dashboard },
            {
              name: 'Kitchen',
              href: PATH_DASHBOARD.kitchen.kitchenType,
            },
            { name: 'Kitchen Type' },
          ]}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <KitchenItemListTable
              title="Kitchen Type"
              tableLabels={[
                { id: 'checkBox', label: '' },
                { id: 'itemName', label: 'Item Name' },
                { id: 'itemCategory', label: 'Item Category' },
                { id: 'itemCategory', label: 'Veg/Non-Veg' },
              ]}
              setKitchen={setKitchen}
              setEdit={setEdit}
              setEditValues={setEditValues}
              setStore={setStore}
              setOpenPopUp={setOpenPopUp}
              setOpen={setOpen}
              deleteResponse={deleteResponse}
              setDropdownValue={setDropdownValue}
              dropdownValue={dropdownValue}
            />
          </Grid>
        </Grid>
      </>
    </>
  );
}
