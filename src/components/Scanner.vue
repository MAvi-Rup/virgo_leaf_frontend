<template>
  <div class="scanner-container">
    <div
      class="scanner-button"
      v-if="!showScanner"
      @click="toggleScanner"
    >
      <span class="material-icons">qr_code_scanner</span>
    </div>

    <div
      class="scanner-popup"
      v-if="showScanner"
    >
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
  navigateToQRCode(id);
  closeScanner();
};

const onLoaded = () => {
  console.log("Scanner loaded and ready to scan.");
};

const extractIdFromText = (text) => {
  const id = text.split(" - ")[0];
  return id;
};

const navigateToQRCode = (id) => {
  router.push(`/transport-permit/${id}`);
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
  transition: background-color 0.3s; /* Add transition for hover effect */
}

.scanner-button:hover {
  background-color: #0056b3; /* Change background color on hover */
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
  width: 50%; /* Adjust the width as needed */
  height: 30%; /* Adjust the height as needed */
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

</style>
