<template>
    <div class="card-container">
      <div class="card" :class="{ 'hovered': isCardHovered === 'users' }" @mouseover="hoverCard('users')" @mouseleave="hoverCard('')">
        <div class="card-icon">
          <span class="material-icons">person</span>
        </div>
        <div class="card-info">
          <div class="card-title">Register Farmers</div>
          <div class="card-value">{{ userCount }}</div>
        </div>
      </div>
      <div class="card" :class="{ 'hovered': isCardHovered === 'tpGenerate' }" @mouseover="hoverCard('tpGenerate')" @mouseleave="hoverCard('')">
        <div class="card-icon">
          <span class="material-icons">add_circle</span>
        </div>
        <div class="card-info">
          <div class="card-title">TP Generate Total</div>
          <div class="card-value">{{ total }}</div>
        </div>
      </div>
      <div class="card" :class="{ 'hovered': isCardHovered === 'loanSanction' }" @mouseover="hoverCard('loanSanction')" @mouseleave="hoverCard('')">
        <div class="card-icon">
          <span class="material-icons">credit_score</span>
        </div>
        <div class="card-info">
          <div class="card-title">Loan Sanction Amount</div>
          <div class="card-value">{{ loanAmount }} Tk</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import getTotalLoanAmount from "../function/getTotalLoanAmount";
import loadData from '../function/loadData';
  import loadTransportPermit from '../function/loadTransportPermit';
  
  const userCount = ref(0);
  const tpTotal = ref([]);
  const totalFarmers = ref([]);
  const loanAmount = ref("");
  const total = ref(0);
  const isCardHovered = ref('');
  
  onMounted(async () => {
    await getTotalLoanAmount(loanAmount);
    await loadTransportPermit(tpTotal);
    await loadData(totalFarmers)
    total.value = tpTotal.value.length;
    userCount.value=totalFarmers.value.length;
  });
  
  onBeforeUnmount(() => {
    // Cleanup code if needed
  });
  
  const hoverCard = (card) => {
    isCardHovered.value = card;
  };
  </script>
  
  <style scoped>
  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 20px;
    margin-top: 15px;
  }
  
  .card {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .card.hovered {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    background-color: rgb(220, 236, 191);
  }
  
  .card-icon {
    font-size: 24px;
    margin-right: 20px;
  }
  
  .card-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .card-value {
    font-size: 24px;
    font-weight: bold;
  }
  
  .material-icons {
    font-size: 2rem;
    color: var(--primary);
    transition: 0.2s ease-out;
  }
  </style>
  