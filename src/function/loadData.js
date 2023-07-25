const loadData =async (farmerData) => {
    try {
      const response = await fetch('http://localhost:5001/farmers');
      const jsonData = await response.json();
      return farmerData.value = jsonData;
    } catch (error) {
      console.error('Error loading farmer data:', error);
    }
}

export default loadData;