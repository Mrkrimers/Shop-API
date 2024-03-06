import { useEffect, useState } from 'react';
import getStore from '../components/storage/dataBase'
import { Pagination } from '@mantine/core';


function PreviewPage() {
    const [store, setStore] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [size] = useState(50);
    const LInd = currentPage * size;
    const FInd = LInd - size;
    const curCart = store.slice(FInd, LInd)

    useEffect(() => {
        async function getRes() {
            const { result } = await getStore();
            setStore(result);
        }
        getRes();
    }, [])


    const [formData, setFormData] = useState({
        selectedOption: '',
        price: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { selectedOption, price } = formData;
        const request = { [selectedOption]: price };

        const { result } = await getStore(request);
        setStore(result);
    };


    return (
        <div>

            <button onClick={() => console.log(store)}>+++</button>

            <aside className='filterForm'>

                <form onSubmit={handleSubmit}>
                    <select
                        name="selectedOption"
                        value={formData.selectedOption}
                        onChange={handleChange}
                    >

                        <option value="" onClick={() => console.log("HI")} >Select filter</option>
                        <option value="price">Price</option>
                        <option value="product">Product</option>
                        <option value="brand">Brand</option>

                    </select>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                    />
                    <button type="submit">Submit</button>
                </form>

            </aside>

            <ol>
                {curCart.map((el, i) => <li key={i}>{el.product}</li>)}
            </ol>

            <Pagination
                total={Math.ceil(store.length / size)}
                position="center"
                style={{ marginTop: "40px" }}
                onChange={setCurrentPage}
                value={currentPage}
            />
        </div >
    );
}

export default PreviewPage;