import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
import { createurl, log } from '../env';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [mobiles, setMobiles] = useState([]);
  const [model, setModel] = useState('');
  const [company, setCompany] = useState('');
  const [RAM, setRAM] = useState('');
  const [storage, setStorage] = useState('');
  const [battery, setBattery] = useState('');
  const [camera, setCamera] = useState('');
  const [price, setPrice] = useState('');
  const [id, setId] = useState('');
  const [addBtn, setAddBtn] = useState(true);
  const [editBtn, setEditBtn] = useState(false);
  // const [companies, setCompanies] = useState([]);
  // const [rams, setRams] = useState([]);
  // const [storages, setStorages] = useState([]);
  // const [cameras, setCameras] = useState([]);
  const [selectedComp, setSelectedComp] = useState('');
  const [selectedRam, setSelectedRam] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedCamera, setSelectedCamera] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  
  useEffect(() => {
    const getMobiles = async()=>{
      const url = createurl('');
      axios.get(url)
      .then(res => {
        debugger;
        setMobiles(res.data);
        // setCompanies(getUniqueData(res.data, "company"));
        // setStorages(getUniqueData(res.data, "storage"));
        // setRams(getUniqueData(res.data, "RAM"));
        // setCameras(getUniqueData(res.data, "camera_MP"));
      })
      .catch(error =>{
        log(error);
      })
    };
    getMobiles();
  }, []);
  
  useEffect(()=>{}, [mobiles]);

  const addMobile = ()=>{
    if(model === '' || company === '' || RAM === '' || storage === '' || battery === '' 
    || camera === '' || price === ''){
      toast.error('All fields are compulsory!!!');
    }
    else{
      const url = createurl('');
      axios.post(url, {
        model,
        company,
        RAM,
        storage,
        battery,
        camera,
        price,
      })
      .then(res=> {
        log(res.data);
        toast.success(res.data.message);
        setTimeout(()=>{
          window.location.reload();
        }, 1500);
      })
      .catch(error=>{
        log(error);
      });
    }
  
  };

  const deleteMobile = (id)=>{
    const url = createurl(`/${id}`);
    axios.delete(url)
    .then(res => {
      log(res.data);
      toast.success(res.data.message);
      setTimeout(()=>{
        window.location.reload();
      }, 1500);
    })
    .catch(error => {
      log(error);
    });
  };

  const getData = (id) => {
    const url = createurl(`/${id}`);
    axios.get(url)
    .then(res => {
      setAddBtn(false);
      setEditBtn(true);
      log(res.data);
      setId(res.data[0].id);
      setModel(res.data[0].model);
      setCompany(res.data[0].company);
      setRAM(res.data[0].RAM);
      setStorage(res.data[0].storage);
      setBattery(res.data[0].battery_mAh);
      setCamera(res.data[0].camera_MP);
      setPrice(res.data[0].price);
    })
    .catch(error =>{
      log(error);
    });
  };

  const editMobile = () => {
    setAddBtn(true);
    setEditBtn(false);
    const url = createurl(`/${id}`);
    axios.put(url, {
      model, company, RAM, storage, battery, camera, price,
    })
    .then(res => {
      log(res.data);
      toast.success(res.data.message);
      setTimeout(()=>{
        window.location.reload();
      }, 1500);
    })
    .catch(error => {
      log(error);
    });
  };

  const back = () => {
    setAddBtn(true);
    setEditBtn(false);
    setModel('');
    setCompany('');
    setRAM('');
    setStorage('');
    setBattery('');
    setCamera('');
    setPrice('');
  };

  const getUniqueData = (data, property) => {
    let newVal = data.map((item) => {
      return item[property];
    });
    log(newVal);
    return newVal = [...new Set(newVal)];
  };

  const handleCompanyChange = (event) => {
    setSelectedComp(event.target.value);
    log(filteredMobiles);
  };

  const handleRamChange = (event) => {
    setSelectedRam(event.target.value);
  };

  const handleStorageChange = (event) => {
    setSelectedStorage(event.target.value);
  };

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const filteredMobiles = mobiles.filter((mobile) => {
    const selRamNumber = selectedRam !== '' ? Number(selectedRam) : '';
    const selStorageNumber = selectedStorage !== '' ? Number(selectedStorage) : '';
    const selCameraNumber = selectedCamera !== '' ? Number(selectedCamera) : '';
    const selPriceNumber = selectedPrice !== '' ? Number(selectedPrice) : '';
    if(selectedPrice === '9999999'){
      return (
        (selectedRam === '' || mobile.RAM === selRamNumber) &&
        (selectedComp === '' || mobile.company === selectedComp) &&
        (selectedStorage === '' || mobile.storage === selStorageNumber) &&
        (selectedCamera === '' || mobile.camera_MP === selCameraNumber) &&
        mobile.price > 100000
      );
    }
    return (
      (selectedRam === '' || mobile.RAM === selRamNumber) &&
      (selectedComp === '' || mobile.company === selectedComp) &&
      (selectedStorage === '' || mobile.storage === selStorageNumber) &&
      (selectedCamera === '' || mobile.camera_MP === selCameraNumber) &&
      (selectedPrice === '' || mobile.price < selPriceNumber)
    );
  });

  return (
    <div className='home-container'>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure ?</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal"
        onClick={()=>{deleteMobile(id)}}>Yes</button>
        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">No</button>
      </div>
    </div>
  </div>
</div>
    <div className="row">
      <div className='col-lg-4'>
      <i className="fa-solid fa-left-long" onClick={back}></i>
      </div>
      <div className='col-lg-4'><div className="header">
        <h1>MOB<span>!</span>LE HUB</h1>
      </div></div>
      <div className='col-lg-4'></div>
    </div>

      <div className='top-section row'>
        <div className='col-lg-3 col-md-1 col-0'></div>
        <div className='col-lg-6 col-md-10 col-12'>
          <div className='row details'>
          <div className='col-lg-4 label'>
            <p>Model</p>
          </div>
          <div className='col-lg-8 info'>
            <input type="text" value={model} className='form-control' required onChange={(e)=>setModel(e.target.value)}/>
          </div>
          </div>

          <div className='row details'>
          <div className='col-lg-4 label'>
            <p>Company</p>
          </div>
          <div className='col-lg-8 info'>
            <input type="text" value={company} className='form-control' required onChange={(e)=>setCompany(e.target.value)}/>
          </div>
          </div>

          <div className='row details'>
          <div className='col-lg-4 label'>
            <p>RAM (GB)</p>
          </div>
          <div className='col-lg-8 info'>
            <input type="number" value={RAM} className='form-control' required onChange={(e)=>setRAM(e.target.value)}/>
          </div>
          </div>

          <div className='row details'>
          <div className='col-lg-4 label'>
            <p>Storage (GB)</p>
          </div>
          <div className='col-lg-8 info'>
            <input type="number" value={storage} className='form-control' required onChange={(e)=>setStorage(e.target.value)}/>
          </div>
          </div>

          <div className='row details'>
          <div className='col-lg-4 label'>
            <p>Battery (mAh)</p>
          </div>
          <div className='col-lg-8 info'>
            <input type="number" value={battery} className='form-control' required onChange={(e)=>setBattery(e.target.value)}/>
          </div>
          </div>

          <div className='row details'>
          <div className='col-lg-4 label'>
            <p>Camera (MP)</p>
          </div>
          <div className='col-lg-8 info'>
            <input type="number" value={camera} className='form-control' required onChange={(e)=>setCamera(e.target.value)}/>
          </div>
          </div>

          <div className='row details'>
          <div className='col-lg-4 label'>
            <p>Price(₹)</p>
          </div>
          <div className='col-lg-8 info'>
            <input type="number" value={price} className='form-control' required onChange={(e)=>setPrice(e.target.value)}/>
          </div>
          </div>

          <div className='button'>
            {
              addBtn && <button className='btn btn-dark' onClick={addMobile}>Add Mobile</button>
            }
            {
              editBtn && <button className='btn btn-dark' onClick={editMobile}>Update Mobile</button>
            }
          </div>
  
        </div>
        <div className='col-lg-3 col-md-1 col-0'></div>
      </div>
      <hr></hr>
      <div className="row filters">
        <div className="col-xl-2 heading"><h5>Filters</h5></div>
        <div className="col-xl-2 filter">
        <select className="form-select" onChange={handleCompanyChange} aria-label="Default select example">
          <option value="">--All Companies--</option>
          {
            [...new Set(filteredMobiles.map((mobile) => mobile.company))].map((item) => (
              <option key={item} value={item}>{item}</option>
            ))
          }
        </select>
        </div>
        <div className="col-xl-2 filter">
        <select className="form-select" onChange={handleRamChange} aria-label="Default select example">
          <option value="">--All RAM sizes--</option>
          {
            [...new Set(filteredMobiles.map((mobile) => mobile.RAM))].map((item) => (
              <option key={item} value={item}>{item}</option>
            ))
          }
        </select>
        </div>
        <div className="col-xl-2 filter">
        <select className="form-select" onChange={handleStorageChange} aria-label="Default select example">
          <option value="">--All Storage sizes--</option>
          {
            [...new Set(filteredMobiles.map((mobile) => mobile.storage))].map((st) => (
              <option key={st} value={st}>{st}</option>
            ))
          }
        </select>
        </div>
        <div className="col-xl-2 filter">
        <select className="form-select" onChange={handleCameraChange} aria-label="Default select example">
          <option value="">--All Camera sizes--</option>
          {
            [...new Set(filteredMobiles.map((mobile) => mobile.camera_MP))].map((item) => (
              <option key={item} value={item}>{item}</option>
            ))
          }
        </select>
        </div>
        <div className="col-xl-2 filter">
        <select className="form-select" onChange={handlePriceChange} aria-label="Default select example">
          <option value="">--All Price Ranges--</option>
          <option value={20000}>Upto ₹ 20,000</option>
          <option value={40000}>Upto ₹ 40,000</option>
          <option value={60000}>Upto ₹ 60,000</option>
          <option value={60000}>Upto ₹ 80,000</option>
          <option value={100000}>Upto ₹ 1,00,000</option>
          <option value={9999999}>Above ₹ 1,00,000</option>
        </select>
        </div>
      </div>
      <hr/>
      <div className='bottom-section'>
      <div className="container">
        <table className='table table-hover'>
          <thead>
            <tr>
              <td>Model</td>
              <td>Company</td>
              <td>RAM (GB)</td>
              <td>Storage (GB)</td>
              <td>Battery (mAh)</td>
              <td>Camera (MP)</td>
              <td>Price (₹)</td>
              <td>action</td>
            </tr>
          </thead>

          <tbody>
            {
              filteredMobiles.length === 0 ? (
                <tr>
                  <td colSpan={8} className='no-result'>
                    <h1>No Mobiles Found</h1>
                  </td>
                </tr>
              ) : (
              filteredMobiles.map((mobile)=>{
                return(<tr key={mobile.id}>
                  <td>{mobile.model}</td>
                  <td>{mobile.company}</td>
                  <td>{mobile.RAM}</td>
                  <td>{mobile.storage}</td>
                  <td>{mobile.battery_mAh}</td>
                  <td>{mobile.camera_MP}</td>
                  <td>{mobile.price}</td>
                  <td>
                  <i className="fa-solid fa-pen-to-square" onClick={() => {getData(mobile.id)}}></i>
                  <i className="fa-solid fa-trash" onClick={() => {setId(mobile.id)}}
                  data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                  </td>
                </tr>)
              })
              )
            }
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

export default Home
