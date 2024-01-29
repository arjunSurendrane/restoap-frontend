import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { paramCase } from 'change-case';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Avatar,
  Typography,
  CardContent,
  Stack,
  Link,
  FormControlLabel,
  Switch,
  MenuItem,
  IconButton,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { fDate } from '../../utils/formatTime';
// import { fShortenNumber } from '../../utils/';
// components
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import TextMaxLine from '../../components/text-max-line';
import SvgColor from '../../components/svg-color';
import MenuPopover from '../../components/menu-popover';
import { useDispatch, useSelector } from '../../redux/store';
import { updateBranches, addBranch, deleteBranch } from '../../redux/slices/branch';
import DeletePopUp from '../../components/PopUp/DeletePopUp';
import SuccessPopUp from '../../components/PopUp/SuccessPopUp';
import { SkeletonPostItem } from '../../components/skeleton';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

BranchCard.propTypes = {
  // index: PropTypes.number,
  branches: PropTypes.object,
  openDrawer: PropTypes.func,
  // isEdit: PropTypes.func,
  page: PropTypes.string,
  index: PropTypes.number,
};

export default function BranchCard({ branches, openDrawer, page, index }) {
  const navigate = useNavigate();
  console.log('branches', branches);
  const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'md');
  const [openPopover, setOpenPopover] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openSuccessPopUp, setOpenSuccessPopUp] = useState(false);
  const [activeLoading, setActiveLoading] = useState(false);
  const [loadingBranchId, setLoadingBranchId] = useState('');
  const [checked, setchecked] = useState(branches.isActive);
  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  console.log('loadingBranchId', loadingBranchId);
  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = () => {
    setOpenPopover(null);
  };
  const handleDisable = async (id, status) => {
    const updatedData = {
      storeId: id,
      isActive: status,
    };
    console.log('updatedData', updatedData);
    setLoadingBranchId(id);
    setActiveLoading(true);
    // setchecked(!checked);
    console.log('loadingBranchId', loadingBranchId);
    await updateBranches(updatedData, dispatch, page).then((res) => {
      if (res.status === 200) {
        setchecked(!checked);
      }
    });
    setActiveLoading(false);
    setLoadingBranchId('');
    // console.log(index);
  };

  const handleEdit = () => {
    // openDrawer(true);
    // isEdit(true);
    navigate('/dashboard/branches/edit-store');
    addBranch(branches, dispatch);
  };

  const handleDelete = (branchId) => {
    console.log('handle delte', branchId);
    deleteBranch(branchId, dispatch)
      .then((res) => {
        console.log('res in promis', res);
        if (res.status === 204) {
          console.log('enter in if menu');
          // notifyError('deleted');
          const message = ' Deleted successfully';
          toast.success(message);
        }
        if (res.status === 404) {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log('errorsdjh', err);
      });
  };

  return (
    <>
      <DeletePopUp
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
        setConfirmDelete={handleDelete}
        itemId={branches.id}
        content="Are you sure you want to delete? You can't undo this action."
      />
      <SuccessPopUp openSuccessPopUp={openSuccessPopUp} setOpenSuccessPopUp={setOpenSuccessPopUp} />
      <Card
        sx={{
          borderRadius: '8px',
          border: ' 3px solid #FEE',
          boxShadow: '0px 4px 4px 2px rgba(0, 0, 0, 0.05)',
          minHeight: '310px',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <SvgColor
            src="/assets/shape_avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
              objectFit: 'cover',
            }}
          />
          {/* <Avatar
            alt="my resto"
            src="/assets/images/home/resto.png"
            sx={{
              left: 24,
              zIndex: 9,
              width: 32,
              height: 32,
              bottom: -16,
              position: 'absolute',
              backgroundColor: '#BB3138',
            }}
          /> */}
          <Box
            sx={{
              left: 24,
              zIndex: 9,
              display: 'flex',
              width: 32,
              height: 32,
              bottom: -16,
              position: 'absolute',
              backgroundColor: '#D9D9D9',
              justifyContent: 'center',
              borderRadius: '20px',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              style={{ width: '22px', height: '22px' }}
              src="/assets/images/home/resto.png"
              alt=""
            />
          </Box>
          <IconButton
            sx={{
              color: '#fff',
              position: 'absolute',
              zIndex: 100,

              right: '8px',
              top: '5px',
            }}
            id={`hamburgerIcon${index}`}
          >
            <Iconify icon="eva:more-vertical-fill" onClick={handleOpenPopover} />
          </IconButton>

          <Box sx={{ background: 'radial-gradient(circle, #FFFFFF, #FFA2A0)' }}>
            <Link
              component={RouterLink}
              to={`/dashboard/branches/profile/${branches.id}`}
              color="inherit"
              style={{ textDecoration: 'none' }}
            >
              <img
                alt="cover"
                src={branches.coverImage ? branches.coverImage : '/assets/mainImage.svg'}
                // ratio="21/9"
                loading="lazy" 
                style={{
                  opacity: !checked ? '0.3' : '1',
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  borderRadius: '',
                  minHeight: '200px',
                }}
              />
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            marginTop: '2rem',
            marginRight: '-8px',
          }}
        >
          <FormControlLabel
            id={`store-enable-disable-switch-${index}`}
            control={
              <Switch onClick={() => handleDisable(branches.id, !checked)}  checked={checked} />
            }
            sx={{
              pl: 2,
              // py: 1.5,
              // top: 0,
              // bottom:0,
              // marginRight:'auto',
              // position: {
              //   md: 'absolute',
              // },
            }}
          />
        </Box>

        <BranchCardContent
          title={branches.name.en ? branches.name.en : branches.name}
          location={branches.location}
          id={branches.id}
          // view="3"
          // comment="hi"
          // share="23"
          // createdAt="jan"
        />
        <MenuPopover
          open={openPopover}
          onClose={handleClosePopover}
          arrow="right-top"
          sx={{ width: 160 }}
        >
          <MenuItem
            onClick={() => {
              navigate(`/dashboard/branches/profile/${branches.id}`);
              // onViewRow();
              handleClosePopover();
            }}
          >
            <Iconify icon="eva:eye-fill" />
            View
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleEdit(branches);

              // onEditRow();
              handleClosePopover();
            }}
          >
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>

          {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

          <MenuItem
            onClick={() => {
              setOpenPopUp(true);
              // handleDelete(branches.id);
              handleClosePopover();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" />
            Delete
          </MenuItem>
        </MenuPopover>
      </Card>
    </>
  );
}

// ----------------------------------------------------------------------

BranchCardContent.propTypes = {
  // view: PropTypes.number,
  index: PropTypes.number,
  // share: PropTypes.number,
  title: PropTypes.string,
  id: PropTypes.string,
  location: PropTypes.string,
  // comment: PropTypes.number,
  // createdAt: PropTypes.string,
};

export function BranchCardContent({ title, index, location, id }) {
  const isDesktop = useResponsive('up', 'md');
  const latestPostLarge = index === 0;
  const latestPostSmall = index === 1 || index === 2;

  return (
    <CardContent
      sx={{
        pt: 4.5,
        // width: 1,
        // ...((latestPostLarge || latestPostSmall) && {
        //   pt: 0,
        //   zIndex: 9,
        //   bottom: 0,
        //   position: 'absolute',
        //   color: 'common.white',
        // }),
        marginTop: '-4rem',
      }}
    >
      <Link
        component={RouterLink}
        to={`/dashboard/branches/profile/${id}`}
        color="inherit"
        style={{ textDecoration: 'none' }}
      >
        <Typography
          // variant={isDesktop ?'h5' : 'subtitle2'}
          // line={2}
          // persistent
          sx={{
            color: '#212B36',
            fontFamily: ' Public Sans',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: ' normal',
          }}
        >
          {title.replace(/\b\w/g, (char) => char.toUpperCase())}
        </Typography>
      </Link>
      <Typography
        // variant={isDesktop && latestPostLarge ? 'h5' : 'subtitle2'}
        // line={2}
        sx={{
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          maxHeight: '20px',
          mt: 2,
          color: ' #637381',
          fontFamily: 'Public Sans',
          fontSize: '14px',
          fontStyle: ' normal',
          fontWeight: 400,
          lineHeight: '24px',
        }}
      >
        {location}
      </Typography>
    </CardContent>
  );
}
