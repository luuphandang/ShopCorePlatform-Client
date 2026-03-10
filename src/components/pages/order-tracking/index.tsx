'use client';

import React, { Fragment, useState } from 'react';

import { TOrderQuery } from '@/graphql/@types';

import OrderTrackingDetail from './order/detail';
import OrderTrackingHistory from './order/history';
import OrderTrackingStatus from './order/status';
import OrderTrackingSearch from './search';

export default function OrderTrackingContainer() {
  const [order, setOrder] = useState<TOrderQuery>(null);

  return (
    <Fragment>
      <OrderTrackingSearch setOrder={setOrder} />

      {order && (
        <Fragment>
          <OrderTrackingStatus order={order} />
          <OrderTrackingHistory order={order} />
          <OrderTrackingDetail order={order} />
        </Fragment>
      )}
    </Fragment>
  );
}
