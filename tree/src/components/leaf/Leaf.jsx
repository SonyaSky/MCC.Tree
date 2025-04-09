import React, {useState} from 'react';

import './leaf.css';
import { useTree } from '../../context/TreeContext';

const Leaf = ({id, name, childrenLeaves}) => {
    const [leafName, setLeafName] = useState(name);
    const {chooseLeaf, chosenLeafId} = useTree();

    const handleNameChange = (event) => {
        setLeafName(event.target.value); 
    };

    const handleClick = () => {
        chooseLeaf(id);
        console.log(id);
    };


    return (
        <>
        <div className={chosenLeafId === id ? "leaf chosen" : "leaf"} onClick={handleClick}>
        {chosenLeafId === id ?  
            (<input
                type="text"
                value={leafName}
                onChange={handleNameChange}
                autoFocus
                disabled/>) : (<span>{leafName}</span>)}
        </div>
        <div className="children-div">
            {!childrenLeaves.Empty && childrenLeaves.map(({id, name, children}) => (
                <Leaf key={id} name={name} childrenLeaves={children} id={id}/>
            ))}
        </div>
        </>
    );
}

export default Leaf;