/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import dataId from "../id.json"
import dataDetails from "../detail.json"
console.log(new Date(dataDetails[0].timestamp))
const months=["January","February","March","April","May","June","July","August","September","October","November","December"]

function App() {
  const [searchInput,setSearchInput]=useState("")
  const [filtered,setFiltered]=useState(null);
  console.log(dataDetails)
  const setChange=(e)=>{
    setSearchInput(e.target.value)
    let serchValue=e.target.value;
    let filteredData=dataDetails.filter(e=>e.alert_type.toLowerCase().includes(serchValue)||e.driver_friendly_name.toLowerCase().includes(serchValue)||e.timestamp.toLowerCase().includes(serchValue)||e.vehicle_friendly_name.toLowerCase().includes(serchValue))

    setFiltered(filteredData)
    console.log(filteredData)
  }
  return (
    <>
     <div className="parent">
      <div className="child1">
          <div className="search">
            <input type="text" placeholder='Search' value={searchInput} onChange={setChange} />
          </div>
          <div className="vehicle">
            <input type="text" placeholder='VEHICLE#'/>
          </div>
          <div className="range">
          <input type="text" placeholder='Date Range'/>
          </div>
      </div>
      <div className="child2">
        <section className='alert'>
          <h1>Alert</h1>
          {filtered?filtered.map((ele,i)=>{
            let date=new Date(ele.timestamp);
            return <div key={i} className="eachDetail">
            <div className='status'>
            <h4 className='alterType'>{ele.alert_type}</h4>
            <h5> &#x2022; {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</h5>
            </div>
            <section className='driver'>
              Driver: &nbsp; <span className="driverID">
              {ele.driver_friendly_name}/{dataId.find(x=>x.id===ele.vehicle_id).friendly_name}
              </span>
            </section>
          </div>
          }):dataDetails.map((ele,i)=>{
            let date=new Date(ele.timestamp);
            return <div key={i} className="eachDetail">
            <div className='status'>
            <h4 className='alterType'>{ele.alert_type}</h4>
            <h5> &#x2022; {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</h5>
            </div>
            <section className='driver'>
              Driver: &nbsp; <span className="driverID">
              {ele.driver_friendly_name}/{dataId.find(x=>x.id===ele.vehicle_id).friendly_name}
              </span>
            </section>
          </div>
          })}
        </section>
      </div>
     </div>
    </>
  )
}

export default App
