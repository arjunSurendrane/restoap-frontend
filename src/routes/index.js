/* eslint-disable react/prop-types */
import { m } from 'framer-motion';
import { Navigate, Route, useRoutes } from 'react-router-dom';

// auth
import { element } from 'prop-types';
import InvoiceDetailPage from '../pages/Invoices/InvoiceDetailPage';
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
// eslint-disable-next-line import/no-cycle
import {
  Page404,
  Page403,
  LoginPage,
  BranchPage,
  BranchProfilePage,
  RegisterPage,
  EmailVerification,
  InitialLogin,
  PricingPage,
  PaymentPage,
  MenuListingPage,
  MenuCreatePage,
  MenuEditPage,
  RolePage,
  DashBoardPage,
  OrderHistoryPage,
  OrderListPage,
  // Dashboard,
  BranchUserCreate,
  EditBranchUser,
  UserProfile,
  ResetPassword,
  MenuCategoryPage,
  MenuAddOnsPage,
  PermissionPage,
  KitchenLiveOrders,
  OrderList,
  CashierLiveOrders,
  TakeOrders,
  TakeOrderMenu,
  Integration,
  Invoices,
  ActiveSubscription,
  LiveOrdersPage,
  SettlementPage,
  PreviousOrderPage,
  CancelledOrderPage,
  StoreAddPage,
  StoreEditPage,
  MyProfilePage,
  KitchenTypePage,
  KitchenTypeItmeListPage,
  AllSalesReport,
} from './elements';
import { useAuthContext } from '../auth/useAuthContext';

// ----------------------------------------------------------------------

const checkPermission = (userPermissions, requiredPermission) =>
  userPermissions.includes(requiredPermission);

