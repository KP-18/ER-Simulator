import React, { useState } from "react";
import FormField from "./FormField";


const Attributes = () => {
  const [attribute, setAttribute] = useState([{
    name: "",
    dataType: "",
    isPrimaryKey: false,
    isMultivalue: false
  }]);

  const handleChange = (e,index) => {
    const { name, value, type, checked } = e.target;
    const list = [...attribute];
    list[index][name] = type === "checkbox" ? checked : value
    setAttribute(list);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    setAttribute([...attribute,{
      name: "",
      dataType: "",
      isPrimaryKey: false,
      isMultivalue: false
    }]);
  };

  const handleRemove = index =>{
    const list = [...attribute];
    list.splice(index,1);
    setAttribute(list);
  } 

  return (
    <div className="attributes">

      {
        attribute.map((x,i)=>{
        return(
          <div className="single-attribute">
          <FormField
          label="Attribute Name"
          name="name"
          value={attribute.name}
          onChange={e=>handleChange(e,i)}
        />
        <FormField
          label="Data Type"
          name="dataType"
          value={attribute.dataType}
          onChange={e=>handleChange(e,i)}
        />
        <label>
          <input
            type="checkbox"
            name="isPrimaryKey"
            checked={attribute.isPrimaryKey}
            onChange={e=>handleChange(e,i)}
          />
          Is Primary Key
        </label>
        <label>
          <input
            type="checkbox"
            name="isMultivalue"
            checked={attribute.isMultivalue}
            onChange={e=>handleChange(e,i)}
          />
          Is Multivalue
        </label>
        {
           attribute.length-1 === i && 
          <button onClick={handleAdd}>Add Attribute</button>
        }
        {
           attribute.length !== 1 && 
          <button onClick={()=>handleRemove(i)}>Remove</button>
        }
        </div>
      )})}
    </div>
    
  );
};

export default Attributes;