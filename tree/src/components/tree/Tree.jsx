import React, {useState} from 'react';

import './tree.css';
import Button from '../button/button';
import Leaf from '../leaf/Leaf';
import { useTree } from '../../context/TreeContext';

const baseLeaves = [
    {
        id: 1, name: "Node 1", children:[{id: 3, name: "Node 3", children: []}]
    },
    {
        id: 2, name: "Node 2", children: []
    }
]

const Tree = () => {
    const {deleteLeaf, addLeaf, tree} = useTree();
    const [chosenLeafId, setChosenLeafId] = useState(null);

    const handleLeafClick = (id) => {
        setChosenLeafId(id === chosenLeafId ? null : id);
    };

    const handleDelete = () => {
        if (chosenLeafId != null) {
            deleteLeaf(chosenLeafId);
            setChosenLeafId(null);
        }
    }

    const handleAddNode = () => {
        const newNode = { name: "New Node" };
        addLeaf(chosenLeafId, newNode);
    };
    
    return (
        <div className='tree-div'>
            <div className="buttons-div">
                <Button title="Add" onClick={handleAddNode}/>
                <Button title="Delete" onClick={handleDelete}/>
                <Button title="Edit"/>
                <Button title="Reset"/>
            </div>
            <div className='right-div'>
                <h1 className='title'>tree</h1>
                <div className='tree-container'>
                    {tree.map(({id, name, children}) => (
                        <Leaf 
                        key={id} 
                        name={name} 
                        childrenLeaves={children} 
                        chosen={chosenLeafId === id}
                        onClick={() => handleLeafClick(id)}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tree;