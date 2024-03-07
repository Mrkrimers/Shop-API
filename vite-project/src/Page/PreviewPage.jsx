import { useEffect, useState } from 'react';
import getStore from '../components/storage/dataBase'
import { Pagination } from '@mantine/core';
import AsideForm from '../components/Aside/Aside';

function PreviewPage() {
    const [store, setStore] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [size] = useState(50);
    const LInd = currentPage * size;
    const FInd = LInd - size;
    const curCart = store.slice(FInd, LInd)


    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 5;

    useEffect(() => {
        async function getResponseFromAPI() {
            try {
                const { result } = await getStore();

                setStore(result);
            } catch (error) {
                console.error('Произошла ошибка при получении данных:', error);
                
                if (retryCount < maxRetries) {
                    console.log(`Повторяем запрос... Колличество попыток${retryCount}`);
                    setRetryCount(retryCount + 1);
                    getResponseFromAPI(); // Повторяем запрос
                } else {
                    console.error('Достигнуто максимальное количество попыток повтора.');
                }
                
            }
        }
        getResponseFromAPI();
    }, [retryCount])


    return (
        <div>

            <button onClick={() => console.log(store)}>+++</button>

            <AsideForm setStore={setStore} />

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