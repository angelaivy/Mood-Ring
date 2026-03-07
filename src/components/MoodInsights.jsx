import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title, 
  ArcElement, 
  Tooltip, 
  Legend } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { MostFrequentMood, GetMoodCountsOnly, MoodCount, GetAllMoodData } from './MoodDataHelpers';
ChartJS.register(
  ArcElement, 
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip, 
  Legend);

export default function MoodInsights() {
  // Bar Chart
  const countForBarChart = MoodCount();
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
    '😀': { background: '#FFD700' },
    '😜': { background: '#FF69B4' },
    '😐': { background: '#A9A9A9' },
    '😴': { background: '#6495ED' },
    '😢': { background: '#4169E1' },
    '😕': { background: '#DDA0DD' },
    '😡': { background: '#FF4500' },
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

  // Line Chart
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
    scales: {
      y: { // Configuration for the Y-axis
        ticks: {
          callback: (value) => {
            const scoreToMood = {
              7: '😀', 6: '😜', 5: '😐', 4: '😴', 3: '😕', 2: '😢', 1: '😡'
            }
            return scoreToMood[value];
          }
        }
      }
    }
  };
  const moodScore = {
    '😀': 7, '😜': 6, '😐': 5, '😴': 4, '😕': 3, '😢': 2, '😡': 1
  }
  const moodDataObj = GetAllMoodData().slice().reverse();
  const lineChartData = {
    labels: moodDataObj.map(entry => 
      entry.data.timestamp.toDate().toLocaleDateString()
    ),
    datasets: [{
      label: 'Mood Over Time',
      data: moodDataObj.map(entry => 
        moodScore[entry.data.formData.mood]
      ),
    }]
  }

  return (
    <>
      <h2>Mood Insights</h2>
      <div>
        <h3>Most frequent Mood</h3>
        {<MostFrequentMood />}
        <Line options={lineChartOptions} data={lineChartData} />;
        <Bar options={barChartOptions} data={barChartData} />;
        <Pie data={pieData} />
      </div>
     </>
  )
}