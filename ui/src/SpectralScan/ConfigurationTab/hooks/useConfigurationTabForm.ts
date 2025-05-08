import { useCallback, useState, useEffect } from 'react';
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
import { tableItem } from 'SpectralScan/ConfigurationTab/types';

export const useConfigurationTabForm = ({ reset }) => {
  const getConfigRequest = useApiRequest(getConfig);
  const setConfigRequest = useApiRequest(setConfig);
  const getCurDataRequest = useApiRequest(getCurData);
  const getHisListRequest = useApiRequest(getHisList);
  const getHisDataRequest = useApiRequest(getHisData);

  const [isStartLoad, setIsStartLoad] = useState(false);
  const [isStopLoad, setIsStopLoad] = useState(false);
  const [xaxis, setXaxis] = useState<string[]>([]);
  const [yaxis, setYaxis] = useState<string[]>([]);
  const [data, setData] = useState<number[][]>([]);
  const [hisList, setHisList] = useState<tableItem[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState<boolean>(false);

  const getConfigRequestHandler = useCallback(async () => {
    const response = await getConfigRequest();
    const data = response?.payload?.payload;

    if (response && !isEmpty(data)) {
      reset({ ...data });
      setIsEnabled(data.enable);
      setIsStartLoad(data.enable);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isEnabled) {
          void getCurDataRequestHandler();
        }
      } catch (error) {
        console.error('请求失败:', error);
      }
    };

    const intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);
  }, [getCurDataRequestHandler, isEnabled]);

  const handleStart = useCallback(
    async values => {
      setXaxis([]);
      setYaxis([]);
      setData([]);
      setIsEnabled(true);
      setIsStartLoad(true);
      await setConfigRequest({ data: { ...values, enable: true } });
    },
    [setConfigRequest],
  );

  const handleStop = useCallback(async () => {
    await setConfigRequest({ data: { enable: false } });
    setIsStartLoad(false);
    setIsStopLoad(true);
    setTimeout(() => {
      setIsEnabled(false);
      setIsStopLoad(false);
    }, 3000);
  }, [setConfigRequest]);

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
    setOpen(true);
  };

  return {
    xaxis,
    yaxis,
    data,
    hisList,
    selectedRow,
    isStartLoad,
    isStopLoad,
    isEnabled,
    handleStart,
    handleStop,
    handleRowClick,
    open,
    handleCloseModal,
    handleOpenModal,
  };
};
