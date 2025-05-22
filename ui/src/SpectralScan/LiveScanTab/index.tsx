import { useIntl } from 'react-intl';
import { DevTool } from '@hookform/devtools';
import { makeStyles } from '@material-ui/core';
import { CustomButton } from 'host/CustomButton';
import { TextFormField } from 'host/TextFormField';
import { ConfirmModal } from 'host/ConfirmModal';
import { useFormConfig } from 'SpectralScan/LiveScanTab/hooks/useFormConfig';
import { useLiveScanTabForm } from 'SpectralScan/LiveScanTab/hooks/useLiveScanTabForm';
import { FC } from 'react';
import { styled } from 'SpectralScan/LiveScanTab/styled';
import { HeatMapTab } from 'SpectralScan/HeatMap';
import { ReactComponent as PlayIcon } from 'SpectralScan/LiveScanTab/icons/play.svg';
import { ReactComponent as StopIcon } from 'SpectralScan/LiveScanTab/icons/stop.svg';

const useStyles = makeStyles(styled, { name: 'LiveScanTab' });

export const LiveScanTab: FC = () => {
  const classes = useStyles();
  const { formatMessage } = useIntl();
  const { reset, control, handleSubmit } = useFormConfig();

  const {
    xaxis,
    yaxis,
    data,
    isEnabled,
    handleStart,
    open,
    handleCloseModal,
    handleOpenModal,
  } = useLiveScanTabForm({
    reset,
  });

  return (
    <div>
      <form onSubmit={handleSubmit(handleStart)} className={classes.form}>
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

          <CustomButton
            variant="contained"
            customSize="small"
            onClick={handleOpenModal}
            additionalClass={classes.submit}
          >
            <div className={classes.button}>
              {isEnabled ? <StopIcon /> : <PlayIcon />}
              {formatMessage({ id: isEnabled ? 'stopScan' : 'startScan' })}
            </div>
          </CustomButton>
        </div>

        {open && (
          <ConfirmModal
            isOpenModal={open}
            onSubmit={handleSubmit(handleStart)}
            onClose={handleCloseModal}
            submitText="common.confirm"
            titleId={formatMessage({ id: 'warningTitle' })}
            modalTextId={formatMessage({ id: 'warningMessage' })}
          />
        )}

        <div className={classes.border}>
          {isEnabled ? (
            <HeatMapTab xaxis={xaxis} yaxis={yaxis} data={data} />
          ) : (
            'Start a scan to see real-time visualization.'
          )}
        </div>
        <DevTool control={control} />
      </form>
    </div>
  );
};
