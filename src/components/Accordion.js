
const Accordion = ({data, item, handleEdit, handleDelete, index, sortedObject}) => {

    return (
      <div className='accordion-dropdown'>
        <table className="striped-table">
          <thead>
            <tr>
              {item.columns.map((column, columnIndex) => (
                <th key={columnIndex}>{column}</th>
              ))}
              <th colSpan={2} className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((childDoc) => (
              <tr key={childDoc.id}>
                {Object.entries(sortedObject(childDoc)).map(([key, value]) => (
                  key !== "id" ? (
                    <td key={key}>
                      {value}
                    </td>
                  ) : null
                ))}
                <td className="text-right">
                  <button className="button muted-button" onClick={() => handleEdit(childDoc, index)}>Edit</button>
                </td>
                <td className="text-left">
                  <button className="button muted-button" onClick={() => handleDelete(childDoc.id, index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Accordion;