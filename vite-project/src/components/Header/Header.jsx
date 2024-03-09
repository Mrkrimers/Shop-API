/* eslint-disable react/prop-types */
import { useState } from 'react';
import getStore from '../storage/dataBase'
import { Select, Input, Button } from '@mantine/core';
import style from '../Header/style.module.scss'

function Header({ setStore }) {

    const [formData, setFormData] = useState({
        selectedOption: '',
        price: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleClick = async (event) => {
        event.preventDefault();
        const { result } = await getStore(formData);
        setStore(result);
    };

    return (
        <header className={style.header}>
            {/* <button onClick={() => console.log(formData)}>Check</button> */}

            <Select
                placeholder="Select filter"
                data={[{ value: 'price', label: 'Price' }, { value: 'product', label: 'Product' }, { value: 'brand', label: 'Brand' }]}
                value={formData ? formData.selectedOption : null}
                onChange={(value) => value !== null ? setFormData({ ...formData, selectedOption: value }) : window.location.reload()}
                clearable
            />

            <Input
                name="price"
                onChange={handleChange}
                placeholder="Enter data for filtering"
            />

            <Button onClick={handleClick} variant="filled">Request</Button>

        </header>

    )
}

export default Header;