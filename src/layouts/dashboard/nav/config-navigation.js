// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';
import { useAuthContext } from '../../../auth/useAuthContext';

// ----------------------------------------------------------------------

// const { user } = useAuthContext();

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon(''),
  analytics: icon('ic_analytics'),
  dashboard: icon('Dash_Vec'),
  branches: icon('branches'),
  billing: icon('billing'),
  orders: icon('Order_Vector'),
  menu: icon('MenuIcon_Vector'),
  role: icon('Role'),
  integration: icon('integration'),
  kitchenType: icon('kitchentypeicon'),
  salesReport: icon('salesReport'),
};


console.log('ICONS.menu', ICONS.menu);
const navConfig = [
  {
    items: [
      {
        title: 'DashBoard',
        path: PATH_DASHBOARD.dashboard,
        icon: ICONS.dashboard,
        permissionKey: 'DASHBOARD_READ',
      },
      {
        title: 'Stores',
        path: PATH_DASHBOARD.branch,
        icon: ICONS.branches,
        permissionKey: 'STORE_CREATE',
      },
      {
        title: 'My Store',
        path: PATH_DASHBOARD.branchProfile,
        icon: ICONS.branches,
        permissionKey: 'MANAGER_ACCESS',
      },

      {
        title: 'Orders',
        path: PATH_DASHBOARD.order.root,
        icon: ICONS.orders,
        permissionKey: 'MANAGE_ORDERS',
        children: [
          // { title: 'Orders', path: PATH_DASHBOARD.order, permissionKey: 'CREATE_NEW_USER' },
          {
            title: 'Take Orders',
            path: PATH_DASHBOARD.order.takeOrder,
            permissionKey: 'MANAGE_TAKE_ORDERS',
          },
          {
            title: 'Live Orders',
            path: PATH_DASHBOARD.order.cashierLiverOrders,
            permissionKey: 'MANAGE_LIVE_ORDERS',
          },
          {
            title: 'Settlement',
            path: PATH_DASHBOARD.order.settlement,
            permissionKey: 'MANAGE_SETTLEMENT_ORDERS',
          },
          {
            title: 'Previous Orders',
            path: PATH_DASHBOARD.order.previousOrder,
            permissionKey: 'MANAGE_PREVIOUS_ORDERS',
          },
          // {
          //   title: 'Cancelled Orders',
          //   path: PATH_DASHBOARD.order.cancelledOrder,
          //   permissionKey: 'MANAGE_CANCELLED_ORDERS',
          // },
          // {
          //   title: 'Live Orders',
          //   path: PATH_DASHBOARD.order.liveOrder,
          //   permissionKey: 'ORDER_READ',
          // },
          // {
          //   title: 'Live Orders',
          //   path: PATH_DASHBOARD.order.liveOrder,
          //   permissionKey: 'ORDER_READ',
          // },
        ],
      },
      {
        title: 'Menu',
        path: PATH_DASHBOARD.menu.root,
        icon: ICONS.menu,
        permissionKey: 'MENU_READ',
        children: [
          // {
          //   title: 'Addons',
          //   path: PATH_DASHBOARD.menu.menuAddons,
          //   permissionKey: 'MENU_READ',
          // },
          {
            title: 'Menu Category',
            path: PATH_DASHBOARD.menu.menuCategory,
            permissionKey: 'MENU_READ',
          },
          {
            title: 'Menu List',
            path: PATH_DASHBOARD.menu.menuList,
            permissionKey: 'MENU_READ',
          },
          {
            title: 'Create Menu',
            path: PATH_DASHBOARD.menu.menuCreate,
            permissionKey: 'MENU_CREATE',
          },
        ],
      },
      {
        title: 'Roles',
        path: PATH_DASHBOARD.role,
        icon: ICONS.role,
        permissionKey: 'USER_CREATE',
      },
      {
        title: 'Sales Report',
        path: PATH_DASHBOARD.report.root,
        icon: ICONS.salesReport,
        permissionKey: 'DASHBOARD_READ',
        children: [
          {
            title: 'All Sales Report',
            path: PATH_DASHBOARD.report.allSalesReport,
            permissionKey: 'DASHBOARD_READ',
          },
        ],
      },
      {
        title: 'Billing',
        icon: ICONS.billing,
        path: PATH_DASHBOARD.billing.root,
        permissionKey: 'GRANT_PERMISSION',
        children: [
          {
            title: 'Invoices',
            path: PATH_DASHBOARD.billing.invoices,
            permissionKey: 'GRANT_PERMISSION',
          },
          {
            title: 'Subscription Plans',
            path: PATH_DASHBOARD.billing.subscriptionPlan,
            permissionKey: 'GRANT_PERMISSION',
          },
        ],
      },
      {
        title: 'Integration',
        path: PATH_DASHBOARD.integration,
        icon: ICONS.integration,
        permissionKey: 'SETTINGS_READ',
      },
      {
        title: 'Kitchen',
        path: PATH_DASHBOARD.kitchen.root,
        icon: ICONS.kitchenType,
        permissionKey: 'KITCHEN_READ',
        children: [
          {
            title: 'Kitchen Type',
            path: PATH_DASHBOARD.kitchen.kitchenType,
            permissionKey: 'KITCHEN_READ',
          },
        ],
      },
    ],
  },
];

export default navConfig;
