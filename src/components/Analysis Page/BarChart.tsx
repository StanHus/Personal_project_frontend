import { Bar } from 'react-chartjs-2';
import "../../css/style.css"

interface IChart {
    chartStats:  number[],
    chartOptions:  string[],
}


export default function BarChart (props: IChart): JSX.Element {
    const chartData = {
        labels: props.chartOptions,
        datasets: [
          {
            label: 'Total Weight',
            data: props.chartStats,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 2,
          },
        ],
      };
      return (
     <div>   
        <Bar className = "barchart" data={chartData} />
    </div>
)}