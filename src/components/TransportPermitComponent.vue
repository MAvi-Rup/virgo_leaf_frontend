<template>
  <div>
    <div class="input-wrap">
      <label for="id">F'ID:</label>
      <select v-model="selectedId" @change="loadSelectedFarmerData" :style="{ width: isMobile ? '100%' : '50%', marginLeft: isMobile ? '0' : '15px' }">
        <option value="">Select ID</option>
        <option v-for="farmer in farmerData" :key="farmer.id" :value="farmer.id">{{ farmer.id }}</option>
      </select>
    </div>
    <InputComponent v-model="farmersName" type="text" :label="'Name'" class="base-input" />
    <InputComponent v-model="mobileNo" type="text" :label="'Mobile No'" class="base-input" />
    <div class="input-wrap">
      <label for="buyingCenter">Buying Center:</label>
      <select v-model="buyingCenter" class="base-input" :style="{ width: isMobile ? '100%' : '50%', marginLeft: isMobile ? '0' : '15px' }">
        <option value="">Select Buying Center</option>
        <option value="ManikGonj">ManikGonj</option>
        <option value="Kushtia">Kushtia</option>
        <option value="Chittagong">Chittagong</option>
      </select>
    </div>
    <InputComponent v-model="tobacoType" type="text" :label="'Tobacco Type'" class="base-input" />
    <InputComponent v-model="baleQuantity" type="text" :label="'Bale Quantity'" class="base-input" />
    <InputComponent type="submit" @submit="submitForm">Submit</InputComponent>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import InputComponent from './InputComponent.vue';
import { calculateExpiryDate } from '../function/calculateExpiryDate';
import loadData from '../function/loadData'
import loadFarmerData from '../function/loadFarmerData';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const farmersName = ref('');
const mobileNo = ref('');
const baleQuantity = ref('');
const selectedId = ref('');
const farmerData = ref([]);
const farmerJilla = ref('')
const farmerUpjilla = ref('')
const tobacoType = ref('')
const buyingCenter = ref('')

const currentDate = new Date();
const buyingDate = ref(currentDate.toISOString().slice(0, 10))
const expiryDate = ref(calculateExpiryDate(currentDate))

const loadSelectedFarmerData = () => {
  loadFarmerData(farmerData.value, selectedId.value, farmersName, mobileNo, farmerJilla, farmerUpjilla);
};
const submitForm = async (event) => {
  event.preventDefault();

  const data = {
    id: selectedId.value,
    farmersName: farmersName.value,
    mobileNo: mobileNo.value,
    baleQuantity: baleQuantity.value,
    buyingDate: buyingDate.value,
    expiryDate: expiryDate.value,
    farmerJilla: farmerJilla.value,
    farmerUpjilla: farmerUpjilla.value,
    buyingCenter: buyingCenter.value,
    type: tobacoType.value
  };

  if (baleQuantity.value !== "") {
    // Check if the ID has a previous transport permit
    const hasExistingPermit = await checkExistingTransportPermit(selectedId.value);

    if (!hasExistingPermit) {
      // ID does not have a previous permit, proceed to submit the form
      try {
        const response = await fetch('http://localhost:5001/transport-permit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          toast.success('Data successfully posted');
          // Handle the response from the server if needed
          // Reset the form fields after successful submission
          selectedId.value = '';
          farmersName.value = '';
          mobileNo.value = '';
          baleQuantity.value = '';
          buyingCenter.value = '';
          tobacoType.value = '';
          event.target.reset();
        } else {
          // Handle error response from server (optional)
          toast.error('This id already has a Transport Permit');
          selectedId.value = '';
          farmersName.value = '';
          mobileNo.value = '';
          baleQuantity.value = '';
          buyingCenter.value = '';
          tobacoType.value = '';
          event.target.reset();
        }
      } catch (error) {
        console.error('Error pushing data to the database:', error);
        // Handle any errors that occurred during the request
        toast.error('Error posting data to the server');
      }
    } else {
      // Show error using toast when a transport permit with the same ID already exists
      toast.error("Transport permit with this ID already exists.");
    }
  } else {
    toast.error("Field Can not be Empty.");
  }
};


const isMobile = computed(() => {
  return window.innerWidth <= 768;
});

onMounted(loadData(farmerData));

// Frontend Code
const checkExistingTransportPermit = async (id) => {
  try {
    const response = await fetch(`http://localhost:5001/transport-permit/exists/${id}`);
    const data = await response.json();
    return data; // Return true if a permit exists, false otherwise
  } catch (error) {
    console.error('Error checking existing transport permit:', error);
    return false;
  }
};

</script>

<style lang="scss" scoped>

.input-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  select {
    padding: 8px 12px;
    font-size: 16px;
    width: 100%;
    max-width: 400px;
    border: 2px solid #ccc;
    border-radius: 4px;
    transition: 0.2s;
    
    &:focus {
      outline: none;
      border-color: dodgerblue;
      box-shadow: 0 0 5px dodgerblue;
    }
  }

  label {
    width: 50px;
    margin-right: 10px;
  }
}

label {
  width: 40px;
  margin-right: 10px;
}

@media (max-width: 768px) {
  .input-wrap {
    flex-direction: column;
    align-items: stretch;
  }

  select {
    max-width: 350px;
    margin-left: 0;
    width: 100%;
  }
}
</style>
