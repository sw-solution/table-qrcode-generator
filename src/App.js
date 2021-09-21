import './App.css';
import CSVReader from "react-csv-reader";
import Card from './components/card';
import { useState } from 'react';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';

import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

function App() {
  const [cards, setCards] = useState([]);

  const parseCSV = (data, fileInfo) => {
    if (data && data.length) {
      var arr = [];

      data.map((item, index) => item.place && item.id && item.name && arr.push({ uid: index, place: item.place, id: item.id, name: item.name }));

      setCards(arr);
    }
  }

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
  };

  const downloadImages = () => {
    const zip = require('jszip')();

    cards.map((item, index) => {
      var node = document.getElementById('card_item_download_' + item.uid)

      return toPng(node.parentElement)
        .then((dataUrl) => {

          zip.file(item.name + ".png", dataUrl.split(',')[1], {base64: true});

          if (index === cards.length - 1) {
            zip.generateAsync({ type: "blob" }).then(content => {
              saveAs(content, "table-qrcode.zip");
            });
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  return (
    <Container id="qrcode_app" className="text-center">
      <CSVReader
        cssClass="react-csv-input"
        onFileLoaded={parseCSV}
        parserOptions={papaparseOptions}
      />

      {cards.length > 0 && <Button className="my-3" onClick={() => downloadImages()}> Download All </Button>
      }

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
    </Container>
  );
}

export default App;
