<template>
  <main id="Home-page">
    <h1>Farmer's Registration Page</h1>
    <InputComponent v-model="farmersName" type="text" :label="'Name'" class="base-input" />
    <InputComponent v-model="fatherName" type="text" :label="'Father Name'" class="base-input" />
    <div class="input-wrap">
      <label for="gilla">Gilla:</label>
      <select v-model="selectedGilla" class="base-input" @change="updateUpjillaOptions" id="gilla">
        <option v-for="gilla in gillaOptions" :key="gilla.value" :value="gilla.value">{{ gilla.label }}</option>
      </select>
    </div>
    <div class="input-wrap">
      <label for="upjilla">Upjilla:</label>
      <select v-model="selectedUpjilla" class="base-input" id="upjilla">
        <option v-for="upjilla in upjillaOptions" :key="upjilla.value" :value="upjilla.value">{{ upjilla.label }}</option>
      </select>
    </div>
    <InputComponent v-model="village" type="text" :label="'Village'" class="base-input" />
    <InputComponent v-model="nid" type="number" :label="'NID'" class="base-input" />
    <InputComponent v-model="mobileNo" type="number" :label="'Mobile Number'" class="base-input" />
    <div class="input-wrap">
        <label for="Location">Location</label>
        <input v-model="location" type="text" id="location" class="base-input" />
        <button @click="getLocationCoordinates" class="location-button"><span class="material-icons">location_on</span></button>
    </div>
    <InputComponent v-model="plantation" type="text" :label="'Plantation'" class="base-input" />
    <InputComponent v-model="target" type="text" :label="'Target'" class="base-input" />
    <InputComponent v-model="accountNo" type="number" :label="'Account Number'" class="base-input" />
    <InputComponent v-model="bankName" type="text" :label="'Bank Name'" class="base-input" />
    <InputComponent v-model="branch" type="text" :label="'Branch'" class="base-input" />
    <InputComponent v-model="routingNo" type="number" :label="'Routing Number'" class="base-input" />
    <div class="input-wrap">
      <input type="file" class="base-input" @change="handleFileInputChange" />
    </div>
    <InputComponent type="submit" @submit="submitForm">Submit</InputComponent>
  </main>
</template>

<script setup>

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import InputComponent from '../components/InputComponent.vue';
import { ref, watch } from 'vue';
import clearFormData from '../function/clearFormData';
import { jillaUpjilaMap } from "../Data/jillaUpjilaMap"
import { postFarmersData } from "../function/postFarmersData"



const farmersName = ref('');
const fatherName = ref('');
const village = ref('');
const nid = ref('');
const mobileNo = ref('');
const plantation = ref('');
const target = ref('');
const location = ref('');
const accountNo = ref('');
const bankName = ref('');
const branch = ref('');
const routingNo = ref('');
let farmerPic = ref(null);
const imageUrl= ref('');
const selectedGilla = ref('');
const selectedUpjilla = ref('');

const upjillaOptions = ref([]);
const gillaOptions = ref(Object.keys(jillaUpjilaMap).map(jilla => ({ label: jilla, value: jilla })));

const updateUpjillaOptions = () => {
  const selectedJillaValue = selectedGilla.value;
  if (selectedJillaValue && jillaUpjilaMap.hasOwnProperty(selectedJillaValue)) {
    upjillaOptions.value = jillaUpjilaMap[selectedJillaValue].map(upjilla => ({ label: upjilla, value: upjilla }));
  } else {
    upjillaOptions.value = [];
  }
};

watch(selectedGilla, updateUpjillaOptions);
// Form Submit Function

const handleFileInputChange = (event) => {
    farmerPic.value = event.target.files[0];
  };


const submitForm = async (event) => {
  event.preventDefault();
  if (!farmersName.value || !fatherName.value || !village.value || !nid.value || !mobileNo.value || !location.value || !plantation.value || !target.value || !accountNo.value || !bankName.value || !branch.value || !routingNo.value || !farmerPic.value || !selectedGilla.value || !selectedUpjilla.value) {
    // Display an error toast or message
    // You can use a toast library like "vue-toastification" or display an error message in the UI
    toast.error('Please fill in all the required fields.');
    return;
  }
  const data = new FormData();
    data.append('file', farmerPic.value);
    data.append('upload_preset', 'virgo-leaf');
    data.append('cloud_name', 'dxmcvglht');

    try {
      //const formData = prepareFormData();
      const response = await fetch('https://api.cloudinary.com/v1_1/dxmcvglht/image/upload', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const imageData = await response.json();
        imageUrl.value=imageData.url;
        // Do something with the uploaded image data, such as storing it in the database
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
    const formData = {
    farmersName: farmersName.value,
    fatherName: fatherName.value,
    village: village.value,
    nid: nid.value,
    mobileNo: mobileNo.value,
    location: location.value,
    plantation: plantation.value,
    target: target.value,
    accountNo: accountNo.value,
    bankName: bankName.value,
    branch: branch.value,
    routingNo: routingNo.value,
    farmerPic: farmerPic.value,
    selectedGilla: selectedGilla.value,
    selectedUpjilla: selectedUpjilla.value,
    url: imageUrl.value
  };
  await postFarmersData(formData)
  // Clear the form data after submission
  event.target.reset();
  clearFormData({
    farmersName, fatherName, village, nid, mobileNo, location, plantation, target, accountNo, bankName, branch, routingNo, farmerPic, selectedGilla, selectedUpjilla
  });

}
const getLocationCoordinates = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        location.value = `${latitude}, ${longitude}`;
      },
      (error) => {
        console.error('Error getting location:', error.message);
        toast.error('Error getting location. Please try again.');
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
    toast.error('Geolocation is not supported by this browser.');
  }
};

</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}

.input-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  select,
  input {
    padding: 8px 12px;
    font-size: 16px;
    width: 50%; /* Set the width to 50% */
    border: 2px solid #ccc;
    border-radius: 4px;
    transition: 0.2s;
    margin-left: 15px;

    &:focus {
      outline: none;
      border-color: dodgerblue;
      box-shadow: 0 0 5px dodgerblue;
    }
  }

  label {
    width: 40px;
    margin-right: 10px;
  }
  
  .location-button {
    background-color: #4caf50;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-left: 10px;
  }

  .location-button:hover {
    background-color: #45a049;
  }
}

@media screen and (max-width: 600px) {
  .input-wrap {
    flex-direction: column;
    align-items: flex-start;

    select,
    input {
      width: 100%; /* Set the width to 100% for mobile devices */
      margin-left: 0;
      margin-top: 10px;
    }

    label {
      width: auto;
      margin-right: 10px;
    }
    
    .location-button {
      margin-left: 0;
      margin-top: 10px;
    }
  }
}
</style>
