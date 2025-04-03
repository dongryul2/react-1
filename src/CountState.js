import { useState } from 'react';

export default function CountState() {
    const [count,setCount] = useState(0);

    function handeClick(){
        setCount(count+1);
    }

    return (
        <div>
            <button onClick={handeClick}>
                Clicked {count} times
            </button>
        </div>
    );
}
