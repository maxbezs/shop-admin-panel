import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { collection, addDoc } from "firebase/firestore"; 
import {db} from '../config/config'

const Add = ({ setIsAdding, path, index }) => {

  const activeForm = [
    {path:"", title:""},
    {path:"", section:"", title:""},
    {category:"", path:"", title:""},
    {category:"", description:"", image:"", name:"", price:"", subcategory:""},
  ]

  const [myObject, setMyObject] = useState(activeForm[index]);

  const handleAdd = async(e) => {
    e.preventDefault();
    const values = Object.values(myObject);
    const isEmpty = values.some((value) => value === '');
    if (isEmpty) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });;
    }

    try{
      await addDoc(collection(db, ...path), myObject);
    }catch(error){
      console.log(error)
    }
    
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `Data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
    
  };

  const handleChangeKey = (key, value) => {
    setMyObject((prevObject) => ({
      ...prevObject,
      [key]: value,
    }));
  };
  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add {path[1]}</h1>
        {Object.entries(myObject).map(([key]) => (
          <div key={key}>
            <label htmlFor={key}>{key}</label>
            <input
              id={key}
              type="text"
              name={key}
              value={myObject[key]}
              onChange={(e) => handleChangeKey(key, e.target.value)}
            />
          </div>
          
        ))}
        
        
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
