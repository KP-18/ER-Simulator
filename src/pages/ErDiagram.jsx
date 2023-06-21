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
      } catch (err) {
        console.log(err);
      }
    };
    const fetchRelationsById = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/getOne/${id}`);
        setRelations(res.data.relationships);
      } catch (err) {
        console.log(err);
      }
    }
    fetchEntitiesById();
    fetchRelationsById();
  }, [id]); // Fetch entities whenever the ID parameter changes

  // const handleDelete1 = async (id1) => {
  //   try {
  //     await axios.delete(`http://localhost:8080/relations/${id}/${id1}`);
  //     setRelations(relations.filter(relation => relation.id !== id1)); // Update the entities state to remove the deleted entity
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleDelete = async (id1) => {
  //   try {
  //     await axios.delete(`http://localhost:8080/${id}/${id1}`);
  //     setEntities(entities.filter(entity => entity.id !== id1)); // Update the entities state to remove the deleted entity
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="main">
      <h1>ER Simulator</h1>
      <div className="entities">
        {entities.map((entity) => (
          <div key={entity.id} className="entity">
            <h2>{entity.name}</h2>
            <div className="attributes">
              {entity.attributes.map((attribute) => (
                <div key={attribute.id} className="attribute">
                  <h3>{attribute.name}</h3>
                  <h4>{attribute.dataType}</h4>
                  <h4>{attribute.isPrimaryKey.toString()}</h4>
                  <h4>{attribute.isMultiValue.toString()}</h4>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>


      <button className="addHome">
        <Link
          to="/${id}/entities"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Make Changes in Entities
        </Link>
      </button>

      <button className="addHome">
        <Link
          to="/${id}/entities"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Add new Entity
        </Link>
      </button>

      <br />
      <br />
      <div className="relations">
        
      {relations.map((relation) => (
          <div key={relation.id} className="relation">
            <h2>{relation.name}</h2>
            <h3>{relation.from}</h3>
            <h3>{relation.to}</h3>
            <h3>{relation.type}</h3>
            <div className="attributes">
              {relation.attributes.map((attribute) => (
                <div key={attribute.id} className="attribute">
                  <h3>{attribute.name}</h3>
                  <h4>{attribute.dataType}</h4>
                  <h4>{attribute.isPrimaryKey.toString()}</h4>
                  <h4>{attribute.isMultiValue.toString()}</h4>
                </div>
              ))}
            </div>
          </div>
        ))}

      <button className="addHome">
        <Link
          to="/${id}/relations"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Make Changes Relationship
        </Link>
      </button>
      <button className="addHome">
        <Link
          to="/${id}/relations"
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
