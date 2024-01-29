// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
  Register: '/register',
  EmailVerification: '/email-verification',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  dashboard: path(ROOTS_DASHBOARD, '/dash'),
  branch: path(ROOTS_DASHBOARD, '/branches/list'),
  storeCreate: path(ROOTS_DASHBOARD, '/branches/add-store'),
  branchProfile: path(ROOTS_DASHBOARD, `/branches/profile/:id`),
  pricing: path(ROOTS_DASHBOARD, '/pricing'),
  payment: path(ROOTS_DASHBOARD, '/payment'),
  activeSubscription: path(ROOTS_DASHBOARD, '/activeSubscription'),
  myProfilePage: path(ROOTS_DASHBOARD, '/my-profile'),
  menu: {
    root: path(ROOTS_DASHBOARD, '/menus'),
    menuList: path(ROOTS_DASHBOARD, '/menus/list'),
    menuCreate: path(ROOTS_DASHBOARD, '/menus/create-menu'),
    menuCategory: path(ROOTS_DASHBOARD, '/menus/menu-category'),
    menuAddons: path(ROOTS_DASHBOARD, '/menus/menu-addons'),
    menuEdit: path(ROOTS_DASHBOARD, '/menus/menu-edit'),
  },
  integration: path(ROOTS_DASHBOARD, '/integration'),
  billing: {
    root: path(ROOTS_DASHBOARD, '/billing'),
    invoices: path(ROOTS_DASHBOARD, '/billing/invoices'),
    invoiceDetail: path(ROOTS_DASHBOARD, '/billing/invoices/invoiceDetails'),
    subscriptionPlan: path(ROOTS_DASHBOARD, '/billing/invoices/subscription-plans'),
  },
  kitchen: {
    root: path(ROOTS_DASHBOARD, '/kitchen'),
    kitchenType: path(ROOTS_DASHBOARD, '/kitchen/kitchen-type'),
  },
  role: path(ROOTS_DASHBOARD, '/roles'),
  Permission: path(ROOTS_DASHBOARD, '/permission'),
  order: {
    root: path(ROOTS_DASHBOARD, '/order'),
    waiterLiveOrder: path(ROOTS_DASHBOARD, '/order/order-list/waiter'),
    kitchenLiveOrder: path(ROOTS_DASHBOARD, '/order/order-list/kitchen'),
    liveOrder: path(ROOTS_DASHBOARD, '/order/order-list'),
    cashierLiverOrders: path(ROOTS_DASHBOARD, '/order/order-list/cashier'),
    orderHistory: path(ROOTS_DASHBOARD, '/order/order-history'),
    takeOrder: path(ROOTS_DASHBOARD, '/order/take-order'),
    takeOrderMenu: path(ROOTS_DASHBOARD, '/order/take-order/menu'),
    settlement: path(ROOTS_DASHBOARD, '/order/settlement'),
    previousOrder: path(ROOTS_DASHBOARD, '/order/previous-order'),
    cancelledOrder: path(ROOTS_DASHBOARD, '/order/cancelled-order'),
  },
  report:{
    root:path(ROOTS_DASHBOARD,'/report'),
    allSalesReport: path(ROOTS_DASHBOARD,'/report/all-sales-report')
  },
  // order: path(ROOTS_DASHBOARD, '/orderList'),
  // history: path(ROOTS_DASHBOARD, '/order/history'),
  three: path(ROOTS_DASHBOARD, '/three'),
  addUser: path(ROOTS_DASHBOARD, '/branches/addUser'),
  editUser: path(ROOTS_DASHBOARD, '/branches/editUser'),
  userProfile: path(ROOTS_DASHBOARD, '/branches/userProfile'),
  two: path(ROOTS_DASHBOARD, '/two'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
  },
};
