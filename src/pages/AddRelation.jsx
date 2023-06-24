import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormField from './FormField';
import { v4 as uuidv4 } from 'uuid';

const AddRelation = () => {
  const [relation, setRelation] = useState([
    {
      id: uuidv4(),
      name: '',
      from: '',
      to: '',
      type: '',
      attributes: [
        {
          id: uuidv4(),
          name: '',
          dataType: '',
          isPrimaryKey: false,
          isMultivalue: false,
        },
      ],
    },
  ]);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/getOneRelation/${id}`);
        console.log(res.data.relationships);
        setRelation(res.data.relationships);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const handleChangeRel = (e, id) => {
    const { name, value } = e.target;
    setRelation(prevRelation =>
      prevRelation.map(rel => {
        if (rel.id === id) {
          return {
            ...rel,
            [name]: value,
          };
        }
        return rel;
      })
    );
  };

  const handleChange = (e, relationId, attId) => {
    const { name, value, checked } = e.target;
    setRelation(prevRelation =>
      prevRelation.map(rel => {
        if (rel.id === relationId) {
          const attributes = rel.attributes.map(att => {
            if (att.id === attId) {
              return {
                ...att,
                [name]: name === 'isPrimaryKey' || name === 'isMultivalue' ? checked : value,
              };
            }
            return att;
          });
          return {
            ...rel,
            attributes,
          };
        }
        return rel;
      })
    );
  };

  const handleRemoveAttribute = (relationId, attId) => {
    setRelation(prevRelation =>
      prevRelation.map(rel => {
        if (rel.id === relationId) {
          return {
            ...rel,
            attributes: rel.attributes.filter(att => att.id !== attId),
          };
        }
        return rel;
      })
    );
  };

  const handleAdd = e => {
    e.preventDefault();

    setRelation([
      ...relation,
      {
        id: uuidv4(),
        name: '',
        from: '',
        to: '',
        type: '',
        attributes: [],
      },
    ]);
  };

  const handleRemove = relationId => {
    const index = relation.findIndex(rel => rel.id === relationId);
    if (index !== -1) {
      const list = [...relation];
      list.splice(index, 1);
      setRelation(list);
    }
  };

  const handleAddAttribute = (e, relationId) => {
    e.preventDefault();

    setRelation(prevRelation =>
      prevRelation.map(rel => {
        if (rel.id === relationId) {
          const attributes = [
            ...rel.attributes,
            {
              id: uuidv4(),
              name: '',
              dataType: '',
              isPrimaryKey: false,
              isMultivalue: false,
            },
          ];
          return {
            ...rel,
            attributes,
          };
        }
        return rel;
      })
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (relation.length === 0) {
      alert('Please add at least one relation');
    } else {
      for (let i = 0; i < relation.length; i++) {
        if (relation[i].name === '') {
          alert('Please enter relation name');
          return;
        }
        if (relation[i].from === '') {
          alert('Please enter from entity');
          return;
        }
        if (relation[i].to === '') {
          alert('Please enter to entity ');
          return;
        }
        if (relation[i].type === '') {
          alert('Please enter type of relation ');
          return;
        }
      }
    }
    console.log('Relation is fine');
    const relationships = {
      relationships: relation,
    };
    console.log(relationships);
    try {
      await axios.post(`http://localhost:8080/api/postOneRelation/${id}`, relationships);
      alert('Relation Added Successfully');
      window.location.href = `/${id}`;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-div">
      <h1>All Relationships</h1>
      <div className="relationships">
        {relation.map(rel => (
          <div key={rel.id} className="single-relation">
            <FormField label="RelationName" name="name" value={rel.name} onChange={e => handleChangeRel(e, rel.id)} />
            <FormField label="From Entity" name="from" value={rel.from} onChange={e => handleChangeRel(e, rel.id)} />
            <FormField label="To Entity" name="to" value={rel.to} onChange={e => handleChangeRel(e, rel.id)} />
            <FormField label="Type" name="type" value={rel.type} onChange={e => handleChangeRel(e, rel.id)} />
            <div className="attributes">
              <h3>Attributes</h3>
              {rel.attributes.map(att => (
                <div key={att.id} className="single-attribute">
                  <FormField label="Attribute Name" name="name" value={att.name} onChange={e => handleChange(e, rel.id, att.id)} />
                  <FormField label="Data Type" name="dataType" value={att.dataType} onChange={e => handleChange(e, rel.id, att.id)} />
                  <div className="checkboxes">
                    <label>
                      <input type="checkbox" name="isPrimaryKey" checked={att.isPrimaryKey} onChange={e => handleChange(e, rel.id, att.id)} />
                      Primary Key
                    </label>
                    <label>
                      <input type="checkbox" name="isMultivalue" checked={att.isMultivalue} onChange={e => handleChange(e, rel.id, att.id)} />
                      Multivalue
                    </label>
                  </div>
                  <button className="remove-attribute" onClick={() => handleRemoveAttribute(rel.id, att.id)}>
                    Remove Attribute
                  </button>
                </div>
              ))}
              <button className="add-attribute" onClick={e => handleAddAttribute(e, rel.id)}>
                Add Attribute
              </button>
            </div>
            <button className="remove-relation" onClick={() => handleRemove(rel.id)}>
              Remove Relation
            </button>
          </div>
        ))}
        <button className="add-relation" onClick={handleAdd}>
          Add Relation
        </button>
      </div>
      <button className="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default AddRelation;