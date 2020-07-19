import axios from '../../axios/main.instance';

export default {
    getLocationInfo: async () => {
        const { data } = await axios.get('location');
        return data;
    }
}