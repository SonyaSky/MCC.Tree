import React, {useState, useEffect} from 'react';

import './leaf.css';
import { useTree } from '../../context/TreeContext';

const Leaf = ({id, name, childrenLeaves}) => {
    const {chooseLeaf, chosenLeafId, renameLeaf, editing} = useTree();

    const handleNameChange = (event) => {
        renameLeaf(id, event.target.value); 
    };

    const handleClick = () => {
        if (!editing) {
            chooseLeaf(id);
        }
    };


    return (
        <>
        <div className={chosenLeafId === id ? "leaf chosen" : "leaf"} onClick={handleClick}>
        {/* {chosenLeafId === id ?  
            (<input
                type="text"
                value={name}
                onChange={handleNameChange}
                autoFocus
                />) : (<span>{name}</span>)} */}
        {(chosenLeafId === id && editing) ? 
            (<textarea
                className='leaf-area'
                value={name}
                autoFocus
                onChange={handleNameChange}
                rows={1}
              />) : (<span>{name}</span>)}
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