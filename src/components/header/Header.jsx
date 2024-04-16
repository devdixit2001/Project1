import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./header.css";
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useInsertionEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"


const header = ({type}) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [openOptions, setOpenOptions] = useState(false)
  const [options, setOptions] = useState({
    Adult: 1,
    Children: 0,
    Room: 1,
  });
  const navigate = useNavigate()

  const handleOption = (name, operation) =>{
    setOptions((prev) =>{
      return {
        ...prev,
        [name] : operation === "i" ? options[name] + 1 : options[name] - 1,

      };
    });
  };

  const handleSearch =()=>{
    navigate("/hotels", {state:{destination,date,options}})

  }
  return (
    <div className='header'>
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
         <div className="headerList"> 
            <div className="headerListItem active">
               <FontAwesomeIcon icon={faBed}/>  
               <span>Stays</span>
            </div>
            <div className="headerListItem">
               <FontAwesomeIcon icon={faPlane}/>  
               <span>Flights</span>
            </div>
            <div className="headerListItem">
               <FontAwesomeIcon icon={faCar}/>  
               <span>Car Rentals</span>
            </div>
           <div className="headerListItem">
               <FontAwesomeIcon icon={faBed}/>  
               <span>Attractions</span>
           </div>
           <div className="headerListItem">
               <FontAwesomeIcon icon={faTaxi}/>  
               <span>Airport Taxes</span>
           </div>
        </div>
        { type !=="list" && 
        <>
        <h1 className="headerTitle">Sign in, save money</h1>
        <p className="headerDesc">
          Save 10% or more at participating properties. Just 
          look for the blue Genius label.
        </p>
        <button className="headerBtn"> Sign in / Register </button>
        <div className="headerSearch">
          <div className="headerSearchItem"> 
            <FontAwesomeIcon icon={faBed} className='headerIcon'/>
            <input type="text"
             placeholder="Where Are You Going?"
             className="headerSearchInput" 
             onChange={(e)=> setDestination(e.target.value)}
            />
          </div>
          <div className="headerSearchItem"> 
            <FontAwesomeIcon icon={faCalendarDays} className='headerIcon'/>
            <span onClick={()=>setOpenDate(!openDate)} className='headerSearchText'>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>

            {openDate && <DateRange
               editableDateInputs={true}
               onChange={item => setDate([item.selection])}
               moveRangeOnFirstSelection={false}
               ranges={date}
               className='date'
               minDate={new Date()}
            />}
          </div>
          <div className="headerSearchItem"> 
            <FontAwesomeIcon icon={faPerson} className='headerIcon'/>
            <span onClick={()=>setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.Adult} adult . ${options.Children} children . ${options.Room} room`}</span>
              {openOptions && <div className="options">
              <div className="optionsItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                <button disabled={options.Adult<=1} className="optionCounterButton" onClick={()=>handleOption("Adult","d")}>-</button>
                <span className="optionCounterNumber">{options.Adult}</span>
                <button className="optionCounterButton" onClick={()=>handleOption("Adult","i")}>+</button>
                </div>
              </div>
              <div className="optionsItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                <button disabled={options.Children<=0} className="optionCounterButton" onClick={()=>handleOption("Children","d")}>-</button>
                <span className="optionCounterNumber">{options.Children}</span>
                <button className="optionCounterButton" onClick={()=>handleOption("Children","i")}>+</button>
                </div>
              </div>
              <div className="optionsItem">
                <span className="optionText">Room</span>
                <div className="optionCounter">
                <button disabled={options.Room<=1} className="optionCounterButton" onClick={()=>handleOption("Room","d")}>-</button>
                <span className="optionCounterNumber">{options.Room}</span>
                <button className="optionCounterButton" onClick={()=>handleOption("Room","i")}>+</button>
                </div>
              </div>
            </div>
            }
          </div>
          <div className="headerSearchItem"> 
          <button className="headerBtn" onClick={handleSearch}>Search</button>
          </div>
        </div></>}
      </div>
    </div>
  )
}

export default header
