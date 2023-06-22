import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import FormField from './FormField';
import Attributes from './Attributes';
import { v4 as uuidv4 } from 'uuid';
// import Entity from './Entity';
const AddEntity = () => {

    const [entity, setEntity] = useState([{
        id: uuidv4(),
        name: "",
        attributes: [{
            id: uuidv4(),
            name: "",
            dataType: "",
            isPrimaryKey: false,
            isMultivalue: false
        }]
    }]);
    const {id} = useParams();
    const urlId = id;
    useEffect(() => {

        const fetchData = async (req,res) => {
            try{
                res = await axios.get(`http://localhost:8080/api/getOneEntity/${urlId}`);
                setEntity(res.data.entities);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[]);

    const handleChangeEnt = (e, index) => {
        // handle entity state change
        const { name, value } = e.target;
        const list = [...entity];
        list[index] = {
            ...list[index],
            [name]: value
        };
        setEntity(list);
    }

    const handleChange = (e, entityId, attId) => {
        const { name, value } = e.target;
        setEntity(prevEntity => prevEntity.map(ent => {
            if (ent.id === entityId) {
                return {
                    ...ent,
                    attributes: ent.attributes.map(att => {
                        if (att.id === attId) {
                            return {
                                ...att,
                                [name]: value
                            }
                        }
                        return att;
                    })
                }
            }
            return ent;
        }));
    };
    
    const handleRemoveAttribute = (entityId, attId) => {
        setEntity(prevEntity => prevEntity.map(ent => {
            if (ent.id === entityId) {
                return {
                    ...ent,
                    attributes: ent.attributes.filter(att => att.id !== attId)
                }
            }
            return ent;
        }));
    };

    const handleAdd = (e) =>{
        e.preventDefault();

        setEntity([...entity,{
            id: uuidv4(),
            name: "",
            attributes: []
        }]);
    }

    const handleRemove = index =>{
        const list = [...entity];
        list.splice(index,1);
        setEntity(list);
    }

    const handleAddAttribute = (e, index) => {
        e.preventDefault();

        const list = [...entity];
        list[index].attributes.push({
            id: uuidv4(),
            name: "",
            dataType: "",
            isPrimaryKey: false,
            isMultivalue: false
        });
        setEntity(list);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(entity.length === 0){
            alert("Please add atleast one entity");
        }
        else{
            for(let i=0;i<entity.length;i++){
                if(entity[i].name === ""){
                    alert("Please enter entity name");
                    return;
                }
                if(entity[i].attributes.length === 0){
                    alert("Please add atleast one attribute");
                    return;
                }
                for(let j=0;j<entity[i].attributes.length;j++){
                    if(entity[i].attributes[j].name === ""){
                        alert("Please enter attribute name");
                        return;
                    }
                }
            }
        }
        const entities = {
            entities: entity
        };
        try{
            await axios.post(`http://localhost:8080/api/postOneEntity/${urlId}`,entities);
            alert("Entity Added Successfully");
            window.location.href = `/${urlId}`;
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className="main-div">
        <h1>All Entities</h1>
        <div className="entities">
            {
               entity.map((ent) => {
                    return(
                        <div key={ent.id} className="single-entity">

                                <FormField
                                label="Entity Name"
                                name="name"
                                value={ent.name}
                                onChange={(e) => handleChangeEnt(e, ent.id)}
                                />
                                <div className="attributes">
                                    {
                                        ent.attributes.map((att) =>{
                                            return(
                                                <div key ={att.id}className="single-attribute">
                                                <FormField
                                                    label="Attribute Name"
                                                    name="name"
                                                    value={att.name}
                                                    onChange={e=>handleChange(e,ent.id,att.id)}
                                                    />
                                                <FormField
                                                    label="Data Type"
                                                    name="dataType"
                                                    value={att.dataType}
                                                    onChange={e=>handleChange(e,ent.id,att.id)}
                                                    />
                                                <label>
                                                <input
                                                        type="checkbox"
                                                        name="isPrimaryKey"
                                                        checked={att.isPrimaryKey}
                                                        onChange={e=>handleChange(e,ent.id,att.id)}
                                                />
                                                Is Primary Key
                                                </label>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        name="isMultivalue"
                                                        checked={att.isMultivalue}
                                                        onChange={e=>handleChange(e,ent.id,att.id)}
                                                    />
                                                    Is Multivalue
                                                </label>
                                                    {
                                                    <button onClick={(e)=>handleAddAttribute(e,ent.id)}>Add Attribute</button>
                                                    }
                                                    {
                                                    <button onClick={()=>handleRemoveAttribute(ent.id,att.id)}>Remove</button>
                                                    }

                                            </div>
                                            )
                                        })
                                    }
                                    <Attributes/>
                                </div>
                    { 
                        <button onClick={(e) => handleAdd(e)}>Add Entity</button>
                    }
                    { entity.length !== 1 && 
                        <button onClick={() => handleRemove(ent.id)}>Remove Entity</button>
                    }
                    </div>
                )
                })
            }

        </div>
                    { entity.length === 0 &&
                        <button onClick={(e) => handleAdd(e)}>Add Entity</button>
                    }
            <div className="submitButton">
                <button type="submit" onSubmit={(e)=>handleSubmit(e)}>Submit Entities</button>
            </div>
    </div>
  )
}

export default AddEntity
