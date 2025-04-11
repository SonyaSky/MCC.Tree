import { createContext, useState, useContext, React } from 'react';

import {baseTree} from './baseTree'

export const TreeContext = createContext();

export const TreeProvider = ({children}) => {
    const [tree, setTree] = useState(baseTree);
    const [chosenLeafId, setChosenLeafId] = useState(null);
    const [editing, setEditing] = useState(false);

    const addLeaf = (newLeaf) => {
        if (chosenLeafId === null) {
            const newLeafWithId = { ...newLeaf, id: Date.now(), children: [] };
            setTree([...tree, newLeafWithId]); 
        } else {
            const updatedTree = addLeafRecursively(tree, chosenLeafId, newLeaf);
            setTree(updatedTree);
        }
        console.log(tree);
        setChosenLeafId(null);
    };

    const addLeafRecursively = (leaves, parentId, newLeaf) => {
        return leaves.map(leaf => {
            if (leaf.id === parentId) {
                const newLeafWithId = { ...newLeaf, id: Date.now(), children: [] }; 
                return { ...leaf, children: [...leaf.children, newLeafWithId] };
            }
            if (leaf.children) {
                return { ...leaf, children: addLeafRecursively(leaf.children, parentId, newLeaf) };
            }
            return leaf;
        });
    };

    const deleteLeaf = () => {
        const updatedTree = deleteLeafRecursively(tree, chosenLeafId);
        setTree(updatedTree);
        setChosenLeafId(null);
    }

    const deleteLeafRecursively = (tree, id) => {
        return tree.filter(leaf => {
            if (leaf.id === id) return false;
            if (leaf.children.length > 0) {
                leaf.children = deleteLeafRecursively(leaf.children, id);
            }
            return true;
        });
    }
    
    const clearTree = () => {
        setTree([]);
    }

    const resetTree = () => {
        setTree(baseTree);
    }

    const chooseLeaf = (id) => {
        setChosenLeafId(id === chosenLeafId ? null : id);
        console.log(chosenLeafId);
    }

    const renameLeaf = (id, newName) => {
        const updateLeafName = (leaves) => {
            return leaves.map(leaf => {
                if (leaf.id === id) {
                    return { ...leaf, name: newName };
                }
                if (leaf.children && leaf.children.length > 0) {
                    return { ...leaf, children: updateLeafName(leaf.children) };
                }
                return leaf;
            });
        };
        setTree(prev => updateLeafName(prev));
    };

    const editLeaf = () => {
        if (chosenLeafId != null) {
            setEditing((prevEditing) => {
                const nextEditing = !prevEditing;
                if (!nextEditing) {
                    setChosenLeafId(null);
                }
                return nextEditing;
            });
        }
    }


    return (
        <TreeContext.Provider value={{tree, setTree, resetTree, addLeaf, editing, editLeaf, deleteLeaf, chooseLeaf, renameLeaf, clearTree, chosenLeafId, setChosenLeafId}}>
            {children}
        </TreeContext.Provider>
    )
}

export const useTree = () => {
    return useContext(TreeContext);
}