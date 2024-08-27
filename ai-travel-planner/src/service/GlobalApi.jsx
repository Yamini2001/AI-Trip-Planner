
import axios from 'axios';

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const fetchPhoto = async (query) => {
  try {
    const response = await axios.get(UNSPLASH_API_URL, {
      params: {
        query: query,
        client_id: UNSPLASH_ACCESS_KEY,  // Use the Access Key here
        per_page: 1, // Get one photo
      }
    });
    return response.data.results[0]?.urls.regular || 'https://via.placeholder.com/1000?text=No+Photo+Found';
  } catch (error) {
    console.error('Error fetching photo:', error.message);
    return 'https://via.placeholder.com/1000?text=Error+Fetching+Photo';
  }
};

export default fetchPhoto;
 
export const PHOTO_REF_URL = 'https://via.placeholder.com/1000?text=Photo+Not+Available';
