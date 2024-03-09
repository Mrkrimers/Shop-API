import { useEffect, useState } from 'react';
import getStore from '../components/storage/dataBase'
import { Pagination } from '@mantine/core';
import Header from '../components/Header/Header';
import style from '../Page/style.module.scss'

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
        <main>
            <button onClick={() => console.log(store)}>+++</button>

            <div className={style.title}>
                <h1>SHOP FROM API</h1>
            </div>

            <Header setStore={setStore} />

            <div className={style.productWrapper}>

                {curCart.map((el, i) =>
                    <div key={i} className={style.item}>
                        <h1>Price: {el.price}</h1>
                        <h3>{el.product}</h3>
                        {el.brand !== null ? <p>Brand: {el.brand}</p> : null}
                        <p>Id: {el.id}</p>
                    </div>)}

            </div>

            <Pagination
                total={Math.ceil(store.length / size)}
                position="center"
                style={{ margin: "30px 0" }}
                onChange={setCurrentPage}
                value={currentPage}
            />
        </main >
    );
}

export default PreviewPage;