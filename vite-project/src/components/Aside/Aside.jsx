/* eslint-disable react/prop-types */
import { useState } from 'react';
import getStore from '../storage/dataBase'


function AsideForm({ setStore }) {

    const [formData, setFormData] = useState({
        selectedOption: '',
        price: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (value === 'select') window.location.reload();
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { result } = await getStore(formData);
        setStore(result);
    };

    return (
        <aside className='filterForm'>
            <button onClick={() => console.log(formData)}>Check</button>
            <form onSubmit={handleSubmit}>
                <select
                    name="selectedOption"
                    value={formData.selectedOption}
                    onChange={handleChange}
                >

                    <option value="select">Select filter</option>
                    <option value="price">Price</option>
                    <option value="product">Product</option>
                    <option value="brand">Brand</option>

                </select>

                <input
                    type="text"
                    name="price"
                    onChange={handleChange}
                    placeholder="Enter data for filtering"
                />
                <button type="submit">Request</button>
            </form>

        </aside>

    )
}

export default AsideForm;