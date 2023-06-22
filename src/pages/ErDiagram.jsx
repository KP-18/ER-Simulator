import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams,Link } from "react-router-dom";

const ErDiagram = () => {
  const [entities, setEntities] = useState([]);
  const [relations, setRelations] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get the ID parameter from the URL
  useEffect(() => {
    const fetchEntitiesById = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/getOne/${id}`);
        setEntities(res.data.entities);
        setRelations(res.data.relationships);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEntitiesById();
  }, [id]);

  const getEntityNameById = (id) => {
    const entity = entities.find((entity) => entity._id === id);
    if (entity) {
      return entity.name;
    } else {
      return "Untitled Entity";
    }
  };

  return (
    <div className="main">
      <h1>ER Simulator</h1>
      <div className="entities">
        <h2>All Entities</h2>
        {entities.map((entity) => (
          <div key={entity._id} className="entity">
            <h2>{entity.name}</h2>
            <div className="attributes">
              {entity.attributes.map((attribute) => (
                <div key={attribute._id} className="attribute">
                  <h3>{attribute.name}</h3>
                  <h4>{attribute.dataType}</h4>
                  <h4>{attribute.isPrimaryKey}</h4>
                  <h4>{attribute.isMultiValue}</h4>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>


      <button className="addHome">
        <Link
          to={`/entities/${id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Make Changes in Entities
        </Link>
      </button>

      <button className="addHome">
        <Link
          to={`/entities/${id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Add new Entity
        </Link>
      </button>

      <br />
      <br />
      <br />
      <br />
      <div className="relations">
      <h2>All Relations</h2>
      {relations.map((relation) => (
          <div key={relation._id} className="relation">
            <h2>Relationship : {relation.name}</h2>
            <h3> From : {getEntityNameById(relation.from)}</h3>
            <h3> To : {getEntityNameById(relation.to)}</h3>
            <h3>Type : {relation.type}</h3>
            <div className="attributes">
              <h2>Attributes</h2>
              {relation.attributes.map((attribute) => (
                <div key={attribute._id} className="attribute">
                  <h3>name :{attribute.name}</h3>
                  <h4>Type :{attribute.dataType}</h4>
                  <h4>Primary Key:{attribute.isPrimaryKey}</h4>
                  <h4> MultiValue: {attribute.isMultiValue}</h4>
                </div>
              ))}
            </div>
          </div>
        ))}

      <button className="addHome">
        <Link
          to={`/relations/${id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Make Changes Relationship
        </Link>
      </button>
      <button className="addHome">
        <Link
          to={`/relations/${id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Add new Relationship
        </Link>
      </button>


      </div>
    </div>
  );
};

export default ErDiagram;
