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
      display: 'grid',
      width: '90%',
      gap: '24px',
      gridTemplateColumns: 'repeat(3, minmax(140px, 1fr)) minmax(110px, 0.7fr)',
    },
    infoBlock: {
      maxWidth: '368px',
    },
    submit: {
      marginLeft: 'auto',
      height: '40px',
      width: '148px',
      marginTop: '20px',
    },
    button: {
      display: 'grid',
      gap: '10px',
      gridTemplateColumns: '10px 80px',
      alignItems: 'anchor-center',
    },
    border: {
      width: '90%',
      height: '680px',
      padding: '50px',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '26px',
      borderRadius: '10px',
      border: '2px solid var(--Border-Border-light, #DEDEDE)',
      background: 'var(--Primary-colors-White, #FFF)',
      marginTop: '20px',
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
