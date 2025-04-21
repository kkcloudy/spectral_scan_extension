import { FC } from 'react';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';
import { HeatmapChart } from 'echarts/charts';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
} from 'echarts/components';

import { HeatMapTabProps } from 'SpectralScan/ConfigurationTab/HeatMap/types';

export const HeatMapTab: FC<HeatMapTabProps> = ({ xaxis, yaxis, data }) => {
  echarts.use([
    HeatmapChart,
    GridComponent,
    TitleComponent,
    CanvasRenderer,
    TooltipComponent,
    VisualMapComponent,
    VisualMapContinuousComponent,
  ]);

  const chartConfigOptions = {
    position: 'relative',
    tooltip: {
      position: 'top',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#fff',
          color: '#555',
          fontSize: '12px',
          fontWeight: 500,
        },
      },
    },
    toolbox: {
      show: true,
    },
    animation: false,
    grid: {
      top: '80',
      left: '45',
      right: '80',
      bottom: '60',
    },
    xAxis: {
      type: 'category',
      data: xaxis,
      name: 'FREQ(KHz)',
      nameTextStyle: {
        fontSize: 10,
        color: '#000000',
      },
      axisLine: {
        lineStyle: {
          color: '#CECECE',
        },
      },
      axisTick: {
        alignWithLabel: false,
      },
      splitArea: {
        show: true,
      },
      maxInterval: 1,
      axisLabel: {
        lineHeight: 16,
        color: '#B4B4B4',
        interval: 0,
        fontSize: 11,
      },
    },
    yAxis: {
      type: 'category',
      data: yaxis,
      name: 'Time',
      axisTick: {
        alignWithLabel: true,
      },
      nameTextStyle: {
        fontSize: 10,
        color: '#000000',
      },
      axisLine: {
        lineStyle: {
          color: '#CECECE',
        },
      },
      axisLabel: {
        lineHeight: 16,
        color: '#B4B4B4',
        fontSize: 10,
      },
      position: 'left',
    },
    visualMap: {
      min: -135,
      max: -11,
      calculable: true,
      orient: 'horizontal',
      top: '0px',
      right: '80px',
      itemHeight: '200px',
      itemWidth: '12px',
      text: ['', 'RSSI(dB)'],
      fontSize: '22px',
      inRange: {
        color: [
          '#0000FF',
          '#00FFFF',
          '#00FF00',
          '#FFFF00',
          '#FFA500',
          '#FF0000',
          '#FF00FF',
        ],
      },
      indicatorIcon: 'none',
      hoverLink: false,
    },
    series: [
      {
        name: 'RSSI',
        type: 'heatmap',
        data: data,
        label: {
          show: false,
        },
      },
    ],
  };

  return (
    <div>
      <ReactEChartsCore
        lazyUpdate
        echarts={echarts}
        option={chartConfigOptions}
        style={{ height: '100%', minHeight: '600px', width: '100%' }}
      />
    </div>
  );
};
