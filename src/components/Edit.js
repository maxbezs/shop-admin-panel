import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {doc, setDoc, updateDoc } from "firebase/firestore"
import {db} from '../config/config'

const Edit = ({ selectedData, path, setIsEditing, sortedObject,  }) => {
  const [myObject, setMyObject] = useState(selectedData);

  const handleChangeKey = (key, value) => {
    setMyObject((prevObject) => ({
      ...prevObject,
      [key]: value,
    }));
  };

  const handleUpdate = async(e) => {
    e.preventDefault();
    delete myObject.id;
    await updateDoc(doc(db, ...path, selectedData.id), 
      myObject);

    setIsEditing(false);
    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `Data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit {path[1]}</h1>
        {Object.entries(sortedObject(myObject)).map(([key, value]) => (
          key !== "id" ? (
            <div key={key}>
            <label>{key}</label>
            <input
              id={key}
              type="text"
              name={key}
              value={value}
              onChange={(e) => handleChangeKey(key, e.target.value)}
            />
          </div>
          ) : null
        ))}
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
