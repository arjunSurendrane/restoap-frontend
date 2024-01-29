import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  Stack,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// utils
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { fToNow } from '../../../utils/formatTime';
// _mock_
import { _notifications } from '../../../_mock/arrays';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import MenuPopover from '../../../components/menu-popover';
import { IconButtonAnimate } from '../../../components/animate';
import { dispatch } from '../../../redux/store';
import { removeNotification } from '../../../redux/slices/notification';
import { useAuthContext } from '../../../auth/useAuthContext';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const [openPopover, setOpenPopover] = useState(null);

  const { notifications, unreadMessage } = useSelector((state) => state.notifications);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <IconButtonAnimate
        color={openPopover ? 'primary' : 'default'}
        onClick={handleOpenPopover}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={unreadMessage} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 360, p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {unreadMessage} unread messages
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          {unreadMessage ? (
            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  New
                </ListSubheader>
              }
            >
              {notifications.slice(0, unreadMessage).map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  handleClosePopover={handleClosePopover}
                  unread
                />
              ))}
            </List>
          ) : (
            ''
          )}
          {unreadMessage < notifications.length ? (
            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  Previous
                </ListSubheader>
              }
            >
              {notifications.slice(unreadMessage, notifications.length).map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  handleClosePopover={handleClosePopover}
                />
              ))}
            </List>
          ) : (
            ''
          )}
        </Scrollbar>
        <Divider sx={{ borderStyle: 'dashed' }} />
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    storeId: PropTypes.string,
    message: PropTypes.string,
    orderId: PropTypes.string,
    suborderId: PropTypes.string,
  }),
  handleClosePopover: PropTypes.func,
  unread: PropTypes.bool,
};

function NotificationItem({ notification, handleClosePopover, unread }) {
  const { message, orderId,suborderId } = notification;
  const { avatar } = renderContent(notification);
  const { user } = useAuthContext();

  const isCashiers = user?.roles[0]?.name === 'cashier';

  // eslint-disable-next-line no-shadow
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('order notification');
    return () => dispatch(removeNotification());
  }, [dispatch]);

  const handleOnclick = () => {
    handleClosePopover();


    return navigate('/dashboard/order/order-list/cashier', { state: { orderId:suborderId } });
  };

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(unread && { bgcolor: 'action.selected' }),
      }}
      onClick={handleOnclick}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText disableTypography primary={message} />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  return {
    avatar: <img alt={notification.title} src="/assets/icons/notification/ic_package.svg" />,
  };
}
