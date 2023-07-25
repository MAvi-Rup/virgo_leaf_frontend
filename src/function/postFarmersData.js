import { toast } from "vue3-toastify";

export const postFarmersData = async (formData) => {
    try {
      const response = await fetch('http://localhost:5001/farmers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        toast.success('Form submitted successfully!');
      } else {
        toast.error('Failed to post data:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting data:', error.message);
    }
  };