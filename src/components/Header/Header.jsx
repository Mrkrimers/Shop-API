/* eslint-disable react/prop-types */
import { useState } from 'react';
import getStore from '../storage/dataBase'
import { Select, Input, Button } from '@mantine/core';
import style from '../Header/style.module.scss'

function Header({ setStore }) {
    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 5;

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
        try {
            setStore([])
            const { result } = await getStore(formData);
            setStore(result);
        } catch (error) {
            console.error('Произошла ошибка при получении данных:', error);
            if (retryCount < maxRetries) {
                console.log(`Повторяем запрос... Колличество попыток${retryCount}`);
                setRetryCount(retryCount + 1);
                handleClick(event); // Повторяем запрос
            } else {
                console.error('Достигнуто максимальное количество попыток повтора.');
            }
        }
    };

    return (
        <header className={style.header}>

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