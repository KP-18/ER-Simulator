import axios from "axios";
import { useState } from "react";
import FormField from "./FormField";
// import { Link } from "react-router-dom";


const HomeComp = () => {
  const [name,setName] = useState("");
  const handleCreateER = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/post",name); // Create new ER diagram with auto-incremented ID
      console.log("Created new ER diagram");
      const newId = res.data.id;
      window.location.href = `/${newId}`; // Redirect to new ER diagram page
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home">
      <h1>ER Simulator</h1>
      <div className="create-er">
      <FormField
          label="ER Diagram Name : "
          name="name"
          onChange= {(e)=>{setName(e.target.value)}}
          />
      <button onClick={handleCreateER}>Create New ER Diagram</button>
      <p>Click the button above to create a new ER diagram.</p>
      </div>
    </div>
  );
};

export default HomeComp;