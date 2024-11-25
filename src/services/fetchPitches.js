import axios from 'axios';

const fetchPitches=async ()=>{
    const response=await axios.get('/api/pitch');
    return response.data;
}

const pitchServices={
    fetchPitches
}

export default pitchServices;