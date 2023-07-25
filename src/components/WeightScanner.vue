<template>
    <div class="input-wrap">
        <label for="weight">Weight Input:</label>
        <input v-model="weight" type="text" id="weight" class="base-input" />
        <button @click="submitWeight">Add Weight</button>
    </div>

    <div v-if="uniqueId">
        <InputComponent v-model="uniqueId" type="text" :label="'Farmer Id'" class="base-input" :disabled="true" />
    </div>
    <div v-if="farmerName">
        <InputComponent v-model="farmerName" type="text" :label="'Farmer Name'" class="base-input" :disabled="true" />
    </div>

    <div class="scanner-container">
        <div class="scanner-button" v-if="!showScanner" @click="toggleScanner">
            <span class="material-icons">qr_code_scanner</span>
        </div>

        <div class="scanner-popup" v-if="showScanner">
            <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded" />
            <div class="close-button" @click="toggleScanner">
                <span class="material-icons">close</span>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from "vue";
import { StreamBarcodeReader } from "vue-barcode-reader";
import { useRouter } from "vue-router";
import InputComponent from "./InputComponent.vue";
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

const qrcodeId = ref("");
const farmerName = ref("");
const uniqueId = ref("");
const weight = ref("");

const showScanner = ref(false);
let qrCodeScanner = null;

const router = useRouter();

const toggleScanner = () => {
    if (showScanner.value) {
        closeScanner();
    } else {
        openScanner();
    }
};

const openScanner = () => {
    showScanner.value = true;
};

const closeScanner = () => {
    if (qrCodeScanner) {
        qrCodeScanner.stop();
        qrCodeScanner = null;
    }
    showScanner.value = false;
};

const onDecode = (text) => {
    console.log(`Decoded text: ${text}`);
    const id = extractIdFromText(text);
    qrcodeId.value = id;
    fetchTransportPermit();
    closeScanner();
};

const onLoaded = () => {
    console.log("Scanner loaded and ready to scan.");
};

const extractIdFromText = (text) => {
    const id = text.split(" - ")[0];
    return id;
};


const fetchTransportPermit = async () => {
    if (!qrcodeId.value) return;

    try {
        const response = await fetch(`http://localhost:5001/transport-permit/${qrcodeId.value}`);
        const data = await response.json();
        if (data) {
            // If data is found, set the farmerName field with the retrieved name
            farmerName.value = data.farmersName;
            uniqueId.value = data.id;
        } else {
            // If no data is found, reset the farmerName field
            farmerName.value = "";
            toast.error("No Data Found")
        }
    } catch (error) {
        console.error('Error fetching transport permit:', error);
        farmerName.value = "";
    }
};
const submitWeight = async () => {
    if (!qrcodeId.value || !weight.value) {
        toast.error("Please enter the QR Code ID and weight.");
        return;
    }

    try {
        const data = { weight: weight.value };
        const response = await fetch(`http://localhost:5001/transport-permit/${qrcodeId.value}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
             // Clear the weight field after successful submission
            weight.value = '';
            farmerName.value ='';
            uniqueId.value = '';
            toast.success("Weight added successfully.");
           
        } else {
            toast.error("Failed to add weight.");
        }
    } catch (error) {
        console.error('Error submitting weight:', error);
        toast.error("An error occurred while submitting weight.");
    }
};
</script>
  
<style scoped>
.scanner-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    z-index: 999;
    margin-bottom: 30px;
}

.scanner-button {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: #007bff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 20px;
    transition: background-color 0.3s;
    /* Add transition for hover effect */
}

.scanner-button:hover {
    background-color: #0056b3;
    /* Change background color on hover */
}

.material-icons {
    font-size: 28px;
    color: #fff;
}

.close-button {
    position: fixed;
    bottom: -100px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #8ceded;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    z-index: 9999;
}

.close-button .material-icons {
    font-size: 18px;
    color: #007bff;
}

.scanner-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    width: 50%;
    /* Adjust the width as needed */
    height: 30%;
    /* Adjust the height as needed */
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (max-width: 768px) {
    .close-button {
        position: absolute;
        bottom: 0;
    }
}

.input-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.input-wrap label {
    width: 50px;
    margin-right: 10px;
    font-size: 16px;
}

.input-wrap input {
    padding: 8px 12px;
    font-size: 16px;
    width: 100%;
    max-width: 400px;
    border: 2px solid #ccc;
    border-radius: 4px;
    transition: 0.2s;
}

.input-wrap input:focus {
    outline: none;
    border-color: dodgerblue;
    box-shadow: 0 0 5px dodgerblue;
}

.input-wrap button {
    padding: 8px 16px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-left: 15px;
}



.input-wrap button:hover {
    background-color: #0056b3;
}

/* Additional styles for the .input-wrap div */
.input-wrap {
    background-color: #f2f2f2;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
    .input-wrap {
        flex-direction: column;
        align-items: stretch;
    }

    .input-wrap label {
        width: auto;
        margin-right: 0;
        margin-bottom: 5px;
    }

    .input-wrap input {
        max-width: none;
        margin-bottom: 10px;
    }
}
</style>
  