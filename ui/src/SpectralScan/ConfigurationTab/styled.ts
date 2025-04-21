import { createStyles } from '@material-ui/core';

// import { textMixin } from 'host/textMixin';
import { formWrapExpansion } from 'host/formWrapExpansion';

export const styled = theme =>
  createStyles({
    form: {
      ...formWrapExpansion(theme),
      background: theme.custom.white,
      minHeight: 'calc(100vh - 300px)',
      boxSizing: 'border-box',
      padding: '60px 30px',
      [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
        padding: '32px 20px',
      },
    },
    formBlock: {
      maxWidth: '368px',
      display: 'grid',
      gap: '24px',
      gridTemplateColumns: '168px 168px',
      '& #mui-component-select-select:focus': {
        backgroundColor: 'transparent',
      },
      [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
        paddingBottom: '20px',
      },
      marginBottom: '36px',
    },
    infoBlock: {
      maxWidth: '368px',
    },
    submit: {
      height: '48px',
      width: '120px',
    },
    loaderWrap: {
      width: 'fit-content',
      margin: '20% auto',
    },
    circle: {
      color: theme.palette.primary.light,
    },
    fieldWithPills: {
      display: 'grid',
      gridTemplateColumns: '168px 1fr',
      gridColumnGap: '32px',
    },
    pillsList: {
      padding: '20px 0 0 0',
      display: 'flex',
      flexWrap: 'wrap',
      gridColumn: 'span 2',
    },
    addButton: {
      width: '80px',
      alignSelf: 'start',
      transform: 'translate(-11px, 22px)',
    },
    heatMap: {
      display: 'grid',
      placeItems: 'center',
      // height: '100vh',
    },
    dataTable: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      backgroundColor: '#f2f2f2',
    },
    tableCell: {
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'left',
    },
    tableRow: {
      '&:hover': {
        backgroundColor: 'lightblue',
      },
    },
  });