// Custom Route component that checks permissions before rendering
export const ProtectedRoute = ({ permissionKey, component: Component }) => {
  const { user } = useAuthContext();

  const userPermissions = user
    ? user.roles.flatMap((role) => role.permissions.map((item) => item))
    : [];

  const hasPermission = checkPermission(userPermissions, permissionKey);

  if (hasPermission) {
    return Component;
  }
  return <Navigate to="/403" replace />;
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'login/initial/:token',
          element: (
            <GuestGuard>
              <InitialLogin />
            </GuestGuard>
          ),
        },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },

        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        {
          path: '/email-verification',
          element: (
            <GuestGuard>
              <EmailVerification />
            </GuestGuard>
          ),
        },
        {
          path: '/activeSubscription',
          element: (
            <AuthGuard>
              <ActiveSubscription />
            </AuthGuard>
          ),
        },
        {
          path: '/payment',
          element: (
            // <AuthGuard>
            <PaymentPage />
            // </AuthGuard>
          ),
        },
        {
          path: '/reset-password/:token',
          element: (
            <GuestGuard>
              <ResetPassword />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: '/dashboard/dash',
          element: <DashBoardPage />,
        },
        {
          path: '/dashboard/integration',
          element: (
            <ProtectedRoute permissionKey="INTEGRATE_PAYMENT_GATEWAY" component={<Integration />} />
          ),
        },

        {
          path: '/dashboard/payment',
          element: <PaymentPage />,
          // children: [{ path: 'profile', element: <BranchProfilePage /> }],
        },
        {
          path: '/dashboard/roles',
          element: <RolePage />,
          // children: [{ path: 'profile', element: <BranchProfilePage /> }],
        },

        {
          path: '/dashboard/permission/:roleId',
          element: <PermissionPage />,
        },
        {
          path: '/dashboard/my-profile/:id',
          element: <MyProfilePage />,
        },
        {
          path: 'kitchen',
          children: [
            { element: <Navigate to="/dashboard/kitchen/" replace />, index: true },
            {
              path: 'kitchen-type',
              element: (
                <ProtectedRoute permissionKey="KITCHEN_READ" component={<KitchenTypePage />} />
              ),
            },
            {
              path: 'kitchen-type/assign-menu/:id/:store',
              element: (
                <ProtectedRoute
                  permissionKey="KITCHEN_READ"
                  component={<KitchenTypeItmeListPage />}
                />
              ),
            },
          ],
        },
        {
          path: 'billing',
          children: [
            {
              element: <ProtectedRoute permissionKey="BILLING_READ" component={<Invoices />} />,
              path: 'invoices',
            },
            {
              element: (
                <ProtectedRoute permissionKey="BILLING_READ" component={<InvoiceDetailPage />} />
              ),
              path: 'invoices/invoiceDetails',
            },
            {
              element: <ProtectedRoute permissionKey="BILLING_READ" component={<PricingPage />} />,
              path: 'invoices/subscription-plans',
            },
          ],
        },
        {
          path: 'order',
          children: [
            { element: <Navigate to="/dashboard/order/" replace />, index: true },
            {
              path: 'order-list',
              element: <ProtectedRoute permissionKey="MANAGE_ORDERS" component={<OrderList />} />,
            },
            {
              path: 'order-history',
              element: (
                <ProtectedRoute
                  permissionKey="MANAGE_PREVIOUS_ORDERS"
                  component={<OrderHistoryPage />}
                />
              ),
            },
            {
              path: 'order-list/cashier',
              element: (
                <ProtectedRoute permissionKey="MANAGE_LIVE_ORDERS" component={<LiveOrdersPage />} />
              ),
            },
            {
              path: 'take-order',
              element: (
                <ProtectedRoute permissionKey="MANAGE_TAKE_ORDERS" component={<TakeOrders />} />
              ),
            },
            {
              path: 'take-order/menu',
              element: (
                <ProtectedRoute permissionKey="MANAGE_TAKE_ORDERS" component={<TakeOrderMenu />} />
              ),
            },
            {
              path: 'settlement',
              element: (
                <ProtectedRoute
                  permissionKey="MANAGE_SETTLEMENT_ORDERS"
                  component={<SettlementPage />}
                />
              ),
            },
            {
              path: 'previous-order',
              element: (
                <ProtectedRoute
                  permissionKey="MANAGE_PREVIOUS_ORDERS"
                  component={<PreviousOrderPage />}
                />
              ),
            },
            {
              path: 'cancelled-order',
              element: (
                <ProtectedRoute
                  permissionKey="MANAGE_CANCELLED_ORDERS"
                  component={<CancelledOrderPage />}
                />
              ),
            },
            //     <ProtectedRoute permissionKey="MANAGE_WAITER_ORDERS" component={<LiveOrdersPage />} />
            //   ),
            // },
            // { path: 'order-history', element: <OrderHistoryPage /> },
            // { path: 'order-list/cashier', element: <LiveOrdersPage /> },
            // { path: 'take-order', element: <TakeOrders /> },
            // { path: 'take-order/menu', element: <TakeOrderMenu /> },
          ],
        },
        {
          path: 'report',
          children: [
            {
              path: 'all-sales-report',
              element: <AllSalesReport />,
            },
          ],
        },

        {
          path: 'menus',
          children: [
            { element: <Navigate to="/dashboard/menus/list" replace />, index: true },
            {
              path: 'list',
              element: <ProtectedRoute permissionKey="MENU_READ" component={<MenuListingPage />} />,
            },
            {
              path: 'menu-category',
              element: (
                <ProtectedRoute permissionKey="MENU_READ" component={<MenuCategoryPage />} />
              ),
            },
            // {
            //   path: 'menu-addons',
            //   element: <ProtectedRoute permissionKey="MENU_READ" component={<MenuAddOnsPage />} />,
            // },
            {
              path: 'create-menu',
              element: (
                <ProtectedRoute permissionKey="MENU_CREATE" component={<MenuCreatePage />} />
              ),
            },
            {
              path: 'edit/:storeId/:itemId',
              element: <ProtectedRoute permissionKey="MENU_UPDATE" component={<MenuEditPage />} />,
            },
          ],
        },

        {
          path: 'branches',
          children: [
            { element: <Navigate to="/dashboard/branches/list" replace />, index: true },
            // <ProtectedRoute
            //   path="list"
            //   permissionKey="CREATE_BRANCH"
            //   layout={DashboardLayout}
            //   component={BranchPage}
            // />,
            {
              path: 'list',
              element: <ProtectedRoute permissionKey="STORE_READ" component={<BranchPage />} />,
            },
            {
              path: 'add-store',
              element: <ProtectedRoute permissionKey="STORE_CREATE" component={<StoreAddPage />} />,
            },
            {
              path: 'edit-store',
              element: (
                <ProtectedRoute permissionKey="STORE_UPDATE" component={<StoreEditPage />} />
              ),
            },
            {
              path: 'profile/:id',
              element: (
                <ProtectedRoute permissionKey="STORE_READ" component={<BranchProfilePage />} />
              ),
            },
            {
              path: 'addUser/:id',
              element: (
                <ProtectedRoute permissionKey="USER_CREATE" component={<BranchUserCreate />} />
              ),
            },
            {
              path: 'editUser/:id',
              element: (
                <ProtectedRoute permissionKey="USER_UPDATE" component={<EditBranchUser />} />
              ),
            },
            {
              path: 'userProfile/:id',
              element: <ProtectedRoute permissionKey="USER_READ" component={<UserProfile />} />,
            },
          ],
        },
      ],
    },

    {
      element: <CompactLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
    // { path: 'create-branch', element: <BranchCreatePage /> },
  ]);
}
