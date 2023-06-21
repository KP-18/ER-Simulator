import axios from "axios";
import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Attributes from "./Attributes";
import FormField from "./FormField";

const AddRelation = () => {
  const { id } = useParams(); // Get the ID parameter from the URL
  const [relation, setRelation] = useState([{
    name: "",
    from: "",
    to: "",
    type: "",
    attributes: []
  }]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing data
    axios.get(`http://localhost:8080/api/getOneRelations/${id}`)
      .then(res => {
        setRelation(res.data.relationships); 
      })
  }, [id])

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...relation];
    list[index] = {
      ...list[index],
      [name]: value
    };
    setRelation(list);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    setRelation([...relation,{
        name: "",
        from: "",
        to: "",
        type: "",
        attributes: []
    }]);
  };

  const handleRemove = index =>{
    const list = [...relation];
    list.splice(index,1);
    setRelation(list);
  } 

  const handleSubmitRelation = async (e) => {
    e.preventDefault();
    if (relation.length === 0 || !relation[0].name.trim() || !relation[0].from.trim() || !relation[0].to.trim() || !relation[0].type.trim()) {
      setError("Please fill all the required fields.");
      return;
    }
    try {
      await axios.post(`http://localhost:8080/api/postOneRelations/${id}`, relation);
      navigate(`${id}`);
    } catch (err) {
      console.log(err);
      setError("Error saving relation. Please try again later.");
    }
  };

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
      <h1>Add Relation</h1>
        <div className="all-relations">
     {
        relation.map((x,i)=>{

       return (
            <div className="single-relations">
                <FormField
                    label="Relation Name"
                    name="name"
                    onChange={handleChange}
                    value={x.name}
                    />
                <FormField
                    label="From Entity"
                    name="from"
                    onChange={handleChange}
                    value={x.from}
                    />
                <FormField
                    label="To Entity"
                    name="to"
                    onChange={handleChange}
                    value={x.to}
                    />
                <FormField
                    label="Relation Type"
                    name="type"
                    onChange={handleChange}
                    value={x.type}
                    />
            <div className="attributes">

                <h2>Attributes</h2>
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
                    <Attributes/>
            </div>
            
            { relation.length - 1 === i && 
                <button onClick={(e) => handleAdd(e)}>Add relationship</button>
            }
            { relation.length !== 1 && 
                <button onClick={() => handleRemove(i)}>Remove relation</button>
            }
            </div>
            )})}

      <div className="submit-relation">
        <button onClick={handleSubmitRelation}>Submit Relation</button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
    </div>
    );
};

export default AddRelation;