const loadDetailsFarmersData = async (farmerData,isLoading,error,id) => {
    try {
      const response = await fetch(`http://localhost:5001/farmer/${id}`);
      const jsonData = await response.json();
      farmerData.value = jsonData;
    } catch (err) {
      error.value = 'Error loading farmer data.';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
};

export default loadDetailsFarmersData;