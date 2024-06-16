import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { fabric } from 'fabric';

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [canvas, setCanvas] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef]);

  const saveImage = async () => {
    if (!imageSrc) return;

    const formData = new FormData();
    const blob = await fetch(imageSrc).then(res => res.blob());
    const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
    formData.append('file', file);

    const response = await fetch('http://localhost:3000/photos/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log('Image saved:', data);
  };

  useEffect(() => {
    if (imageSrc) {
      const canvasEl = new fabric.Canvas('canvas', {
        width: 640,
        height: 480,
      });
      fabric.Image.fromURL(imageSrc, img => {
        canvasEl.setBackgroundImage(img, canvasEl.renderAll.bind(canvasEl));
      });
      setCanvas(canvasEl);
    }
  }, [imageSrc]);

  const enableDrawingMode = () => {
    if (canvas) {
      canvas.isDrawingMode = true;
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
      <button onClick={capture}>Capture Photo</button>
      <button onClick={saveImage}>Save Photo</button>
      {imageSrc && (
        <>
          <canvas id="canvas"></canvas>
          <button onClick={enableDrawingMode}>Draw on Photo</button>
        </>
      )}
    </div>
  );
};

export default WebcamComponent;