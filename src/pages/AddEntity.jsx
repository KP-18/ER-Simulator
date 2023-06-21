import axios from "axios";
import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Attributes from "./Attributes";
import FormField from "./FormField";

const AddEntity = () => {
  const [entity, setEntity] = useState([{
    name: "",
    attributes: []
  }]);
  const { id } = useParams(); // Get the ID parameter from the URL
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchEntitiesById = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/getOneEntity/${id}`);
        setEntity(res.data.entities);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEntitiesById();
  }, [id]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...entity];
    list[index] = {
      ...list[index],
      [name]: value
    };
    setEntity(list);
  };

  const handleSubmitEntities = async (e) => {
    e.preventDefault();
    if (!entity[0].EntityName.trim() || entity[0].attributes.length === 0) {
      setError("Please enter a valid entity name and at least one attribute.");
      return;
    }
    try {
      await axios.post(`http://localhost:8080/api/postOneEntity/${id}`, entity);
      navigate(`${id}`);
    } catch (err) {
      console.log(err);
      setError("Error saving entity. Please try again later.");
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();

    setEntity([...entity,{
      name: "",
      attributes: []
    }]);
  };

  const handleRemove = index =>{
    const list = [...entity];
    list.splice(index,1);
    setEntity(list);
  } 

// attributes code
  const [attribute, setAttribute] = useState([{
    name: "",
    dataType: "",
    isPrimaryKey: false,
    isMultivalue: false
  }]);

  const handleChange1 = (e,index) => {
    const { name, value, type, checked } = e.target;
    const list = [...attribute];
    list[index][name] = type === "checkbox" ? checked : value
    setAttribute(list);
  };

  const handleAdd1 = (e) => {
    e.preventDefault();

    setAttribute([...attribute,{
      name: "",
      dataType: "",
      isPrimaryKey: false,
      isMultivalue: false
    }]);
  };

  const handleRemove1 = index =>{
    const list = [...attribute];
    list.splice(index,1);
    setAttribute(list);
  } 

  return (
    <div className="form">
      <h1>All Entities</h1>

      {
        entity.map((x,i) =>{
        return(

      <div key={entity._id} className="entity">
        <FormField
          label="Entity Name"
          name="name"
          onChange={handleChange}
          value={x.name}
          />
              <div key={attribute._id} className="attribute">
                  {
                    x.attributes.map((y,i)=>{
                    return(
                      <div className="single-attribute">
                      <FormField
                      label="Attribute Name"
                      name="name"
                      value={y.name}
                      onChange={e=>handleChange1(e,i)}
                    />
                    <FormField
                      label="Data Type"
                      name="dataType"
                      value={y.dataType}
                      onChange={e=>handleChange1(e,i)}
                    />
                    <label>
                      <input
                        type="checkbox"
                        name="isPrimaryKey"
                        checked={y.isPrimaryKey}
                        onChange={e=>handleChange1(e,i)}
                      />
                      Is Primary Key
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="isMultivalue"
                        checked={y.isMultivalue}
                        onChange={e=>handleChange1(e,i)}
                      />
                      Is Multivalue
                    </label>
                    {
                      y.length-1 === i && 
                      <button onClick={handleAdd1}>Add Attribute</button>
                    }
                    {
                      y.length !== 1 && 
                      <button onClick={()=>handleRemove1(i)}>Remove</button>
                    }
                    </div>
                  )})}
                  <Attributes />
                  </div>
        { entity.length - 1 === i && 
        <button onClick={(e) => handleAdd(e)}>Add Entity</button>
        }
        { entity.length !== 1 && 
        <button onClick={() => handleRemove(i)}>Remove Entity</button>
        }
        </div>

      )})
      }


      <div className="submit-entities">
        <button onClick={handleSubmitEntities}> Submit Entities </button> 
      </div>


    </div>
  );
};

export default AddEntity;