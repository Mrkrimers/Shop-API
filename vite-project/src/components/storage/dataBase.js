import md5 from 'md5';
import axios from 'axios';
// import CryptoJS from "crypto-js";

const password = 'Valantis';
// const timestamp = new Date().toISOString().slice(0, 10).split('-').join('');
// const data = `${password}_${timestamp}`;

// const authorizationString = CryptoJS.MD5(data).toString();

const auth = () => {
    const timestamp = new Date().toISOString().slice(0, 10).split('-').join('');
    return md5(`${password}_${timestamp}`)
}

const authorizationString = auth(password)

// const id = '1789ecf3-f81c-4f49-ada2-83804dcc74b0'

const arrID = ['1789ecf3-f81c-4f49-ada2-83804dcc74b0', '2b7c7643-6852-4562-8a72-7666c72b3518', '9f2722a8-dac6-4f71-b877-1731d30ae6db']


// const getStore = async () => {
//     await fetch("https://api.valantis.store:41000/", {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', 'X-Auth': authorizationString },
//         body: JSON.stringify({ action: 'get_items', params: { "ids": [id] } }),
//     }).then(res => {
//         res.json().then(results => {
//             let result = results
//             if (result !== undefined) {
//                 console.log(result.result)
//                 return result
//             }
//         })
//     });
// }

const getStore = async () => {
    try {
        const response = await axios.post("http://api.valantis.store:40000/", {
            action: "get_items",
            params: { "ids": arrID }
        }, {
            headers: { 'Content-Type': 'application/json', 'X-Auth': authorizationString }
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Optionally rethrow the error
    }
};

const data = await getStore()
export default data;