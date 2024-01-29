/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import QRCode from 'qrcode';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';

// @mui
import {
  Tooltip,
  Checkbox,
  TableRow,
  TableCell,
  Popover,
  Box,
  Typography,
  Modal,
} from '@mui/material';
import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import SvgColor from 'src/components/svg-color/SvgColor';
import { styled } from 'styled-components';
import iconify from '../../components/iconify';
import { useDispatch, useSelector } from '../../redux/store';
import { deleteTable } from '../../redux/slices/table';
import TableModal from '../branch/table/table';
import ConfirmTableDelete from '../branch/table/confirmDelete';
import { CUSTOMER_APP_URL } from '../../config-global';
import DeletePopUp from '../../components/PopUp/DeletePopUp';
import MenuPopover from '../../components/menu-popover/MenuPopover';
import HasPermission from '../../auth/RightGuard';
import { StyledActionsBox } from '../../theme/overrides/Button';

// ----------------------------------------------------------------------

TableRows.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  diningCategories: PropTypes.any,
  storeId: PropTypes.string,
};

export default function TableRows({
  row,
  diningCategories,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  storeId,
}) {
  const { name, dineCategory, avatarUrl, company, role, isVerified, status, active } = row;
  const [qrcodeUrl, setQrcodeUrl] = useState('');
  const [openTableModal, setOpenTableModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editTable, setEditTable] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const handleOpenTableModal = () => {
    setOpenTableModal(true);
    setEditTable(true);
  };
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleCloseTableModal = () => {
    setOpenTableModal(false);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredRowDelete, setHoveredRowDelete] = useState(false);
  const [tName, setTName] = useState('');
  const [catId, setCatId] = useState('');
  const [edit, setEdit] = useState(false);
  console.log('storeId', storeId);
  const handleMouseEnter = () => {
    setHoveredRow(true);
  };

  const handleMouseLeave = () => {
    setHoveredRow(false);
  };
  const handleMouseEnterDelete = () => {
    setHoveredRowDelete(true);
  };

  const handleMouseLeaveDelete = () => {
    setHoveredRowDelete(false);
  };

  const handleEditClick = (tableName, categoryName) => {
    console.log('EDIT CLICK OF TABLES', tableName, categoryName);
    setTName(tableName);
    setCatId(categoryName);
    setEdit(true);
    handleOpenTableModal();
  };

  const tableId = row.id;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const generateQrCode = async (e) => {
    const text = `${CUSTOMER_APP_URL}/?store=${storeId}&&table=${tableId}`;
    const qrUrl = await QRCode.toDataURL(text);
    setQrcodeUrl(qrUrl);
  };

  useEffect(() => {
    generateQrCode();
  }, [generateQrCode]);

  const saveFile = () => {
    saveAs(qrcodeUrl, './image.jpg');
    console.log((qrcodeUrl, './image.jpg'));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const confirmDelete = async (Id) => {
    try {
      console.log('TABLE ID FROM DELETE', tableId);
      const res = await dispatch(deleteTable(Id, row.storeId));
      console.log("res ashdjkhsdj",res)
      if (`${res.status}`.startsWith('4')) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log('Error is', error.response.data.message);
      // setErr(error.response.data.message);
      // setLoad(false);
    }
    // setLoad(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#F4F4F4;',
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#E6E6E6;',
    },
    // // hide last border  #E6E6E6;
    // '&:last-child td, &:last-child th': {
    //   border: 0,
    // },
  }));
  return (
    <>
      <StyledTableRow>
        <TableCell sx={{ borderRight: '2px solid white' }} align="left">
          {name.replace(/\b\w/g, (char) => char.toUpperCase())}
        </TableCell>
        <TableCell
          align="left"
          sx={{ textTransform: 'capitalize', borderRight: '2px solid white' }}
        >
          {dineCategory?.name}
        </TableCell>
        <TableCell
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            width: '100%',
            borderRight: '2px solid white',
          }}
        >
          {/* {active && ( */}
          <>
          <HasPermission permissionKey="DINING_UPDATE">
            <Tooltip title="Edit">
              <StyledActionsBox
                onClick={() => {
                  handleEditClick(name, dineCategory?.id);
                  handleOpenTableModal();
                }}
                sx={{
                  mx: 1,
                  backgroundColor: '#FEB700',
                }}
              >
                <SvgColor
                  sx={{ mx: 1, width: '16px', height: '16px', color: 'white' }}
                  src="/assets/icons/branch/edit.svg"
                  alt=""
                />
              </StyledActionsBox>
            </Tooltip>
            </HasPermission>
            <HasPermission permissionKey="DINING_DELETE">
            <Tooltip title="Delete">
              <StyledActionsBox
                onClick={() => handleOpenDeleteModal()}
                sx={{
                  mx: 1,
                  backgroundColor: 'red',
                }}
              >
                <SvgColor
                  src="/assets/icons/branch/Delete_Icon.svg"
                  alt=""
                  sx={{ color: 'white', width: '16px', height: '16px' }}
                />
              </StyledActionsBox>
            </Tooltip>
            </HasPermission>
            <Tooltip title="Download">
              <StyledActionsBox
                onClick={saveFile}
                sx={{
                  mx: 1,
                  backgroundColor: '#1699D7',
                }}
              >
                <SvgColor
                  src="/assets/icons/branch/Download.svg"
                  alt=""
                  sx={{ color: 'white', width: '16px', height: '16px' }}
                />
              </StyledActionsBox>
            </Tooltip>
            <HasPermission permissionKey="DINING_READ">
            <Tooltip title="View">
              <StyledActionsBox
                onClick={handleClick}
                sx={{
                  mx: 1,
                  backgroundColor: '#3D3D3D',
                }}
              >
                <SvgColor
                  src="/assets/icons/branch/QrSvg.svg"
                  alt=""
                  sx={{ color: 'white', width: '16px', height: '16px' }}
                />
              </StyledActionsBox>
            </Tooltip>
            </HasPermission>
          </>
          {/* )} */}
        </TableCell>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              // width: isDesktop ? 600 : 300,
              // height: isDesktop ? 150 : 200,
              bgcolor: 'background.paper',
              overflow: 'hidden',
              boxShadow: 24,
              borderRadius: '8px',
            }}
          >
            <img src={qrcodeUrl} height={200} width={200} alt="aas" />
          </Box>
        </Modal>
      </StyledTableRow>

      <TableModal
        open={openTableModal}
        setOpenTableModal={setOpenTableModal}
        setEditTable={setEditTable}
        onClose={handleCloseTableModal}
        diningCategories={diningCategories}
        tName={tName}
        catId={catId}
        editTable={editTable}
        tableId={row.id}
      />
      <DeletePopUp
        openPopUp={openDeleteModal}
        setOpenPopUp={setOpenDeleteModal}
        setConfirmDelete={confirmDelete}
        itemId={row.id}
        content="Are you sure you want to delete? You can't undo this action."
      />
    </>
  );
}
