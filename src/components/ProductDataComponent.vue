<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product._id">
          <td>{{ product.name }}</td>
          <td>{{ product.price }} Tk</td>
          <td>
            <button @click="showEditModal(product)">Edit</button>
            <button class="delete-button" @click="deleteProduct(product._id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">
            <button class="add-button" @click="openAddProduct">+</button>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
  <!-- Edit Product -->
  <div class="modal" v-if="showModal">
    <!-- Modal content -->
    <div class="modal-content">
      <h2>Edit Product</h2>
      <label>Name:</label>
      <input v-model="editedProduct.name" type="text" />
      <label>Price:</label>
      <input v-model="editedProduct.price" type="number" />
      <div class="modal-buttons">
        <button @click="saveProduct">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </div>

  <!-- Adding New Product -->
  <div class="modal" v-if="showModalforAddProduct">
    <!-- Modal content -->
    <div class="modal-content">
      <h2>Add Product</h2>
      <label>Name:</label>
      <input v-model="newAddedProductName" type="text" />
      <br />
      <label>Price:</label>
      <input v-model="newAddedProductPrice" type="number" />
      <div class="modal-buttons">
        <button @click="addNewProduct">Save</button>
        <button @click="cancelAdding">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import loadAgroProducts from "../function/loadAgroProducts";
import { ref, onMounted } from "vue";
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

const newAddedProductName = ref("");
const newAddedProductPrice = ref("");
const products = ref([]);
const showModal = ref(false);
const showModalforAddProduct = ref(false);
const editedProduct = ref({ name: "", price: 0 });

onMounted(() => {
  loadAgroProducts(products);
});

const showEditModal = (product) => {
  editedProduct.value = { ...product };
  showModal.value = true;
};

const cancelEdit = () => {
  showModal.value = false;
};

const saveProduct = () => {
  const url = `http://localhost:5001/products/${editedProduct.value._id}`;
  const updatedProduct = {
    updateName: editedProduct.value.name,
    updatePrice: editedProduct.value.price,
  };

  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  })
    .then((response) => response.json())
    .then((data) => {
      toast.success("Product Updated Successfully");
      loadAgroProducts(products);
    })
    .catch((error) => {
      console.log("Error updating product:", error);
    });

  showModal.value = false;
};
const deleteProduct = (productId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) {
    return; // User cancelled the deletion
  }

  const url = `http://localhost:5001/products/${productId}`;

  axios
    .delete(url)
    .then((response) => {
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        loadAgroProducts(products);
      } else {
        toast.error("Product not found");
      }
    })
    .catch((error) => {
      console.log("Error deleting product:", error);
    });
};

const openAddProduct = () => {
  // Implement your add product functionality here
  showModalforAddProduct.value = true;
};

const addNewProduct = () => {
  const newProduct = {
    name: newAddedProductName.value,
    price: newAddedProductPrice.value,
  };

  axios
    .post("http://localhost:5001/products", newProduct)
    .then((response) => {
      
      loadAgroProducts(products);
      showModalforAddProduct.value = false;
      newAddedProductName.value = "";
      newAddedProductPrice.value = "";
      toast.success("Product added successfully");
    })
    .catch((error) => {
      console.log("Error adding product:", error);
      toast.error("Failed to add product");
    });
};

const cancelAdding = () => {
  showModalforAddProduct.value = false;
  newAddedProductName.value = "";
  newAddedProductPrice.value = "";
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    max-width: 400px;

    .modal-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    input {
      width: 100%;
      padding: 5px;
      margin-bottom: 10px;
    }

    .modal-buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;

      button {
        margin-left: 10px;
      }
    }
  }
}

.table-container {
  overflow-x: auto;
  margin-top: 20px;
  width: 60%;
  margin: auto;

  @media (max-width: 768px) {
    width: 100%; /* Set width to 100% for screens up to 768px wide */
  }
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

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button {
  background-color: #ff5252;
  margin-left: 10px;
}

.add-button {
  background-color: #56f6a3;
  font-size: 30px;
  width: 50px;
  height: 50px;
  margin-top: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #48d790;
  }
}

/* Media Query for smaller screens */
@media (max-width: 768px) {
  .table-container {
    width: 100%; /* Set width to 100% for screens up to 768px wide */
  }

  .modal-content {
    max-width: 90%; /* Reduce the max-width of the modal content on small screens */
  }

  button {
    font-size: 14px; /* Reduce the font size of buttons on small screens */
    padding: 8px 12px; /* Adjust the padding of buttons on small screens */
  }

  .modal-buttons {
    margin-top: 10px; /* Reduce the top margin of modal-buttons on small screens */
  }

  .add-button {
    font-size: 24px; /* Reduce the font size of add-button on small screens */
    width: 40px; /* Adjust the width of add-button on small screens */
    height: 40px; /* Adjust the height of add-button on small screens */
    margin-top: 10px; /* Reduce the top margin of add-button on small screens */
  }
  
  .delete-button {
    margin-left: 0;
    margin-top: 5px;
  }
  
  /* Ensure the modal is centered on small screens */
  .modal {
    align-items: center;
    padding: 10px; /* Add some padding to center the modal properly */
  }
}
</style>
