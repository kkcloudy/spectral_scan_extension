import { FC } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { PageHeader } from 'host/PageHeader';
import { Breadcrumbs } from 'host/Breadcrumbs';

import { tabsList } from 'SpectralScan/constants';

export const Header: FC<{
  activeTab: string;
  breadcrumbs: string[];
  handleChangeTab: (_: any, value: string) => void;
}> = ({ activeTab, breadcrumbs, handleChangeTab }) => {
  const { formatMessage } = useIntl();

  const translatedTabsList = tabsList.map(({ name, value }) => ({
    value,
    name: formatMessage({ id: name }),
  }));

  const translatedBreadcrumbs = breadcrumbs.map(key =>
    formatMessage({ id: key }),
  );

  return (
    <PageHeader
      withCustomElement
      activeTab={activeTab}
      tabs={translatedTabsList}
      handleChangeTab={handleChangeTab}
      title={<FormattedMessage id="spectralScan" />}
      customElement={<Breadcrumbs breadcrumbs={translatedBreadcrumbs} />}
    />
  );
};
