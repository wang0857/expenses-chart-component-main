import './style.css'
import logo from './images/logo.svg'
import Chart from 'chart.js/auto'
import data from '../data.json'

document.querySelector('#app').innerHTML = `
  <div class="app-container">
    <div class="balance-container">
      <div class="balance-total">
        <p>My balance</p>
        <p>$921.48</p>
      </div>
      <img src="${logo}" alt="logo">
    </div>
    <div class="spending-container">
      <h2>Spending - Last 7 days</h2>
      <div class="spending-chart">
        <canvas id="spendingChart"></canvas>
      </div>
      <div class="spending-footer">
        <div class="spending-total">
          <p>Total this month</p>
          <p>$478.33</p>
        </div>
        <div class="spending-increment">
          <p>+2.4%</p>
          <p>from last month</p>
        </div>
      </div>
    </div>
  </div>
`

// Create bar chart with Chart JS
const spendingChart = document.querySelector('#spendingChart')
const config = {
  type: 'bar',
  data: {
    labels: data.map(row => row.day),
    datasets: [{
      data: data.map(row => row.amount),
      backgroundColor: [
        'hsl(10, 79%, 65%)',
        'hsl(10, 79%, 65%)',
        'hsl(186, 34%, 60%)',
        'hsl(10, 79%, 65%)',
        'hsl(10, 79%, 65%)',
        'hsl(10, 79%, 65%)',
        'hsl(10, 79%, 65%)',
        'hsl(10, 79%, 65%)'
      ],
      borderRadius: 5, // Use Number
      borderSkipped: false, // make all corner able to set border radius
      barThickness: document.body.clientWidth < 768 ? 30 : 50, // responsive bar width
      hoverBackgroundColor: [
        'hsl(10, 100%, 76%)',
        'hsl(10, 100%, 76%)',
        'hsl(187, 49%, 80%)',
        'hsl(10, 100%, 76%)',
        'hsl(10, 100%, 76%)',
        'hsl(10, 100%, 76%)',
        'hsl(10, 100%, 76%)',
        'hsl(10, 100%, 76%)'
      ]
    }]
  },
  options: {
    scales: {
      x: {
        grid: {
          display: false,
        },
        // x labels
        ticks: {
          font: {
            size: 12,
            family: "'DM Sans', sans-serif",
          },
          color: 'hsl(28, 10%, 53%)'
        },
        border: {
          display: false
        } // x border
      },
      y: {
        display: false,
        suggestedMax: 70,
      }
    },
    plugins: {
      tooltip: {
        xAlign: 'center',
        yAlign: 'bottom',
        caretSize: 0, // the bottom triangle
        caretPadding: 10, // the bottom padding between bar and tooltip
        // Add '$' before number
        callbacks: {
          title: function() {
            return false
          },
          label: function(context) {
            let label = context.dataset.label || '';

            if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        },
        displayColors: false, // Remove color boxes from tooltips
        backgroundColor: 'hsl(25, 47%, 15%)',
        bodyColor: 'hsl(27, 66%, 92%)',
        bodyFont: {
          size: document.body.clientWidth < 768 ? 12 : 16, // responsive
          family: "'DM Sans', sans-serif",
          weight: 700
        },
        padding: document.body.clientWidth < 768 ? 5 : 10, // responsive
      },
      legend: {
        display: false,
      },
    },
  }
}

const chart = new Chart(spendingChart, config)

