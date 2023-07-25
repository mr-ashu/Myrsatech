import axios from "axios"
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [q, setSearchQuery] = useState("");
  const [data, setData] = useState([])
  const [init, setInit] = useState({
    Name: "",
    Email: "",
    Designation: "",
    Salary: ""
  })


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInit(prevState => ({ ...prevState, [name]: value }));

  }

  console.log(q);

  const getData = ({q}={}) => {
    let url = "http://localhost:9000/employee";

    if (q) {
      url += `?q=${encodeURIComponent(q)}`;
    }
    console.log(url);
    axios.get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }



  const addData = () => {
    
    axios.post(`http://localhost:9000/employee`, init)
      .then((res) => {
        getData()
     
        alert("Sucessfully add!")
      })

    
  }



  useEffect(() => {
    getData({q})


  }, [q])





  const deleteItem = (id) => {
    axios.delete(`http://localhost:9000/employee/${id}`)
      .then((res) => {
        getData()
        alert("Delete sucess!");
      })
  }

  const putItem = (id) => {

    axios.put(`http://localhost:9000/employee/${id}`, init)
      .then((res) => {
        getData()
        alert("Delete sucess!");
      })
  }

const deleteAll=()=>{
  axios.delete(`http://localhost:9000/employee`)
  .then((res) => {
    getData()
    alert("Delete all sucess!");
  })
}





  return (
    <div>


      <nav className="navbar navbar-expand-lg bg-primary p-2 text-light mb-4">
        <div className="container-fluid">

          <h5>Employee Board</h5>


          <form >
            <input  onChange={(e)=>setSearchQuery(e.target.value)} value={q} className="form-control me-2 mr-3" type="search" placeholder="Search by name or email" aria-label="Search" />
           </form>
        </div>

      </nav>





 
        <div className="container shadow-sm p-3  m-auto"   >

          <div className="row g-3 mb-4">
            <div className="col">
              <label for="exampleInputEmail1">Name</label>
              <input   name="Name" value={init.Name} onChange={handleChange} type="text" className="form-control" aria-describedby="emailHelp" placeholder="Name"/>

            </div>
            <div className="col">
              <label for="exampleInputPassword1">Email</label>
              <input name="Email" value={init.Email} onChange={handleChange} type="email" className="form-control" placeholder='Employee Email' />
            </div>

            <div className="col">
              <label for="exampleInputPassword1">Role</label>
              <input name="Designation" value={init.Designation} onChange={handleChange} type="text" className="form-control" placeholder='Employee Role' />
            </div>
            <div className="col">
              <label for="exampleInputPassword1">Salary</label>
              <input name="Salary" value={init.Salary} onChange={handleChange} type="number" className="form-control" placeholder='Employee Salary' />
            </div>

            
          </div>

          <button onClick={addData} type="submit" className="btn btn-primary">Submit</button>
          <button  onClick={deleteAll}   className="btn btn-danger ml-3">Delete All</button>
        </div>





        <table className="container  shadow-sm p-3 table w-75 mt-3">


          <thead className="table-primary ">
            <tr>
              <th scope="col">Sr.</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Salary</th>
              <th scope="col">Action</th>

            </tr>
          </thead>
          <tbody>
            {
              data?.map((el, i) => (

                <tr key={i}>
                  <td scope="row ">{i + 1}</td>
                  <td scope="row">{el.Name}</td>
                  <td scope="row">{el.Email}</td>
                  <td scope="row">{el.Designation}</td>
                  <td scope="row">{el.Salary}</td>
                  <td scope="row"><button type="button" data-toggle="modal" data-target={`#exampleModal${el.Id}`} className="btn btn-primary">Edit</button> <button type="button ml-4" className="btn btn-danger" onClick={() => deleteItem(el.Id)}>Delete</button></td>
                  <div className="modal fade" id={`exampleModal${el.Id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id={`exampleModal${el.Id}`}>Edit Employee</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <form >
                            <div className="form-group">
                              <label for="exampleInputEmail1">Name</label>
                              <input name="Name" value={init.Name} onChange={handleChange} type="text" className="form-control" aria-describedby="emailHelp" />

                            </div>
                            <div className="form-group">
                              <label for="exampleInputPassword1">Email</label>
                              <input name="Email" value={init.Email} onChange={handleChange} type="email" className="form-control" placeholder='Employee Email' />
                            </div>

                            <div className="form-group">
                              <label for="exampleInputPassword1">Role</label>
                              <input name="Designation" value={init.Designation} onChange={handleChange} type="text" className="form-control" placeholder='Employee Role' />
                            </div>
                            <div className="form-group">
                              <label for="exampleInputPassword1">Salary</label>
                              <input name="Salary" value={init.Salary} onChange={handleChange} type="number" className="form-control" placeholder='Employee Salary' />
                            </div>


                          </form>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button onClick={() => putItem(el.Id)} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div>


                </tr>
              ))
            }




          </tbody>
        </table>
     




    </div>
  );
}

export default App;
