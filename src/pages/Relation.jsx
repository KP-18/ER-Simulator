import React from 'react'

const Relation = () => {

    const [relation, setRelation] = useState([{
        name: "",
        from: "",
        to: "",
        type: "",
        attributes: []
      }]);

      
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...relation];
    list[index] = {
      ...list[index],
      [name]: value
    };
    setRelation(list);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    setRelation([...relation,{
        name: "",
        from: "",
        to: "",
        type: "",
        attributes: []
    }]);
  };

  const handleRemove = index =>{
    const list = [...relation];
    list.splice(index,1);
    setRelation(list);
  }; 

  return (
    <div>
      
      <div className="single-relations">
                <FormField
                    label="Relation Name"
                    name="name"
                    onChange={handleChange}
                    />
                <FormField
                    label="From Entity"
                    name="from"
                    onChange={handleChange}
                    />
                <FormField
                    label="To Entity"
                    name="to"
                    onChange={handleChange}
                    />
                <FormField
                    label="Relation Type"
                    name="type"
                    onChange={handleChange}
                    />
            <div className="attributes">

                <h2>Attributes</h2>
                    <div className="single-attribute">
                    <Attributes/>
                    </div>
            </div>
            
            { relation.length - 1 === i && 
                <button onClick={(e) => handleAdd(e)}>Add relationship</button>
            }
            { relation.length !== 1 && 
                <button onClick={() => handleRemove(i)}>Remove relation</button>
            }
            </div>

    </div>
  )
}

export default Relation
