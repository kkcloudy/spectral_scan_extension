import { useCallback, useState } from 'react';

import { SpectralScanTabs, breadcrumbs } from 'SpectralScan/constants';

export const useSpectralScan = () => {
  const [activeTab, setActiveTab] = useState<string>(
    SpectralScanTabs.CONFIGURATION,
  );

  const handleChangeTab = useCallback(
    (_, value: string) => {
      if (activeTab !== SpectralScanTabs.CONFIGURATION) {
        setActiveTab(value);
      }
    },
    [activeTab],
  );

  return {
    activeTab,
    breadcrumbs,
    handleChangeTab,
  };
};
