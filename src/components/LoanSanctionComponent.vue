<template>
  <div>
    <div class="input-wrapper">
      <label for="id">F'ID:</label>
      <select v-model="selectedId" @change="loadSelectedFarmerData">
        <option value="">Select ID</option>
        <option v-for="farmer in farmerData" :key="farmer._id" :value="farmer.id">
          {{ farmer.id }}
        </option>
      </select>
    </div>
    <InputComponent
      v-model="farmersName"
      type="text"
      :label="'Name'"
      class="base-input"
    />
    <InputComponent
      v-model="mobileNo"
      type="text"
      :label="'Mobile No'"
      class="base-input"
    />

    <div v-for="(item, index) in items" :key="index">
      <div class="input-wrapper">
        <span><label for="product" style="margin-right: 20px">Select:</label></span>
        <select
          v-model="item.accessory"
          @change="handleAccessoryChange(index, item.accessory)"
        >
          <option value="">Select Accessory</option>
          <option
            v-for="accessory in accessories"
            :key="accessory.name"
            :value="accessory.name"
          >
            {{ accessory.name }} ({{ accessory.price }} Tk.)
          </option>
        </select>
        <span>
          <label for="price">Qnt:</label>
          <input
            class="input_number"
            type="number"
            min="1"
            step="1"
            v-model.number="item.unit"
            @input="handleUnitChange(index, item.unit)"
          />

          <div class="rounded-button-container">
            <button class="rounded-button" @click="removeItem(items, index)">
              <span class="material-icons">remove</span>
            </button>
            <button class="rounded-button" type="button" @click="addItem(items)">
              <span class="material-icons">add</span>
            </button>
          </div>
        </span>
      </div>
    </div>
    <div class="total-container">
      <p class="total">Total Value: <b>{{ total }}</b> Tk.</p>
      <p class="total-text">Previous Loan Amount: {{ prevLoanAmount }} Tk.</p>
      <button
        class="submit-button"
        type="submit"
        @click="formSubmit(total, selectedFarmer._id)"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import InputComponent from "./InputComponent.vue";
import loadFarmerData from "../function/loadFarmerData";
import loadTransportPermit from "../function/loadTransportPermit";
import {
  addItem,
  handleAccessoryChange,
  handleUnitChange,
  removeItem,
} from "../function/loanSanctionFunction";
import loadAgroProducts from "../function/loadAgroProducts";
import { toast } from "vue3-toastify";

const farmersName = ref("");
const mobileNo = ref("");
const selectedId = ref("");
const selectedFarmer = ref(null);
const farmerData = ref([]);
const accessories = ref([]);
const prevLoanAmount = computed(() => {
  return selectedFarmer.value?.total ?? 0;
});


const items = ref([{ accessory: "", unit: 1 }]);

const total = computed(() => {
  const previousAmount = selectedFarmer.value?.total || 0;

  return items.value.reduce((acc, item) => {
    const accessory = accessories.value.find((a) => a.name === item.accessory);
    const price = accessory ? accessory.price : 0;
    return acc + price * item.unit;
  }, previousAmount);
});


const formSubmit = (total) => {
  const url = `http://localhost:5001/transport-permit/${selectedFarmer.value._id}`;
  const data = {
    total: total,
  };

  if (total !== "") {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        toast.success("Product Updated Successfully");
        resetForm();
        loadTransportPermit(farmerData); // Reset the form after successful submission
      })
      .catch((error) => {
        toast.error("Form submission failed");
      });
  } else {
    toast.error("Total value cannot be empty");
  }
};

const resetForm = () => {
  farmersName.value = "";
  mobileNo.value = "";
  selectedId.value = "";
  selectedFarmer.value = null;
  items.value = [{ accessory: "", unit: 1 }];
};

const loadSelectedFarmerData = () => {
  selectedFarmer.value = farmerData.value.find(
    (farmer) => farmer.id === selectedId.value,
    items.value = [{ accessory: "", unit: 1 }]
  );
  console.log(selectedFarmer.value);
  loadFarmerData(
    farmerData.value,
    selectedId.value,
    farmersName,
    mobileNo,
    prevLoanAmount
  );
  
  console.log(prevLoanAmount);
};

onMounted(loadTransportPermit(farmerData), loadAgroProducts(accessories));
</script>

<style lang="scss" scoped>
.input-wrapper {
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
    margin-right: 15px; /* Adjusted margin to create space between select and input */

    &:focus {
      outline: none;
      border-color: dodgerblue;
      box-shadow: 0 0 5px dodgerblue;
    }
  }

  span {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
  }

  input {
    padding: 8px 12px;
    font-size: 16px;
    width: 80%;
    max-width: 150px;
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
    width: 40px;
    margin-right: 5px;
    margin-left: 20px;
  }

  .rounded-button-container{
    display: flex;
  }

}

/* Media Query for smaller screens */
@media (max-width: 768px) {
  .input-wrapper {
    display: flex;
    flex-wrap: wrap;

    justify-content: flex-start;

    label{
      margin-left: 0;
    }
    span {
      display: flex;
      flex-wrap: wrap;
     
      justify-content: center;
      align-items: center;
    }
  }

  select {
    margin-right: 0; /* Remove the right margin for select on small screens */
    margin-bottom: 10px; /* Add a bottom margin to create space between select and input */
  }
}

.rounded-button {
  display: flex;
  align-items: center;
  margin-left: 5px;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4caf50;
  border: 1px solid #ccf1af;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.rounded-button:hover {
  background-color: #caf2a9;
}

.total-container {
  width: 25%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

.total-text {
  font-size: 18px;
  font-weight: bold;
}
.total-text {
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  background-color: #E74C3C;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  z-index: 999;
}

/* Media Query for smaller screens */
@media (max-width: 768px) {
  .total-text {
    position: fixed;
    bottom: 20px;
    top: auto; /* Reset the top position */
    font-size: 8px;
  }
}



.submit-button {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: dodgerblue;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}
.rounded-button {
  width: 40px;
  height: 40px;
  margin: 5px; /* Add a small margin around the rounded buttons */
}


.submit-button:hover {
  background-color: royalblue;
  box-shadow: 0 0 5px rgba(30, 144, 255, 0.5);
}

@media (max-width: 768px) {
  .total-container {
    width: 100%;
    margin: auto;
    margin-top: 20px;
  }
}
.qrcode-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.input-wrap {
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    width: 50px;
    margin-right: 10px;
  }

  input {
    padding: 8px 12px;
    font-size: 16px;
    width: 100%;
    max-width: 400px;
    border: 2px solid #ccc;
    border-radius: 4px;
    transition: 0.2s;
  }

  input:focus {
    outline: none;
    border-color: dodgerblue;
    box-shadow: 0 0 5px dodgerblue;
  }
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
