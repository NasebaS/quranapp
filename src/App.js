import logo from './logo.svg';
import './App.css';
import "./quran2.jpg";
import {LanguagesAvailable} from "./LanguageAvailable";
import React,{useState,useEffect} from 'react';
import {API} from "./LanguageAvailable";


function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  const handleOnError = (error, errorInfo) => {
    console.error('Error caught by error boundary:', error, errorInfo);
    setHasError(true);
  };

  if (hasError) {
    return <div>Oops! Something went wrong.</div>;
  }

  return (
    <React.ErrorBoundary onError={handleOnError}>
      {children}
    </React.ErrorBoundary>
  );
}

function App() {

  const [selectedItem,setSelectedItem]=useState("");
  const [bookData,setBookData]=useState([]);
  const [boxDataArray,setBoxDataArray]=useState([]);



  useEffect(()=>{
  fetch(`${API}`)
  .then((res)=>res.json())
  .then((data)=>{
    const api=Object.values(data);
    setBookData(api);
      });
},[]);

  const handleChange=(event)=>{
    setSelectedItem(event.target.value);
  }
  useEffect(()=>{
    if(selectedItem){
      let filteredItem=[];
filteredItem = bookData.find((item) => item.language === selectedItem);
if(filteredItem){
  fetch(filteredItem.link)
.then((res)=>res.json())
.then((data)=>{  
setBoxDataArray(data.quran)


})}    }

  },[bookData,selectedItem])

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
        <div className='langdiv'>
          <p>Language: {selectedItem}</p>
        </div>
      
          {boxDataArray.map((item, index) => (
          
            <div key={index}>
              
              <p>Verse: {item.verse}</p>
              <p>Text: {item.text}</p>
            </div>
          ))}
        
      </div>
    </div>
  );
}

export default App;
