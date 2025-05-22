import { IntlProvider } from 'react-intl';
import { Header } from 'SpectralScan/Header';
import { LiveScanTab } from 'SpectralScan/LiveScanTab';
import { HistoryTab } from 'SpectralScan/HistoryTab';
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
        {activeTab === SpectralScanTabs.LIVE_SCAN ? (
          <LiveScanTab />
        ) : (
          <HistoryTab />
        )}
      </div>
    </IntlProvider>
  );
};

export default SpectralScan;
