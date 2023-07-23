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


  const getData = () => {
    let url = "http://localhost:9000/employee";
  
    if (q) {
      url += `?q=${encodeURIComponent(q)}`;
    }
  
    axios.get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }



  const addData = () => {
    console.log(init);
    axios.post(`http://localhost:9000/employee`, init)
      .then((res) => {
        getData()
        alert("Sucessfully add!")
      })
  }



  useEffect(() => {
    getData(q)
   

  },[q])

  
  


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






  return (
    <div  >
   
      <nav class="navbar navbar-dark bg-primary p-3 mb-3 w=100">
        <div class="container-fluid text-light">

          Employee

        </div>
      </nav>
      <div class="container-fluid w-50 m-auto">

        <form >
          <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input name="Name" value={init.Name} onChange={handleChange} type="text" class="form-control" aria-describedby="emailHelp" />

          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Email</label>
            <input name="Email" value={init.Email} onChange={handleChange} type="email" class="form-control" placeholder='Employee Email' />
          </div>

          <div class="form-group">
            <label for="exampleInputPassword1">Role</label>
            <input name="Designation" value={init.Designation} onChange={handleChange} type="text" class="form-control" placeholder='Employee Role' />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Salary</label>
            <input name="Salary" value={init.Salary} onChange={handleChange} type="number" class="form-control" placeholder='Employee Salary' />
          </div>

          <button onClick={addData} type="submit" class="btn btn-primary">Submit</button>
        </form>

      </div>


<div  style={{width:"50%",margin:"auto",marginTop:"20px",marginBottom:"20px"}}>
<input
      
        type="text"
        placeholder="Search by Name or Email"
        value={q}
        onKeyDown={(e) => setSearchQuery(e.target.value)}
      />
</div>
      

      <table  class="table w-75  m-auto  ">

   
        <thead class="thead-dark">
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

              <tr>
                <th scope="row">{i + 1}</th>
                <td>{el.Name}</td>
                <td>{el.Email}</td>
                <td>{el.Designation}</td>
                <td>{el.Salary}</td>
                <td><button type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-primary">Edit</button> <button type="button ml-4" class="btn btn-danger" onClick={() => deleteItem(el.Id)}>Delete</button></td>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Employee</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form >
                          <div class="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <input name="Name" value={init.Name} onChange={handleChange} type="text" class="form-control" aria-describedby="emailHelp" />

                          </div>
                          <div class="form-group">
                            <label for="exampleInputPassword1">Email</label>
                            <input name="Email" value={init.Email} onChange={handleChange} type="email" class="form-control" placeholder='Employee Email' />
                          </div>

                          <div class="form-group">
                            <label for="exampleInputPassword1">Role</label>
                            <input name="Designation" value={init.Designation} onChange={handleChange} type="text" class="form-control" placeholder='Employee Role' />
                          </div>
                          <div class="form-group">
                            <label for="exampleInputPassword1">Salary</label>
                            <input name="Salary" value={init.Salary} onChange={handleChange} type="number" class="form-control" placeholder='Employee Salary' />
                          </div>


                        </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button onClick={() => putItem(el.Id)} type="button" class="btn btn-primary">Save changes</button>
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
