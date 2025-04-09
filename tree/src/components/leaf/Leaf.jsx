import React, {useState} from 'react';

import './leaf.css';

const Leaf = ({name, childrenLeaves, chosen, onClick}) => {
    const [children, setChildren] = useState(childrenLeaves);
    const [leafName, setLeafName] = useState(name);

    const handleNameChange = (event) => {
        setLeafName(event.target.value); 
    };

    const handleClick = (event) => {
        event.stopPropagation(); 
        onClick();
    };


    return (
        <>
        <div className={chosen ? "leaf chosen" : "leaf"} onClick={handleClick}>
        {chosen ?  
            (<input
                type="text"
                value={leafName}
                onChange={handleNameChange}
                autoFocus
                disabled/>) : (<span>{leafName}</span>)}
        </div>
        <div className="children-div">
            {children.map(({id, name, children}) => (
                <Leaf key={id} name={name} chosen={chosen} childrenLeaves={children} onClick={handleClick}/>
            ))}
        </div>
        </>
    );
}

export default Leaf;