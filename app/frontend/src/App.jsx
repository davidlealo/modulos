import { useState } from 'react'
import Webcam from "react-webcam";

import './App.css'

function App() {
  const WebcamComponent = () => <Webcam />;

  return (
    <>
      <div className="main">
      <h1>Foto desde tu cámara</h1>
      <Webcam />
      </div>
    </>
  )
}

export default App
