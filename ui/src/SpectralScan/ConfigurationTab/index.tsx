import { useIntl } from 'react-intl';
import { DevTool } from '@hookform/devtools';
import { makeStyles } from '@material-ui/core';
import { FormBlock } from 'host/FormBlock';
import { CustomButton } from 'host/CustomButton';
import { TextFormField } from 'host/TextFormField';
import { useFormConfig } from 'SpectralScan/ConfigurationTab/hooks/useFormConfig';
import { useConfigurationTabForm } from 'SpectralScan/ConfigurationTab/hooks/useConfigurationTabForm';
import { FC } from 'react';
import { styled } from 'SpectralScan/ConfigurationTab/styled';
import { HeatMapTab } from 'SpectralScan/ConfigurationTab/HeatMap';

const useStyles = makeStyles(styled, { name: 'ConfigurationTab' });

export const ConfigurationTab: FC = () => {
  const classes = useStyles();
  const { formatMessage } = useIntl();
  const { reset, control, handleSubmit } = useFormConfig();

  const {
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
  } = useConfigurationTabForm({
    reset,
  });

  const headerStyle = {
    backgroundColor: '#f5f5f5',
    padding: '12px',
    borderBottom: '1px solid #ddd'
  };

  const rowStyle = {
    borderBottom: '1px solid #ddd',
    transition: 'background-color 0.2s'
  };

  const cellStyle = {
    padding: '12px',
    textAlign: 'center' as const
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleStart)} className={classes.form}>
        <FormBlock label={formatMessage({ id: 'option' })}>
          <div className={classes.formBlock}>
            <TextFormField
              name="start_frequency"
              shouldUnregister
              control={control}
              // tooltipText="Scan start freqency, in MHz"
              label={formatMessage({ id: 'startFrequency' })}
            />
            <TextFormField
              name="channel_number"
              shouldUnregister
              control={control}
              // tooltipText="Number of channels to scan"
              label={formatMessage({ id: 'channelNumber' })}
            />
            <TextFormField
              name="step"
              shouldUnregister
              control={control}
              // tooltipText="Number of scan points per frequency step"
              label={formatMessage({ id: 'step' })}
            />
          </div>

          <div className={classes.formBlock}>
            <CustomButton
              type="submit"
              variant="contained"
              customSize="small"
              disabled={isEnabled}
              loading={isStartLoad}
              additionalClass={classes.submit}
            >
              {formatMessage({ id: 'startScan' })}
            </CustomButton>

            <CustomButton
              variant="contained"
              customSize="small"
              disabled={!isEnabled}
              loading={isStopLoad}
              onClick={handleStop}
              additionalClass={classes.submit}
            >
              {formatMessage({ id: 'stopScan' })}
            </CustomButton>
          </div>
        </FormBlock>

        <HeatMapTab xaxis={xaxis} yaxis={yaxis} data={data} />

        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={headerStyle}>ID</th>
                <th style={headerStyle}>Start Freq</th>
                <th style={headerStyle}>Channel Num</th>
                <th style={headerStyle}>Step</th>
                <th style={headerStyle}>Time</th>
              </tr>
            </thead>
            <tbody>
              {hisList.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item.id)}
                  style={{
                    ...rowStyle,
                    backgroundColor: selectedRow === item.id ? '#e3f2fd' : 'white',
                    cursor: 'pointer'
                  }}
                >
                  <td style={cellStyle}>{item.id}</td>
                  <td style={cellStyle}>{item.start_freq}</td>
                  <td style={cellStyle}>{item.channel_num}</td>
                  <td style={cellStyle}>{item.step}</td>
                  <td style={cellStyle}>{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <DevTool control={control} />
      </form>
    </div>
  );
};
