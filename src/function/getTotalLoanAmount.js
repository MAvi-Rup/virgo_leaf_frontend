const getTotalLoanAmount = async (totalLoan) => {
    try {
      const response = await fetch('http://localhost:5001/total-loan');
      const jsonData = await response.json();
      totalLoan.value = jsonData.totalLoan; // Set the value property of totalLoan
  
      return totalLoan;
    } catch (error) {
      console.error('Error loading farmer loan data:', error);
    }
  };
  
  export default getTotalLoanAmount;
  