const loadTransportPermitDetail = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/transport-permit/${id}`);
      const jsonData = await response.json();
      return jsonData; // Return the fetched data
    } catch (err) {
      console.error(err);
      throw new Error('Error loading transport permit detail.');
    }
};

export default loadTransportPermitDetail;
  