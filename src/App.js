import './App.css';
import CSVReader from "react-csv-reader";
import Card from './components/card';
import { useState } from 'react';

function App() {
  const [cards, setCards] = useState([]);

  const parseCSV = (data, fileInfo) => {
    if( data && data.length ) {
      var arr = [];

      data.map( (item, index) => item.place && item.id && item.name && arr.push( { uid: index, place: item.place, id: item.id, name: item.name } ) );

      setCards(arr);
    }
  }

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
  };

  return (
      <div className="container">
          <CSVReader
              cssClass="react-csv-input"
              onFileLoaded={parseCSV}
              parserOptions={papaparseOptions}
          />

          <div className="card-list">
              { 
                cards.map((item, index) => {
                  return (
                    <Card key={index} detail={item} />
                  )
                })
              }
          </div>

          <div className="download-card-list">
            { 
              cards.map((item, index) => {
                return (
                  <Card key={index} detail={item} downloadCard={true} />
                )
              })
            }
          </div>
      </div>
  );
}

export default App;
