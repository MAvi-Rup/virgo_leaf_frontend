const getTotalLoanNumber = async (totalLoan) => {
    try {
      const response = await fetch('http://localhost:5001/total-loan-sanction');
      const jsonData = await response.json();
      totalLoan.value = jsonData.totalTransportPermits; // Set the value property of totalLoan
  
      return totalLoan;
    } catch (error) {
      console.error('Error loading farmer loan data:', error);
    }
  };
  
  export default getTotalLoanNumber;
  