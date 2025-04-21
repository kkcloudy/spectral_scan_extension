import { IntlProvider } from 'react-intl';

import { Header } from 'SpectralScan/Header';
import { ConfigurationTab } from 'SpectralScan/ConfigurationTab';

import { translations } from 'locales';
import { SpectralScanTabs } from 'SpectralScan/constants';
import { useSpectralScan } from 'SpectralScan/hooks/useSpectralScan';

const currentLang = 'en';

const SpectralScan = () => {
  const { activeTab, breadcrumbs, handleChangeTab } = useSpectralScan();

  return (
    <IntlProvider locale={currentLang} messages={translations[currentLang]}>
      <div>
        <Header
          activeTab={activeTab}
          breadcrumbs={breadcrumbs}
          handleChangeTab={handleChangeTab}
        />
        {activeTab === SpectralScanTabs.CONFIGURATION && <ConfigurationTab />}
      </div>
    </IntlProvider>
  );
};

export default SpectralScan;
