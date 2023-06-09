import './App.css';
import "./quran2.jpg";
import { LanguagesAvailable } from "./LanguageAvailable";
import React, { useState, useEffect } from 'react';
import { API } from "./LanguageAvailable";

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
  const [selectedItem, setSelectedItem] = useState("");
  const [bookData, setBookData] = useState([]);
  const [boxDataArray, setBoxDataArray] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [chapterDataArray, setChapterDataArray] = useState([]);

  useEffect(() => {
    fetch(`${API}`)
      .then((res) => res.json())
      .then((data) => {
        const api = Object.values(data);
        setBookData(api);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedItem) {
      let filteredItem = bookData.find((item) => item.language === selectedItem);
      if (filteredItem) {
        fetch(filteredItem.link)
          .then((res) => res.json())
          .then((data) => {
            setBoxDataArray(data); 
                   
          })
          .catch((error) => {
            console.error("Error fetching box data:", error);
          });
      }
    }
  }, [bookData, selectedItem]);

   useEffect(() => {
    if (selectedChapter && boxDataArray.length > 0) {
      let filteredChapter=[]
     filteredChapter = boxDataArray.quran.find((item) => item.chapter === selectedChapter);
       console.log(filteredChapter)
      if (filteredChapter) {
        
        fetch(filteredChapter)
        .then((res)=>res.json())
        .then((data)=>{
setChapterDataArray(data);

        })
        
      }
    }
  }, [selectedChapter, boxDataArray]);

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  }

  const handleChapterChange = (event) => {
    setSelectedChapter(event.target.value);
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
      {boxDataArray && boxDataArray.length > 0 && (
        <select value={selectedChapter} onChange={handleChapterChange} className='chapters'>
          {boxDataArray.map((item, id) => (
            <option key={id} value={item.chapter}>
              {item.chapter}
            </option>
          ))}
        </select>
      )}
      <div className='section'>
        <div className='langdiv'>
          <p>Language: {selectedItem}</p>
        </div>
        {chapterDataArray && chapterDataArray.length > 0 && (
          chapterDataArray
          .map((item, index) => (
            <div key={index}>
              <p>Verse: {item.verse}</p>
              <p>Text: {item.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
