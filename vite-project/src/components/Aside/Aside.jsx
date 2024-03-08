/* eslint-disable react/prop-types */
import { useState } from 'react';
import getStore from '../storage/dataBase'
import { Select, Input, Button } from '@mantine/core';

function AsideForm({ setStore }) {

    const [formData, setFormData] = useState({
        selectedOption: '',
        price: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (value === null) window.location.reload();
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

            <Select
                placeholder="Select filter"
                data={[{ value: 'price', label: 'Price' }, { value: 'product', label: 'Product' }, { value: 'brand', label: 'Brand' }]}
                value={formData ? formData.selectedOption : null}
                onChange={(value) => setFormData({ ...formData, selectedOption: value })}
                clearable
            />

            <Input
                name="price"
                onChange={handleChange}
                placeholder="Enter data for filtering"
            />

            <Button onClick={handleSubmit} variant="filled">Request</Button>

        </aside>

    )
}

export default AsideForm;