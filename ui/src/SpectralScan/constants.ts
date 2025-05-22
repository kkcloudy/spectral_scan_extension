export enum SpectralScanTabs {
  LIVE_SCAN = 'live_scan',
  HISTORY = 'history',
}

export const tabsList = [
  {
    value: SpectralScanTabs.LIVE_SCAN,
    name: 'Live Scan',
  },
  {
    value: SpectralScanTabs.HISTORY,
    name: 'History',
  },
];

export const breadcrumbs = ['extensions', 'spectralScan'];
