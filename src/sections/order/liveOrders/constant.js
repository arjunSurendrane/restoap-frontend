export const orderFilter = [
  {
    id: 1,
    name: 'Open',
    status: 'all',
    color: 'white',
  },
  {
    id: 2,
    name: 'Verified',
    status: 'verified',
    color: '#FFD2BC',
  },
  {
    id: 3,
    name: 'Accepted',
    status: 'accepted',
    color: '#C4AF7A',
  },

  {
    id: 4,
    name: 'cooked',
    status: 'delivered',
    color: '#C4AF7A',
    badge: true,
    role: 'waiter'
  },
  {
    id: 4,
    name: 'Preparing',
    status: 'delivered',
    color: '#C4AF7A',
    badge: true,
    role: 'kitchen'
  },

  {
    id: 4,
    name: 'Delivered',
    status: 'delivered',
    color: 'green',
  },
  {
    id: 5,
    name: 'Cancel',
    status: 'cancel',
    color: '#FFCBCB',
  },

];

export const itemStatus = {
  open: 'white',
  verified: '#FFD2BC',
  accepted: '#C4AF7A',
  delivered: 'green',
  cancel: '#FFCBCB',
};

export const orderStatus = {
  verified: '#FFD2BC',
  open: '#FFE5B1',
  accepted: '#C4AF7A',
  completed: '#7B882B',
  cancel: '#FFCBCB',
};


