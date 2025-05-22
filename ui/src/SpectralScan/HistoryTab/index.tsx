import { FC, useState } from 'react';
import { useHistoryTabForm } from 'SpectralScan/HistoryTab/hooks/useHistoryTabForm';
import { CustomButton } from 'host/CustomButton';
import { HeatMapTab } from 'SpectralScan/HeatMap';
import { styled } from 'SpectralScan/HistoryTab/styled';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(styled, { name: 'LiveScanTab' });

export const HistoryTab: FC = () => {
  const classes = useStyles();

  const headerStyle = {
    backgroundColor: '#f5f5f5',
    padding: '12px',
    borderBottom: '1px solid #ddd',
  };

  const rowStyle = {
    borderBottom: '1px solid #ddd',
    transition: 'background-color 0.2s',
  };

  const cellStyle = {
    padding: '12px',
    textAlign: 'center' as const,
  };

  const {
    xaxis,
    yaxis,
    data,
    hisList,
    selectedRow,
    handleRowClick,
  } = useHistoryTabForm();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(hisList.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = hisList.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div>
        {data.length > 0 && (
          <div className={classes.border}>
            <HeatMapTab xaxis={xaxis} yaxis={yaxis} data={data} />
          </div>
        )}
      </div>
      <div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={headerStyle}>Start Freq</th>
              <th style={headerStyle}>Channel Num</th>
              <th style={headerStyle}>Step</th>
              <th style={headerStyle}>Time</th>
              <th style={headerStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(item => (
              <tr
                key={item.id}
                style={{
                  ...rowStyle,
                  backgroundColor:
                    selectedRow === item.id ? '#e3f2fd' : 'white',
                  cursor: 'pointer',
                }}
              >
                <td style={cellStyle}>{item.start_freq}</td>
                <td style={cellStyle}>{item.channel_num}</td>
                <td style={cellStyle}>{item.step}</td>
                <td style={cellStyle}>{item.time}</td>
                <td style={cellStyle}>
                  <CustomButton
                    variant="contained"
                    customSize="small"
                    onClick={() => handleRowClick(item.id)}
                  >
                    {'view heatmap'}
                  </CustomButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ marginRight: '10px' }}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{ marginLeft: '10px' }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
