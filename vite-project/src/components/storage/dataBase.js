import md5 from 'md5';
import axios from 'axios';

const password = 'Valantis';

const auth = () => {
    const timestamp = new Date().toISOString().slice(0, 10).split('-').join('');
    return md5(`${password}_${timestamp}`)
}

const authorizationString = auth(password)

const getIDs = async () => {
    try {
        const response = await axios.post("http://api.valantis.store:40000/", {
            action: "get_ids",
            params: { "offset": 0, "limit": 47 }
        }, {
            headers: { 'Content-Type': 'application/json', 'X-Auth': authorizationString }
        });

        return response.data.result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

const getStore = async () => {
    try {
        const arrayIDs = await getIDs();

        const response = await axios.post("http://api.valantis.store:40000/", {
            action: "get_items",
            params: { "ids": arrayIDs }
        }, {
            headers: { 'Content-Type': 'application/json', 'X-Auth': authorizationString }
        });

        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export default getStore;