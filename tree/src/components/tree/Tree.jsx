import React, {useState} from 'react';

import './tree.css';
import Button from '../button/button';
import Leaf from '../leaf/Leaf';

const baseLeaves = [
    {
        id: 1, name: "Node 1", children:[{id: 3, name: "Node 3", children: []}]
    },
    {
        id: 2, name: "Node 2", children: []
    }
]

const Tree = () => {
    const [leaves, setLeaves] = useState(baseLeaves);
    const [chosenLeaf, setChosenLeaf] = useState();
    return (
        <div className='tree-div'>
            <div className="buttons-div">
                <Button title="Add"/>
                <Button title="Delete"/>
                <Button title="Edit"/>
                <Button title="Reset"/>
            </div>
            <div className='right-div'>
                <h1 className='title'>tree</h1>
                <div className='tree-container'>
                    {leaves.map(({id, name, children}) => (
                        <Leaf key={id} name={name} childrenLeaves={children}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tree;