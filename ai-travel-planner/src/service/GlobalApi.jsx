const BASE_URL = 'https://places.googleapis.com/v1/places:searchText'
const config = {
    headers:{
        'Content-Type': 'application/json',
        'X-Google-Api-Key' : import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        
    }
}