import { Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const InitialLogin = Loadable(lazy(() => import('../pages/auth/InitialLoginPage')));
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
export const EmailVerification = Loadable(lazy(() => import('../pages/auth/EmailVerification')));
export const ResetPassword = Loadable(lazy(() => import('../sections/auth/ResetPassword')));
export const DashBoardPage = Loadable(lazy(() => import('../pages/dashboard/dashboardPage')));
export const MyProfilePage = Loadable(lazy(() => import('../pages/myProfile/MyProfilePage')));
export const BranchPage = Loadable(lazy(() => import('../pages/branch/BranchesPage')));
export const StoreAddPage = Loadable(lazy(() => import('../pages/branch/StoreAddPage')));
export const StoreEditPage = Loadable(lazy(() => import('../pages/branch/StoreEditPage')));
// eslint-disable-next-line import/no-cycle
export const BranchProfilePage = Loadable(lazy(() => import('../pages/branch/BranchProfilePage')));
export const MenuListingPage = Loadable(lazy(() => import('../pages/menu/MenuListingPage')));
export const MenuCreatePage = Loadable(lazy(() => import('../pages/menu/MenuCreatePage')));
export const MenuEditPage = Loadable(lazy(() => import('../pages/menu/MenuEditPage')));
export const MenuCategoryPage = Loadable(lazy(() => import('../pages/menu/MenuCategory')));
export const MenuAddOnsPage = Loadable(lazy(() => import('../pages/menu/MenuAddOns')));
export const OrderListPage = Loadable(lazy(() => import('../pages/order/orderList')));
export const OrderHistoryPage = Loadable(lazy(() => import('../pages/order/orderHistory')));
export const RolePage = Loadable(lazy(() => import('../pages/roles/roles')));
export const PermissionPage = Loadable(lazy(() => import('../sections/permissions/permissions')));
export const KitchenLiveOrders = Loadable(lazy(() => import('../pages/order/kitchenOrder')));
export const OrderList = Loadable(lazy(() => import('../pages/order/OrderListPage')));
export const TakeOrders = Loadable(lazy(() => import('../pages/order/takeOrder/TablesList')));
export const TakeOrderMenu = Loadable(lazy(() => import('../pages/order/takeOrder/MenuList')));
export const LiveOrdersPage = Loadable(lazy(() => import('../pages/order/LiveOrdersPage')));
export const SettlementPage = Loadable(lazy(()=> import('../pages/order/SettlementPage')));
export const PreviousOrderPage = Loadable(lazy(()=> import('../pages/order/PreviousOrdersPage')));
export const CancelledOrderPage = Loadable(lazy(()=>import('../pages/order/CancelledOrdersPage')));
export const KitchenTypePage = Loadable(lazy(()=> import('../pages/kitchen/KitchenTypePage')));
export const KitchenTypeItmeListPage = Loadable(lazy(()=> import('../pages/kitchen/KitchenTypeItemListPage')));
export const AllSalesReport = Loadable(lazy(()=> import('../pages/reports/superAdmin/AllSalesReport')))
export const BranchUserCreate = Loadable(
  lazy(() => import('../sections/branch/profile/AddBranchUser'))
);
export const EditBranchUser = Loadable(
  lazy(() => import('../sections/branch/profile/EditBranchUser'))
);
export const UserProfile = Loadable(lazy(() => import('../sections/branch/profile/UserProfile')));

export const PricingPage = Loadable(lazy(() => import('../pages/subscriptions/subscriptions')));
export const ActiveSubscription = Loadable(
  lazy(() => import('../pages/subscriptions/ActiveSubscription'))
);
export const PaymentPage = Loadable(lazy(() => import('../pages/payment/paymentPage')));
export const Dashboard = Loadable(lazy(() => import('../pages/dashboard/dashboardPage')));
export const Integration = Loadable(lazy(() => import('../pages/integration/Integration')));
export const Invoices = Loadable(lazy(() => import('../pages/Invoices/invoices')));
export const InvoiceDetails = Loadable(lazy(() => import('../pages/Invoices/InvoiceDetailPage')));
export const CashierLiveOrders = Loadable(
  lazy(() => import('../sections/order/liveOrders/CashierLiveOrders'))
);

export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
