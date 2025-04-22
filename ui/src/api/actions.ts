import { createRequestAction } from 'host/createRequestAction';

import { endpoints } from 'api/endpoints';

export const [getConfig] = createRequestAction({
  type: 'GET_CONFIG',
  payload: () => ({
    url: endpoints.config,
    method: 'GET',
  }),
});

export const [setConfig] = createRequestAction({
  type: 'SET_CONFIG',
  payload: ({ data }) => ({
    url: endpoints.config,
    method: 'PUT',
    data,
  }),
  meta: {
    skipToast: true,
  },
});

export const [getCurData] = createRequestAction({
  type: 'GET_CURRENT_DATA',
  payload: () => ({
    url: endpoints.current_data,
    method: 'GET',
  }),
});

export const [getHisList] = createRequestAction({
  type: 'GET_HISTORY_LIST',
  payload: () => ({
    url: endpoints.history_list,
    method: 'GET',
  }),
});

export const [getHisData] = createRequestAction({
  type: 'GET_HISTORY_DATA',
  payload: ({ id }) => ({
    url: `${endpoints.history_data}/${id}`,
    method: 'GET',
  }),
});
