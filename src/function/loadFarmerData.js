export default function loadFarmerData(farmerData, selectedId, farmersName, mobileNo,jilla,upjilla,prevLoanAmount) {
    const selectedFarmer = farmerData.find(farmer => farmer.id === selectedId);
    if (selectedFarmer) {
      farmersName.value = selectedFarmer?.farmersName;
      mobileNo.value = selectedFarmer?.mobileNo;
      //prevLoanAmount.value = selectedFarmer?.total;
      jilla.value = selectedFarmer.selectedGilla;
      upjilla.value = selectedFarmer.selectedUpjilla;
    }
}
  