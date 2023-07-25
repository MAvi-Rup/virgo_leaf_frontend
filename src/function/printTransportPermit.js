const printTransportPermit = (employeeData) => {
  const printDocument = `
    <html>
      <head>
        <style>
          @media print {
            #print-template {
              display: grid;
              grid-template-columns: 33.33% 33.33% 33.33%;
              justify-content: center;
            }
            .header {
              text-align: center;
            }
            .content {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 10px;
            }
            .middle-column {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
            <h1>Virgo Tobaco Limited</h1>
            <h2>Transport Permit (TP)</h2>
        </div>
        <div id="print-template">
            <div class="left-column">
              <h3>Farmer's ID: ${employeeData.value.id}</h3>
              <h3>Farmer's Name: ${employeeData.value.farmersName}</h3>
              <h3>Mobile Number: ${employeeData.value.mobileNo}</h3>
              <h3>Zilla: ${employeeData.value.farmerJilla}</h3>
              <h3>UpZilla: ${employeeData.value.farmerUpjilla}</h3>
            </div>
            <div class="middle-column">
              <img src="https://i.ibb.co/yq7hVy8/maskable-icon.png" alt="Employee Image" width="140">
            </div>
            <div class="right-column">
              <h3>Buying Center: ${employeeData.value.buyingCenter}</h3>
              <h3>Buying Date: ${employeeData.value.buyingDate}</h3>
              <h3>Expiry Date: ${employeeData.value.expiryDate}</h3>
              <h3>Tobacco Type: ${employeeData.value.type}</h3>
              <h3>Bale Quantity: ${employeeData.value.baleQuantity}</h3>
            </div>
        
        </div>
        <div id="print-template">
          <div class="left-column">
            <hr />
            FT's Signature

          </div>
          <div class="middle-column"> 
            <div>
              <hr />
              Farmer's Signature
            </div>         
            
          </div>
          <div class="right-column">
            <hr />
            Authorised's Signature

          </div>
        </div>
      </body>
    </html>
  `;

  const printFrame = document.querySelector('iframe');
  printFrame.contentDocument.open();
  printFrame.contentDocument.write(printDocument);
  printFrame.contentDocument.close();

  printFrame.onload = () => {
    printFrame.contentWindow.print();
  };
};

export default printTransportPermit;