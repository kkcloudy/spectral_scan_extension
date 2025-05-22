import { useCallback, useState, useEffect } from 'react';
import isEmpty from 'lodash.isempty';
import { useApiRequest } from 'host/useApiRequest';

import { getHisList, getHisData } from 'api/actions';
import { tableItem } from 'SpectralScan/LiveScanTab/types';

export const useHistoryTabForm = () => {
  const getHisListRequest = useApiRequest(getHisList);
  const getHisDataRequest = useApiRequest(getHisData);

  const [xaxis, setXaxis] = useState<string[]>([]);
  const [yaxis, setYaxis] = useState<string[]>([]);
  const [data, setData] = useState<number[][]>([]);
  const [hisList, setHisList] = useState<tableItem[]>([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const getHisListRequestHandler = useCallback(async () => {
    const response = await getHisListRequest();
    const data = response?.payload?.payload;

    if (response && !isEmpty(data)) {
      setHisList(data);
    }
  }, [getHisListRequest]);

  useEffect(() => {
    void getHisListRequestHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRowClick = useCallback(
    async id => {
      setSelectedRow(id);
      const response = await getHisDataRequest({ id: id });
      const data = response?.payload?.payload;
      if (response && !isEmpty(data)) {
        console.log(data);
        setXaxis(data.xAxis);
        setYaxis(data.yAxis);
        setData(data.curData);
      }
    },
    [getHisDataRequest],
  );

  return {
    xaxis,
    yaxis,
    data,
    hisList,
    selectedRow,
    handleRowClick,
  };
};
