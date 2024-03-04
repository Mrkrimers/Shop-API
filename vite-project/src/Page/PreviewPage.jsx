
import { useEffect, useState } from 'react';
import getStore from '../components/storage/dataBase'
import { Pagination } from '@mantine/core';


function PreviewPage() {
    const [item, setItem] = useState([])


    const [currentPage, setCurrentPage] = useState(1);
    const [size] = useState(50);
    const LInd = currentPage * size;
    const FInd = LInd - size;
    const curCart = item.slice(FInd, LInd)

    useEffect(() => {
        async function getRes() {
            const { result } = await getStore();
            setItem(result);
        }
        getRes();
    }, [])


    return (
        <div>

            <button onClick={() => console.log(item)}>+++</button>

            <Pagination
                total={Math.ceil(item.length / size)}
                position="center"
                style={{ marginTop: "40px" }}
                onChange={setCurrentPage}
                value={currentPage}
            />
            
            <ol>
                {curCart.map((el, i) => <li key={i}>{el.product}</li>)}
            </ol>


        </div >
    );
}

export default PreviewPage;