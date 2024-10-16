import { useState } from 'react';

function GenericInput({ placeholder, onAddItem }) {
  const [inputValue, setInputValue] = useState('');

  const handleAddItem = () => {
    
      onAddItem(inputValue);
      setInputValue('');

  };

  return (
    <div>
      <label>
        <input 
          name="genericInput" 
          placeholder={placeholder } 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)} 
        />
      </label>
      <button onClick={handleAddItem}>Envoyer</button>
    </div>
  );
}

export default GenericInput;
