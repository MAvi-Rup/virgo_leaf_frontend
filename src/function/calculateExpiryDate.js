export function calculateExpiryDate(currentDate) {
    const expiry = new Date(currentDate);
    expiry.setDate(expiry.getDate() + 1);
    return expiry.toISOString().slice(0, 10);
  }
  