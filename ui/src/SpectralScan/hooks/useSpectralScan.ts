import { useCallback, useState } from 'react';

import { SpectralScanTabs, breadcrumbs } from 'SpectralScan/constants';

export const useSpectralScan = () => {
  const [activeTab, setActiveTab] = useState<string>(
    SpectralScanTabs.LIVE_SCAN,
  );

  const handleChangeTab = useCallback((_, value: string) => {
    setActiveTab(value);
  }, []);

  return {
    activeTab,
    breadcrumbs,
    handleChangeTab,
  };
};
