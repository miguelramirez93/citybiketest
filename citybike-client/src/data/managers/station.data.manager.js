import axios from '../../axios/main.instance';

export default {
    getStationsInfoByDate: async (date) => {
        const { data } = await axios.post('station/by-date', { date });
        return data;
    }
}