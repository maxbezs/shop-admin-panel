import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Swal from 'sweetalert2';
import Header from './Header';
import Add from './Add';
import Edit from './Edit';
import { Data } from './Data';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { collection, query, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/config";
import Accordion from './Accordion';

const Dashboard = ({ setIsAuthenticated }) => {
  const [data, setData] = useState([]);
  const [activeButton, setActiveButton] = useState();
  const [clicked, setClicked] = useState();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [dataId, setDataId] = useState();
  const subcollectionPaths = useMemo(
    () => ({
      0: ["ecommerce", "sections", "children"],
      1: ["ecommerce", "categories", "children"],
      2: ["ecommerce", "subcategories", "children"],
      3: ["ecommerce", "products", "children"],
    }),
    []
  );

  const toggle = useCallback((index) => {
    setClicked((prevClicked) => {
      if (index === prevClicked) {
        return undefined;
      } else {
        setActiveButton(index);
        return index;
      }
    });
  }, []);
  
  

  const handleEdit = useCallback((docData, index) => {
    setSelectedData(docData);
    setIsEditing(true);
  }, []);

  const handleDelete = useCallback((id, index) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.value) {
        const path = subcollectionPaths[index];
        deleteDoc(doc(db, ...path, id));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `Data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }).then(() => {
      setData((prevData) => {
        const newData = prevData.filter((obj) => obj.id !== id);
        return newData;
      });
      toggle(index);
    });
  }, [subcollectionPaths, toggle]);

  const sortedObject = useMemo(
    () => (obj) => {
      const sortedEntries = Object.entries(obj).sort((a, b) => {
        const keyA = a[0];
        const keyB = b[0];
        return keyA.localeCompare(keyB); // Alphabetical comparison
      });
      return Object.fromEntries(sortedEntries);
    },
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData([]);

        if (activeButton >= 0) {
          const path = subcollectionPaths[activeButton];
          const querySnapshot = await getDocs(query(collection(db, ...path)));
          const childrenData = querySnapshot.docs.map((childDoc) => ({
            id: childDoc.id,
            ...childDoc.data(),
          }));
          setData(childrenData);
        } else {
          setData([]);
        }
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    };

    fetchData();
  }, [activeButton, isEditing, isAdding, subcollectionPaths]);

  const handleAddClick = useCallback(() => {
    setIsAdding(true);
  }, []);

  return (
    <div>
      {!isAdding && !isEditing && (
        <>
          <Header setIsAuthenticated={setIsAuthenticated} />
          <div className='accordion-section'>
            <div className='accordion-container'>
              {Data.map((item, index) => {
                return (
                  <div key={index}>
                    <div className='accordion-wrap' onClick={() => toggle(index)}>
                      <div style={{ display: "flex", alignItems: "center", gap:"12px" }}>
                        <h1>{item.data}</h1>
                        <button onClick={handleAddClick}>Add {item.data}</button>
                      </div>
                      <span>
                        {clicked === index ? <FiMinus color='#414141' size='1rem' /> : <FiPlus color='#414141' size='1rem' />}
                      </span>
                    </div>
                    {clicked === index ? (
                      <Accordion item={item} data={data} handleEdit={handleEdit} handleDelete={handleDelete} index={index} sortedObject={sortedObject} />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {isAdding && (
        <Add
          setIsAdding={setIsAdding}
          path={subcollectionPaths[activeButton]}
          index={activeButton}
        />
      )}
      {isEditing && (
        <Edit
          selectedData={selectedData}
          path={subcollectionPaths[activeButton]}
          setIsEditing={setIsEditing}
          sortedObject={sortedObject}
          dataId={dataId}
        />
      )}
    </div>
  );
};

export default Dashboard;