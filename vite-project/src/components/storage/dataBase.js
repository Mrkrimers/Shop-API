import md5 from 'md5';
import axios from 'axios';

const password = 'Valantis';

const auth = () => {
    const timestamp = new Date().toISOString().slice(0, 10).split('-').join('');
    return md5(`${password}_${timestamp}`)
}

const authorizationString = auth(password)

const getAllID = async () => {
    try {
        const response = await axios.post("http://api.valantis.store:40000/", {
            action: "get_ids",
            params: { "offset": 0, "limit": null }
        }, {
            headers: { 'Content-Type': 'application/json', 'X-Auth': authorizationString }
        });

        return response.data.result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

const filteredStore = async (req) => {
    try {

        console.log(req);

        const { price } = req;
        if (price !== undefined) {
            (!isNaN(price) && price !== "") ? req.price = parseInt(req.price) : alert('НЕКОРЕКТНЫЙ ВВОД ДАННЫХ')
        }

        const response = await axios.post("http://api.valantis.store:40000/", {
            "action": "filter",
            "params": req
        }, {
            headers: { 'Content-Type': 'application/json', 'X-Auth': authorizationString }
        });

        console.log('filtered +++');
        return response.data.result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


const getStore = async (req) => {
    try {
        const response = await axios.post("http://api.valantis.store:40000/", {
            action: "get_items",
            params: { "ids": req === undefined ? await getAllID() : await filteredStore(req) }
        }, {
            headers: { 'Content-Type': 'application/json', 'X-Auth': authorizationString }
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};



export default getStore;