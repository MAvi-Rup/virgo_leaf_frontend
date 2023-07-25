const printQrCodeValue = (qrCodeDataURL) => {
  const printDocument = `
    <html>
      <head>
        <style>
          @media print {
            .qr-code {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            p {
              text-align: center;
            }
          }
        </style>
      </head>
      <body>
        <div class="qr-code">
          <div>
            <h1>Virgo Tobacco</h1>
            <p>Tracking Code</p> <!-- Corrected the closing p tag here -->
            <img src="${qrCodeDataURL}" alt="QR Code" style="width: 200px; height: 200px;">
          </div>
        </div>
      </body>
    </html>
  `;

  const printFrame = document.createElement('iframe');
  printFrame.style.display = 'none';
  document.body.appendChild(printFrame);

  printFrame.contentDocument.open();
  printFrame.contentDocument.write(printDocument);
  printFrame.contentDocument.close();

  printFrame.onload = () => {
    printFrame.contentWindow.print();
    document.body.removeChild(printFrame);
  };
};

export default printQrCodeValue;