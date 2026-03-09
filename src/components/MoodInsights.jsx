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
import { MostFrequentMood, GetMoodCountsOnly, MoodCount, GetAllMoodData } from './Helpers/MoodDataHelpers';
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
import './MoodInsights.css'
import '../styles/variables.css'

export default function MoodInsights() {
  const primary = getComputedStyle(document.documentElement).getPropertyValue('--color-primary')
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent')
  const happy = getComputedStyle(document.documentElement).getPropertyValue('--mood-happy')
  const excited = getComputedStyle(document.documentElement).getPropertyValue('--mood-excited')
  const silly = getComputedStyle(document.documentElement).getPropertyValue('--mood-silly')
  const neutral = getComputedStyle(document.documentElement).getPropertyValue('--mood-neutral')
  const sleepy = getComputedStyle(document.documentElement).getPropertyValue('--mood-sleepy')
  const sad = getComputedStyle(document.documentElement).getPropertyValue('--mood-sad')
  const confused = getComputedStyle(document.documentElement).getPropertyValue('--mood-confused')
  const angry = getComputedStyle(document.documentElement).getPropertyValue('--mood-angry')

  const moodColors = {
    '😀': happy,
    '🤩': excited,
    '😜': silly,
    '😐': neutral,
    '😴': sleepy,
    '😢': sad,
    '😕': confused,
    '😡': angry,
  }

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
        color: '#fffffe',
        font: { size: 16 },
      },
    },
    scales: {
        y: {
          ticks: {
            color: '#fffffe'
          },
          grid: { color: 'rgba(255,255,255,0.1)' },
        },
        x: {
          grid: { color: 'rgba(255,255,255,0.1)' }
        }
      }
  };

  const barChartLabels = Object.keys(countForBarChart);
  const moodStyles = {
    '😀': { background: happy },
    '🤩': { background: excited },
    '😜': { background: silly },
    '😐': { background: neutral },
    '😴': { background: sleepy },
    '😢': { background: sad },
    '😕': { background: confused },
    '😡': { background: angry },
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
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: 'Mood Frequency',
        color: '#fffffe',
        font: { size: 16 },
      },
    },
  };
  const pieData = {
    labels: ['😀', '🤩', '😜', '😐', '😴', '😢', '😕', '😡'],
    datasets: [
      {
        label: 'Mood',
        data: getMoodCountData,
        backgroundColor: [
          happy,
          excited,
          silly,
          neutral,
          sleepy,
          sad,
          confused,
          angry
        ],
        borderColor: [
          accent
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
        labels: {
          color: '#fffffe',
          font: { size: 16 },
        }
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => {
            const scoreToMood = {
              8: '😀',
              7: '🤩',
              6: '😜',
              5: '😐',
              4: '😴',
              3: '😕',
              2: '😢',
              1: '😡'
            }
            return scoreToMood[value];
          }
        },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      x: {
        ticks: { color: '#fffffe' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    }
  };
  const moodScore = {
    '😀': 8, '🤩': 7, '😜': 6, '😐': 5, '😴': 4, '😕': 3, '😢': 2, '😡': 1
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
      borderColor: primary,
      pointBackgroundColor: moodDataObj.map(entry => moodColors[entry.data.formData.mood]) 
    }]
  }


  return (
    <>
      <h2>Mood Insights</h2>
      <div className='insights'>
        <div className="card">
          <h3>Most frequent Mood</h3>
          {<p><MostFrequentMood /></p>}
        </div>
        <Line options={lineChartOptions} data={lineChartData} />
        <Bar options={barChartOptions} data={barChartData} />
        <Pie options={pieOptions} data={pieData} />
      </div>
     </>
  )
}