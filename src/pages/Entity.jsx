// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Attributes from "./Attributes";
// import FormField from "./FormField";

// const Entity = () => {
//     const [entity, setEntity] = useState([
//         {
//             name : "",
//             attributes : []
//         }
//     ]);
    
//     const handleChange = (e, index) => {
//         const { name, value } = e.target;
//         const list = [...entity];
//         list[index] = {
//           ...list[index],
//           [name]: value
//         };
//         setEntity(list);
//       };

//     const handleAdd = (e) => {
//         e.preventDefault();
    
//         setEntity([...entity,{
//           name: "",
//           attributes: []
//         }]);
//       };
    
//       const handleRemove = index =>{
//         const list = [...entity];
//         list.splice(index,1);
//         setEntity(list);
//       } 
//       return (
//     <div className="form">
//       <h1>All Entities</h1>

//       <div className="entity">
//         <FormField
//           label="Entity Name"
//           name="name"
//           onChange={e => handleChange(e)}
//           />
//               <div  className="attribute">

//                   <Attributes />
//                   </div>
//         {  
//         <button onClick={(e) => handleAdd(e)}>Add Entity</button>
//         }
//         { 
//         <button onClick={() => handleRemove(i)}>Remove Entity</button>
//         }
//         </div>
//     </div>
//   )
// }

// export default Entity
