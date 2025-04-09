import React, {useState} from 'react';

import './tree.css';
import Button from '../button/button';

const Tree = () => {
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
                    
                </div>
            </div>
        </div>
    );
}

export default Tree;