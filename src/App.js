import logo from './logo.svg';
import './App.css';
import "./quran2.jpg";
import {LanguagesAvailable} from "./LanguageAvailable";
import {useState,useEffect} from 'react';
import {API} from "./LanguageAvailable";



function App() {

  const [selectedItem,setSelectedItem]=useState("");
  const [bookData,setBookData]=useState([]);

  useEffect(()=>{
  fetch(`${API}`)
  .then((res)=>res.json())
  .then((data)=>{
    setBookData(data);
      });
  
},[]);

  const handleChange=(event)=>{
    setSelectedItem(event.target.value);
  }
  let filteredItem=[];
  if(bookData.length>0){
 filteredItem = bookData.filter((item) => item.language === selectedItem);
  console.log(filteredItem);
}
  return (


    <div className="App">
      
      <select value={selectedItem} onChange={handleChange} className="languages">
        {LanguagesAvailable.map((item, id) => (
          <option key={id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <div className='section'>
        <div className='langdiv'><p>Language :      {selectedItem}</p></div>{
        filteredItem.map((item)=>(
          <div key={item.id}>{item.link}</div>
        ))}
      
      </div>
      
    </div>
  );
}

export default App;
