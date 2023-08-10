import React, { useRef } from 'react';
import { Line, getElementAtEvent } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
} from 'chart.js';
import { PatientRecord } from '../../interfaces/types';
import { Div, Header, Text, Title as TitleVKUI } from '@vkontakte/vkui';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend
);
const filterArray = (
  arr: { time: string; feelings: number; noteID: number }[]
) => {
  return arr.filter((item, _, array) => {
    const date = new Date(item.time);
    const sameDayItems = array.filter((innerItem) => {
      const innerDate = new Date(innerItem.time);
      return (
        innerDate.getFullYear() === date.getFullYear() &&
        innerDate.getMonth() === date.getMonth() &&
        innerDate.getDate() === date.getDate()
      );
    });
    const maxTimeItem = sameDayItems.reduce((prev, curr) => {
      const prevTime = new Date(prev.time).getTime();
      const currTime = new Date(curr.time).getTime();
      return prevTime > currTime ? prev : curr;
    });
    return item === maxTimeItem;
  });
};

interface IChartPatient {
  onPointClick: (id: number, type: string) => void;
  recordsList: PatientRecord[];
}
export const ChartPatient = ({ onPointClick, recordsList }: IChartPatient) => {
  const chartRef = useRef();

  const data = filterArray(
    recordsList.map((note) => ({
      time: note.recordindiarybasicinfo.creatingdate,
      feelings: note.feelings,
      noteID: note.recordindiarybasicinfo.id,
    }))
  ).slice(-7);

  const lineChartData: ChartData<'line'> = {
    labels: data
      .map((item) => new Date(item.time).toLocaleDateString())
      .slice(-7),
    datasets: [
      {
        label: '',
        data: data.map((item) => item.feelings),
        pointRadius: 8,
        pointHoverRadius: 8,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        type: 'linear' as const,
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
        },
        grid: {
          display: data.length > 0 ? true : false,
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: true,
    },
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  };
  const onClick = (event: any) => {
    if (chartRef.current) {
      const element = getElementAtEvent(chartRef.current, event);
      if (element.length !== 0)
        onPointClick(data[element[0].index].noteID, 'patient');
    }
  };
  return (
    <Div>
      <Header
        style={{ display: 'flex', justifyContent: 'center' }}
        mode="secondary"
      >
        <TitleVKUI level="3">График самочувствия пациента </TitleVKUI>
      </Header>
      {data.length === 0 && (
        <Text
          weight="1"
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            position: 'absolute',
            marginTop: '25%',
          }}
        >
          Нет данных для построения графика
        </Text>
      )}
      <Line
        ref={chartRef}
        options={lineChartOptions}
        data={lineChartData}
        onClick={onClick}
      />
    </Div>
  );
};
