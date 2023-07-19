import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";
import "./home.css";

const HomeComp = () => {
  const [name, setName] = useState({
    name: "",
  });
  const navigate = useNavigate();
  const handleCreateER = async () => {
    try {
      console.log("making post request for ", name);
      const res = await axios.post("http://localhost:8080/api/post", name); // Create new ER diagram with auto-incremented ID
      console.log("Created new ER diagram");
      const newId = res.data._id;
      navigate(`${newId}`); // Redirect to new ER diagram page
    } catch (err) {
      console.log(err);
    }
  };

  const getIdByName = (ers,Name) => {

    console.log("this is  : ",Name);
    for(let i = 0; i < ers.length;i++)
      {
        console.log(ers[i].name);
        if(Name.name === ers[i].name){
          
            return ers[i]._id;
        }
      }
      return 0;
  }
  const handleGotoER = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/getAll"); // Get all ER diagrams
      const ers = res.data;
      // getIdByName
      console.log(ers);
      console.log(name);
      const newId = getIdByName(ers,name);
      if(newId === 0){
         alert("their is no ER-Diagram present with this name.Please check the name")
      }else{
        navigate(`${newId}`); // Redirect to first ER diagram page
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="home">
      <div className="container">
        <h1 className="title">ER Simulator</h1>
        <div className="form-container">
          <FormField
            label="ER Diagram Name: "
            name="name"
            onChange={(e) => {
              setName({ name: e.target.value });
            }}
          />
          <button className="btn" onClick={handleCreateER}>
            Create New ER Diagram
          </button>
          <p className="instructions">
            Click the button above to create a new ER diagram.
          </p>
          <button className="btn" onClick={handleGotoER}>
            GO to ER Diagram
          </button>
          <p className="instructions">
            Click the button above to open exisiting ER diagram.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeComp;