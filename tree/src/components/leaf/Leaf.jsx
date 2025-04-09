import React, {useState} from 'react';

import './leaf.css';

const Leaf = ({name, childrenLeaves}) => {
    const [children, setChildren] = useState(childrenLeaves);
    const [leafName, setLeafName] = useState(name);
    const [chosen, setChosen] = useState(false);

    const handleNameChange = (event) => {
        setLeafName(event.target.value); 
    };

    const handleChosen = () => {
        setChosen(!chosen);
    }

    return (
        <>
        <div className={chosen ? "leaf chosen" : "leaf"} onClick={handleChosen}>
            <input
                type="text"
                value={leafName}
                onChange={handleNameChange}
                disabled/>
        </div>
        <div className="children-div">
            {children.map(({id, name, children}) => (
                <Leaf key={id} name={name} childrenLeaves={children}/>
            ))}
        </div>
        </>
    );
}

export default Leaf;