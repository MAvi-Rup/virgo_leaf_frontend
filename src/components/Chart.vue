<template>
    <div class="chart-container">
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Chart, registerables } from 'chart.js';
import loadTransportPermit from '../function/loadTransportPermit';
import loadData from '../function/loadData';
import getTotalLoanNumber from '../function/getTotalLoanNumber';

const tpTotal = ref([]);
const totalFarmers = ref([]);
const userCount = ref(0);
const totalLoan = ref(0);
const totalTp = ref(0);
Chart.register(...registerables);
const chartCanvas = ref(null);
let chartInstance = null;

onMounted(async () => {
    await getTotalLoanNumber(totalLoan);
    await loadTransportPermit(tpTotal);
    await loadData(totalFarmers)
    
    totalTp.value = tpTotal.value.length;
    userCount.value=totalFarmers.value.length;
    console.log(totalTp.value)
    renderChart();
});

onBeforeUnmount(() => {
    if (chartInstance) {
        chartInstance.destroy();
    }
});

const renderChart = () => {
    const aspectRatio = 1.5; // Adjust the aspect ratio as needed

    const container = chartCanvas.value.parentElement;
    const containerWidth = container.offsetWidth;
    const containerHeight = containerWidth / aspectRatio;

    container.style.height = `${containerHeight}px`;

    const chartOptions = {
        type: 'bar',
        data: {
            labels: ['Farmers', 'TP', 'Loan Sanction'],
            datasets: [
                {
                    label: 'Farmers Data',
                    data: [userCount.value, totalTp.value, totalLoan.value], // Use totalLoan.value to access the loan value
                    backgroundColor: [
                        '#48C9B0',
                        '#52BE80',
                        '#CD6155'
                    ],
                    borderColor: [
                        '#566573'
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            // Other chart options...
        },
    };

    chartInstance = new Chart(chartCanvas.value, chartOptions);
};

// Update chart dimensions on window resize
window.addEventListener('resize', renderChart);
</script>

<style scoped>
.chart-container {
    position: relative;
    width: 100%;
    max-height: 400px;
    margin-top: 30px;
}

.chart-container canvas {
    width: 100% !important;
    height: 100% !important;
}
</style>
