import axios from "axios";
// import { Link } from "react-router-dom";

const HomeComp = () => {
  const handleCreateER = async () => {
    try {
      const res = await axios.post("http://localhost:8080/"); // Create new ER diagram with auto-incremented ID
      const newId = res.data.id;
      window.location.href = `/${newId}`; // Redirect to new ER diagram page
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home">
      <h1>ER Simulator</h1>
      <button onClick={handleCreateER}>Create New ER Diagram</button>
      <p>Click the button above to create a new ER diagram.</p>
    </div>
  );
};

export default HomeComp;