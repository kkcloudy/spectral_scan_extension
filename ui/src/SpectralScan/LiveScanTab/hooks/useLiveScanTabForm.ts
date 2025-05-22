import { useCallback, useState, useEffect, useRef } from 'react';
import isEmpty from 'lodash.isempty';
import { useApiRequest } from 'host/useApiRequest';
// import { getRequestStatus } from 'host/getRequestStatus';

import {
  getConfig,
  setConfig,
  getCurData,
  getHisList,
  getHisData,
} from 'api/actions';
import { tableItem } from 'SpectralScan/LiveScanTab/types';

export const useLiveScanTabForm = ({ reset }) => {
  const getConfigRequest = useApiRequest(getConfig);
  const setConfigRequest = useApiRequest(setConfig);
  const getCurDataRequest = useApiRequest(getCurData);
  const getHisListRequest = useApiRequest(getHisList);
  const getHisDataRequest = useApiRequest(getHisData);

  const [xaxis, setXaxis] = useState<string[]>([]);
  const [yaxis, setYaxis] = useState<string[]>([]);
  const [data, setData] = useState<number[][]>([]);
  const [hisList, setHisList] = useState<tableItem[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getConfigRequestHandler = useCallback(async () => {
    const response = await getConfigRequest();
    const data = response?.payload?.payload;

    if (response && !isEmpty(data)) {
      reset({ ...data });
      setIsEnabled(data.enable);
    }
  }, [getConfigRequest, reset]);

  const getCurDataRequestHandler = useCallback(async () => {
    const response = await getCurDataRequest();
    const data = response?.payload?.payload;

    if (response && !isEmpty(data)) {
      setXaxis(data.xAxis);
      setYaxis(data.yAxis);
      setData(data.curData);
    }
  }, [getCurDataRequest]);

  const getHisListRequestHandler = useCallback(async () => {
    const response = await getHisListRequest();
    const data = response?.payload?.payload;

    if (response && !isEmpty(data)) {
      setHisList(data);
    }
  }, [getHisListRequest]);

  useEffect(() => {
    void getConfigRequestHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    void getCurDataRequestHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    void getHisListRequestHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //  const fetchData = async () => {
  //    try {
  //      if (isEnabled) {
  //        void getCurDataRequestHandler();
  //      }
  //    } catch (error) {
  //      console.error('请求失败:', error);
  //    }
  //  };

  //  const intervalId = setInterval(fetchData, 2000);

  //  return () => clearInterval(intervalId);
  // }, [getCurDataRequestHandler, isEnabled]);

  const handleStart = useCallback(
    async values => {
      setXaxis([]);
      setYaxis([]);
      setData([]);
      if (isEnabled) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsEnabled(false);
        await setConfigRequest({ data: { ...values, enable: false } });
      } else {
        setIsEnabled(true);
        await setConfigRequest({ data: { ...values, enable: true } });

        const fetchData = async () => {
          try {
            await getCurDataRequestHandler();
          } catch (error) {
            console.error('请求失败:', error);
          }
        };

        setTimeout(() => {
          intervalRef.current = setInterval(fetchData, 2000);
        }, 5000);
      }
    },
    [isEnabled, setConfigRequest, getCurDataRequestHandler],
  );

  const handleRowClick = useCallback(
    async id => {
      setSelectedRow(id);
      const response = await getHisDataRequest({ id: id });
      const data = response?.payload?.payload;
      if (response && !isEmpty(data)) {
        setXaxis(data.xAxis);
        setYaxis(data.yAxis);
        setData(data.curData);
      }
    },
    [getHisDataRequest],
  );

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    if (isEnabled) {
      setOpen(false);
      setIsEnabled(false);
      setConfigRequest({ data: { enable: false } });
    } else {
      setOpen(true);
    }
  };

  return {
    xaxis,
    yaxis,
    data,
    hisList,
    selectedRow,
    isEnabled,
    handleStart,
    handleRowClick,
    open,
    handleCloseModal,
    handleOpenModal,
  };
};
