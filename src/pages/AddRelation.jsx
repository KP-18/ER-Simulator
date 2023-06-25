import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import FormField from './FormField';
import { v4 as uuidv4 } from 'uuid';

const AddRelation = () => {
  const [relation , setRelation] = useState([{
    id: uuidv4(),
    name: "",
    from : "",
    to : "",
    type: "",
    attributes: [
        {
            id: uuidv4(),
            name: "",
            dataType: "",
            isPrimaryKey: false,
            isMultivalue: false
        }
    ]
  }]);

  const {id} = useParams();
 
  useEffect(() => {
    const fetchData = async() => {
        try{
            const res = await axios.get(`http://localhost:8080/api/getOneRelation/${id}`);
            console.log(res.data);
            setRelation(res.data);
        }catch(err){
          console.log(err);
        }
    }
   fetchData();
  },[id]);

   
  
  const handleChangeRel = (e, id) => {
    const { name, value } = e.target;
    setRelations((prevRelations) =>
      prevRelations.map((rel) => {
        if (rel.id === id) {
          return { ...rel, [name]: value };
        } else {
          return rel;
        }
      })
    );
  };
  
const handleChange = (e, relationId, attId) => {
    const { name, value, checked } = e.target;
    setRelation(prevRelation => prevRelation.map(rel => {
        if (rel.id === relationId) {
            const attributes = rel.attributes.map(att => {
                if (att.id === attId) {
                    return {
                        ...att,
                        [name]: name === 'isPrimaryKey' || name === 'isMultivalue' ? checked : value
                    };
                }
                return att;
            });
            return {
                ...rel,
                attributes
            };
        }
        return rel;
    }));
};

const handleRemoveAttribute = (relationId, attId) => {
    setRelation(prevRelation => prevRelation.map(rel => {
        if (rel.id === relationId) {
            return {
                ...rel,
                attributes: rel.attributes.filter(att => att.id !== attId)
            }
        }
        return rel;
    }));
};
const handleAdd = (e) =>{
    e.preventDefault();
    setRelation([...relation,{
        id: uuidv4(),
        name: "",
        from:"",
        to:"",
        type:"",
        attributes: []
    }]);
}
const handleRemove = (relationId) => {
    const index = relation.findIndex(rel => rel.id === relationId);
    if (index !== -1) {
        const list = [...relation];
        list.splice(index, 1);
        setRelation(list);
    }
};

const handleAddAttribute = (e, relationId) => {
    e.preventDefault();

    setRelation(prevRelation => prevRelation.map(rel => {
        if (rel.id === relationId) {
            const attributes = [...rel.attributes, {
                id: uuidv4(),
                name: "",
                dataType: "",
                isPrimaryKey: false,
                isMultivalue: false
            }];
            return {
                ...rel,
                attributes
            };
        }
        return rel;
    }));
}

const handleSubmit = async (e) => {
    e.preventDefault();
    if(relation.length === 0){
        alert("Please add atleast one relation");
    }
    else{
        for(let i=0;i<relation.length;i++){
            if(relation[i].name === ""){
                alert("Please enter relation name");
                return;
            }
            if(relation[i].from === ""){
                alert("Please enter from entity");
                return;
            }
            if(relation[i].to === ""){
                alert("Please enter to entity ");
                return;
            }
            if(relation[i].type === ""){
                alert("Please enter type of relation ");
                return;
            }
        }
    }
    // relation validation
    try {
      const response = await axios.get(`http://localhost:8080/api/getOneEntity/${id}`);
      const entities = response.data;
      for(let i=0;i<relation.length;i++){
        let from = relation[i].from;
        let to = relation[i].to;
        let flag1 = false;
        let flag2 = false;
        for(let j=0;j<entities.length;j++){
          if(from === entities[j].name){
            flag1 = true;
            relation[i].from = entities[j]._id;
          }
          if(to === entities[j].name){
            flag2 = true;
            relation[i].to = entities[j]._id;
          }
        }
        if(flag1 === false){
          alert("From entity does not exist");
          return;
        }
        if(flag2 === false){
          alert("To entity does not exist");
          return;
        }
      }
    } catch (error) {
      console.error(error);
    }
    console.log("Relation is fine");
    const relationships = {
        relationships: relation
    };
    console.log(relationships);
    try{
        await axios.post(`http://localhost:8080/api/postOneRelation/${id}`,relationships); //error
        alert("Relation Added Successfully");
        window.location.href = `/${id}`;
    }catch(err){
        console.log(err);
    }
}

  return (
    <div className="main-div">
      <h1>All Relationships</h1>
      <div className="relationships">
        { 
                relation.map((rel) =>{  //changes
                return(
                <div key={rel.id} className="single-relation">
                <FormField
                 label ="Relation Name"
                 name="name"
                 value={rel.name || ''}
                 onchange={(e) => handleChangeRel(e, rel.id)}
                />
                <FormField
                 label ="From"
                 name="from"
                 value={rel.from || ''}
                 onchange={(e) => handleChangeRel(e, rel.id)}
                />
                <FormField
                 label ="To"
                 name="to"
                 value={rel.to || ''}
                 onchange={(e) => handleChangeRel(e, rel.id)}
                />
                <FormField
                 label ="Type"
                 name="type"
                 value={rel.type || ''}
                 onchange={(e) => handleChangeRel(e, rel.id)}
                />
                   <div className="attributes">
                    {
                        rel.attributes.map((att) => {
                           return(
                            <div key={att.id} className="single-attribute">
                                <FormField
                                label="Attribute Name"
                                name="name"
                                value={att.name || ''}
                                onChange={e=>handleChange(e,rel.id,att.id)}
                                />
                                <FormField
                                label="Data Type"
                                name="dataType"
                                value={att.dataType || ''}
                                onChange={e=>handleChange(e,rel.id,att.id)}
                                />
                                <label>
                                <input
                                    type="checkbox"
                                    name="isPrimaryKey"
                                    checked={att.isPrimaryKey || false}
                                    onChange={e=>handleChange(e,rel.id,att.id)}
                                />
                                Is Primary Key
                                </label>
                                <label>
                                <input
                                    type="checkbox"
                                    name="isMultivalue"
                                    checked={att.isMultivalue || false}
                                    onChange={e=>handleChange(e,rel.id,att.id)}
                                />
                                Is Multivalue
                                </label>

                                {
                                  <button onClick={(e)=>handleAddAttribute(e,rel.id)}>Add Attribute</button>
                                }
                                {
                                  <button onClick={()=>handleRemoveAttribute(rel.id,att.id)}>Remove</button>
                                }
                            </div>
                           )
                        
        
                        })
                    }

                    {
                        rel.attributes.length === 0 &&
                        <button onClick={(e)=>handleAddAttribute(e,rel.id)}>Add Attribute</button>
                    }
                   </div>
                   { 
                        <button onClick={(e) => handleAdd(e)}>Add Relation</button>
                    }
                    { relation.length !== 1 && 
                        <button onClick={() => handleRemove(rel.id)}>Remove Relation</button>
                    }
                </div>
                )
            }
            )
        }
      </div>
      <div className="submitButton">
                {   relation.length === 0 &&
                        <button onClick={(e) => handleAdd(e)}>Add Relation</button>
                }
                <button  onClick={(e)=>handleSubmit(e)}>Submit Relation</button>
            </div>
    </div>
  )
}

export default AddRelation
