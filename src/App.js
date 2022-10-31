import DropzoneComponent from './DropzoneComponent';
import Button from 'react-bootstrap/Button';
import './App.css';
import Progressbar from './Progress_bar';
import React, { useEffect, useState } from 'react';
let progressInterval = null;
let uploadFile = false;

function App( ) {
  const [progresshook, setProgresshook] = useState(0);
 
  useEffect(() => {
    progressInterval = setInterval(() => {
      if (uploadFile === true){
        setProgresshook(prev => prev + 1);
      }
      
    }, 100);
  }, []);
 
  useEffect(() => {
    if (progresshook >= 100) {
      clearInterval(progressInterval);
      setProgresshook( c => 0);
      uploadFile = false;
    }
  }, [progresshook]);

const handleButton = () => {
  if (uploadFile === false){
    uploadFile = true;
  }else{
    uploadFile = false;
    clearInterval(progressInterval);
    setProgresshook( c => 0);
  }
 
  }

  return (
    <div className="App">
      <DropzoneComponent />
      <Button type="button" onClick={ () => handleButton() }>
        upload file
      </Button>
      <h2>Uploading file {progresshook} % </h2>
      <Progressbar bgcolor="#99ccff" progress={progresshook}  height={30} />
    </div>

  );
}

export default App;