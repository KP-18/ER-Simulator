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

  return (
    <div className="main">
      <h1>ER Simulator</h1>
      <div className="entities">
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
          to="/${id}/entities"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Make Changes in Entities
        </Link>
      </button>

      <button className="addHome">
        <Link
          to="/entities/${id}"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Add new Entity
        </Link>
      </button>

      <br />
      <br />
      <div className="relations">
        
      {relations.map((relation) => (
          <div key={relation._id} className="relation">
            <h2>{relation.name}</h2>
            <h3>{relation.from}</h3>
            <h3>{relation.to}</h3>
            <h3>{relation.type}</h3>
            <div className="attributes">
              {relation.attributes.map((attribute) => (
                <div key={attribute._id} className="attribute">
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
          to="/relations/${id}"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Make Changes Relationship
        </Link>
      </button>
      <button className="addHome">
        <Link
          to="/relations/${id}"
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
