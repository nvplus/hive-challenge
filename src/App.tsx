import { useState } from 'react'
import './App.css'
import Dropdown from './components/Dropdown';

function App() {
  const [selectedItemsSingle, setSelectedSingle] = useState(new Set<string>());
  const [selectedItemsMulti, setSelectedMulti] = useState(new Set<string>());

  const handleSelectSingle = (selection:string) => {
    if (selectedItemsSingle.has(selection)) {
      return;
    }
    const newSelected = new Set<string>();
    newSelected.add(selection);
    setSelectedSingle(newSelected);
  }

  const handleRemoveSingle = (selection:string) => {
    if (!selectedItemsSingle.has(selection)) {
      return;
    }
    const newSelected = new Set<string>(selectedItemsSingle);
    newSelected.delete(selection);
    setSelectedSingle(newSelected);
  }

  const handleClearSingle = () => {
    const newSelected = new Set<string>();
    setSelectedSingle(newSelected);
  }

  const handleSelectMulti = (selection:string) => {
    if (selectedItemsMulti.has(selection)) {
      return;
    }

    const newSelected = new Set<string>(selectedItemsMulti);
    newSelected.add(selection);
    setSelectedMulti(newSelected);
  }

  const handleSelectMany = (selections:string[]) => {
    const newSelected = new Set<string>([...selectedItemsMulti]);

    selections.forEach(selection => {
      newSelected.add(selection);
    });
      
    setSelectedMulti(newSelected);
  }

  const handleRemoveMulti = (selection:string) => {
    if (!selectedItemsMulti.has(selection)) {
      return;
    }
    const newSelected = new Set<string>(selectedItemsMulti);
    newSelected.delete(selection);
    setSelectedMulti(newSelected);
  }

  const handleClearMulti = () => {
    const newSelected = new Set<string>();
    setSelectedMulti(newSelected);
  }

  return (
    <>
      <h3>Single</h3>
      <Dropdown 
        title = {"Age"}
        options = {["Twenty", "Twenty one", "Twenty one and a half"]}
        selectedItems = {selectedItemsSingle}
        multi = {false}
        width={200}
        placeholder="Enter age..."
        onSelect = {handleSelectSingle} 
        onRemove = {handleRemoveSingle}
        onClear = {handleClearSingle}
      />

      <h3>Multi</h3>
      <Dropdown 
        title = {"Tag"}
        options = {["Oliver Hansen", "Van Henry", "April Tucker", "Ralph Hubbard", "Maxwell Dixon", "Nolan Garrett", "Stella Monroe"]}
        selectedItems = {selectedItemsMulti}
        multi = {true}
        width={500}
        placeholder="Select name(s)..."
        onSelect = {handleSelectMulti}
        onSelectMany = {handleSelectMany}
        onRemove = {handleRemoveMulti}
        onClear = {handleClearMulti}
      />  
    </>
  )
}

export default App
