
import { useEffect, useState } from 'react';
import getStore from '../components/storage/dataBase'

function PreviewPage() {
    const [item, setItem] = useState([])

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

            <ol>
                {item.map((el, i) => <li key={i}>{el.product}</li>)}
            </ol>

        </div >
    );
}

export default PreviewPage;