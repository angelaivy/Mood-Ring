import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title, 
  ArcElement, 
  Tooltip, 
  Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { MostFrequentMood, GetMoodCountsOnly, MoodCount } from './MoodDataHelpers';
ChartJS.register(
  ArcElement, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip, 
  Legend);

export default function MoodInsights() {
  const countForBarChart = MoodCount();
  // Bar Chart
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Mood Frequency',
      },
    },
  };

  const barChartLabels = Object.keys(countForBarChart);
  const moodStyles = {
    '😀': { background: '#FFD700', label: 'Happy' },
    '😜': { background: '#FF69B4', label: 'Silly' },
    '😐': { background: '#A9A9A9', label: 'Neutral' },
    '😴': { background: '#6495ED', label: 'Tired' },
    '😢': { background: '#4169E1', label: 'Sad' },
    '😕': { background: '#DDA0DD', label: 'Confused' },
    '😡': { background: '#FF4500', label: 'Angry' },
  }
  const barChartData = {
    labels: barChartLabels,
    datasets: [
      { 
        data: Object.values(countForBarChart),
        backgroundColor: Object.keys(countForBarChart).map(mood => moodStyles[mood].background),
      }
    ],
  };

  // Pie Chart
  const getMoodCountData = GetMoodCountsOnly();
  const pieData = {
    labels: ['😀', '😜', '😐', '😴', '😢', '😕', '😡'],
    datasets: [
      {
        label: 'Mood',
        data: getMoodCountData,
        backgroundColor: [
          'rgba(11, 2, 4, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h2>Mood Insights</h2>
      <div>
        <h3>Most frequent Mood</h3>
        {<MostFrequentMood />}
        <Bar options={barChartOptions} data={barChartData} />;
        <Pie data={pieData} />
      </div>
     </>
  )
}