<template>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Farmer Name</th>
            <th>Phone No</th>
            <th>NID</th>
            <th>Jilla</th>
            <th>Upajilla</th>
            <th>Village</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="farmer in farmers" :key="farmer._id">
            <td>{{ farmer.farmersName }}</td>
            <td>{{ farmer.mobileNo }}</td>
            <td>{{ farmer.nid }}</td>
            <td>{{ farmer.selectedGilla }}</td>
            <td>{{ farmer.selectedUpjilla }}</td>
            <td>{{ farmer.village }}</td>
            <td>
              <button @click="viewFarmer(farmer._id)" class="view-button">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
import loadData from '../function/loadData';
import router from '../router';
  
  const farmers = ref([]);
 
  onMounted(loadData(farmers));
  
  const viewFarmer = (id) => {
  // Navigate to the dynamic ID-based route
  router.push(`/farmers/${id}`);
};
  </script>
  
  <style scoped lang="scss">
  .table-container {
    overflow-x: auto;
    margin-top: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  thead th {
    background-color: #a7e6b5;
    font-weight: bold;
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  tbody td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  tbody tr:hover td {
    background-color: #d9f5db;
    color: black;
  }
  
  .view-button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  @media (max-width: 767px) {
    .table-container {
      overflow-y: auto;
    }
  }
  </style>