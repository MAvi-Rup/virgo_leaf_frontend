const clearFormData = ({
  farmersName,
  fatherName,
  village,
  nid,
  mobileNo,
  location,
  plantation,
  target,
  accountNo,
  bankName,
  branch,
  routingNo,
  farmerPic,
  selectedGilla,
  selectedUpjilla
}) => {
  farmersName.value = '';
  fatherName.value = '';
  village.value = '';
  nid.value = '';
  mobileNo.value = '';
  location.value = '';
  plantation.value = '';
  target.value = '';
  accountNo.value = '';
  bankName.value = '';
  branch.value = '';
  routingNo.value = '';
  farmerPic.value = '';
  selectedGilla.value = '';
  selectedUpjilla.value = '';
};

export default clearFormData;
