<template>
    <main class="container">
      <h1><strong>Name: </strong>{{ farmerData ? farmerData.farmersName : 'Loading...' }}</h1>
      <div v-if="farmerData" class="farmer-details">
         <img class="profile-image" :src="farmerData.url" alt="Profile Image" width={300} />
        <p><strong>Account No:</strong> {{ farmerData.accountNo }}</p>
        <p><strong>Bank Name:</strong> {{ farmerData.bankName }}</p>
        <p><strong>Branch:</strong> {{ farmerData.branch }}</p>
        <p><strong>Father's Name:</strong> {{ farmerData.fatherName }}</p>
        <p><strong>Location:</strong> {{ farmerData.location }}</p>
        <p><strong>Mobile No:</strong> {{ farmerData.mobileNo }}</p>
        <p><strong>NID:</strong> {{ farmerData.nid }}</p>
        <p><strong>Plantation:</strong> {{ farmerData.plantation }}</p>
        <p><strong>Routing No:</strong> {{ farmerData.routingNo }}</p>
        <p><strong>Gilla:</strong> {{ farmerData.selectedGilla }}</p>
        <p><strong>Upjilla:</strong> {{ farmerData.selectedUpjilla }}</p>
        <p><strong>Target:</strong> {{ farmerData.target }}</p>
        <p><strong>Village:</strong> {{ farmerData.village }}</p>
        <div class="buttons">
            <button class="edit-button" @click="editFarmer">Edit</button>
            <button class="delete-button" @click="deleteFarmer">Delete</button>
        </div>
      </div>
      <div v-else class="loading-message">
        Loading...
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import loadDetailsFarmersData from '../function/loadDetailsFarmersData'
  
  const route = useRoute();
  const { id } = route.params;
  console.log(id)
  
  const isLoading = ref(true);
  const error = ref(null);
  const farmerData = ref(null);
  
  onMounted(loadDetailsFarmersData(farmerData,isLoading,error,id));
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
  margin-top: 35px;
}
strong{
    margin-right: 10px;
}

.farmer-details {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.farmer-details p {
  margin-bottom: 10px;
}

.loading-message {
  font-size: 20px;
  margin-top: 20px;
  color: #666;
}
.profile-image {
  width: 200px;
  height: auto;
  margin-bottom: 20px;
}

/* Add color accent and hover effect */
.farmer-details p:hover {
  background-color: #92e4a4;
  transition: background-color 0.3s ease;
}

.edit-button,
.delete-button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
}

.edit-button:hover,
.delete-button:hover {
  background-color: #45a049;
}

</style>
