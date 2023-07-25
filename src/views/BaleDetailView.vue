<template>
    <main class="container">
      <div class="detail">
        <h1>Name: {{ transportPermitData ? transportPermitData.farmersName : 'Loading...' }}</h1>
      <p><strong>ID:</strong> {{ transportPermitData ? transportPermitData.id : 'Loading...' }}</p>
      <p><strong>Mobile No:</strong> {{ transportPermitData ? transportPermitData.mobileNo : 'Loading...' }}</p>
      <p><strong>Type:</strong> <span>{{ transportPermitData ? transportPermitData.type : 'Loading...' }}</span></p>
      <p><strong>Bale Quantity:</strong> {{ transportPermitData ? transportPermitData.baleQuantity : 'Loading...' }} Kj</p>
      <p><strong>Buying Center:</strong> {{ transportPermitData ? transportPermitData.buyingCenter : 'Loading...' }}</p>
      <p><strong>Buying Date:</strong> {{ transportPermitData ? transportPermitData.buyingDate : 'Loading...' }}</p>
      <p><strong>Expiry Date:</strong> {{ transportPermitData ? transportPermitData.expiryDate : 'Loading...' }}</p>
      <p><strong>Farmer Jilla:</strong> {{ transportPermitData ? transportPermitData.farmerJilla : 'Loading...' }}</p>
      <p><strong>Farmer Upjilla:</strong> {{ transportPermitData ? transportPermitData.farmerUpjilla : 'Loading...' }}</p>
      <p v-if="transportPermitData && transportPermitData.weight"><strong>Weight:</strong> {{ transportPermitData.weight }} KJ</p>
      <p v-if="transportPermitData && transportPermitData.total"><strong>Loan Amount:</strong> {{ transportPermitData.total }} Tk</p>
      </div>
    </main>
  </template>
  
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import loadTransportPermitDetail from '../function/loadTransportPermitDetail';

const route = useRoute();
const { id } = route.params;
const transportPermitData = ref(null);

onMounted(async () => {
    try {
        transportPermitData.value = await loadTransportPermitDetail(id);
    } catch (error) {
        console.error(error);
    }
});
</script>
  
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 40%;
    font-family: Arial, sans-serif;
    color: #333;
    background-color: rgb(196, 226, 181);
}
.detail{
    background-color: #ece7c6;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.container h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

.container p {
    font-size: 16px;
    margin-bottom: 10px;
}

span {
    color: rgb(255, 13, 0);
}

/* Add more styling as needed */
</style>
  