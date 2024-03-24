import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import './ClientPage.css'; 
import '../index.css';

const ClientPage = () => {

    const [deviceList, setDeviceList] = useState([]);
    const [selectedDeviceData, setSelectedDeviceData] = useState(null);

    useEffect(() => {
      const fetchDeviceList = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/客戶A/getDeviceList`);
          setDeviceList(response.data.device_list);
        } catch (error) {
          console.error('Error fetching device list:', error);
        }
      };
  
      fetchDeviceList();
    }, []); 

    const handleDeviceSelection = async (deviceType, deviceIndex) => {
      console.log('Device selected:', deviceType, deviceIndex);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/客戶A/getDeviceData/${deviceType}/${deviceIndex}`);
        console.log("device details",response.data);
        setSelectedDeviceData(response.data);
      } catch (error) {
        console.error('Error fetching device data:', error);
      }
    };
    
    const drawImagesOnCanvas = (canvasData) => {
      const canvas = document.getElementById('myCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      canvasData.sort((a, b) => a.z - b.z);
  
      canvasData.forEach(item => {
        const image = new Image();
        image.onload = () => {
          const desiredHeight = 200;
          const aspectRatio = image.width / image.height;
          const desiredWidth = desiredHeight * aspectRatio;
  
          ctx.drawImage(image, item.x, item.y, desiredWidth, desiredHeight);
  
          //Space above the image for the text
          const TEXT_OFFSET = 30;
  
          ctx.font = "16px Arial";
          ctx.fillStyle = "black";
          
          // Position text above the image
          ctx.fillText(item.text, item.x, item.y - TEXT_OFFSET); 
        };
        image.src = item.image_path;
      });
  
    };
    
    useEffect(() => {
      if (selectedDeviceData && selectedDeviceData.canvus) {
        drawImagesOnCanvas(selectedDeviceData.canvus);
      }
    }, [selectedDeviceData]);

    return (
      <div className='client-bg'>
        <header className="client-header">
            <div className="container">
                <div className="client-title">
                <h1>Title</h1>
                </div>
            </div>
        </header>
        <section>
      <div className="container">
        <div className="wrapper device-list">
          <div className="row row-title">
            <div className="address">address</div>
              <button className="map-btn">map →</button>
          </div>
          <div className="btn-list">
          {deviceList.map((device, index) => (
            <button key={index} onClick={() => handleDeviceSelection(device.device_type, device.index)}>
              {device.device_name}
            </button>
          ))}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="wrapper">
          <div className="row">
              <div className="row-title">
                  <h2>Device Data</h2>
              </div>
          </div>
          <div className="btn-list">
            {selectedDeviceData && selectedDeviceData.device_item && selectedDeviceData.device_item.map((item, index) => (
            <button 
              key={index} 
              style={{ backgroundColor: item.color, color: '#ffffff'}}
            >
              {item.text}
            </button>
          ))}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row date">
            <div className="datepicker">
              <input type="date" />
            </div>
            
            <div className="btn-wrapper">
            {selectedDeviceData && selectedDeviceData.button && selectedDeviceData.button.map((item, index) => (
                <button key={index} 
                style={{ backgroundColor: item.color === 'ok' ? '#ffffff' : item.color,
                color: item.color === 'ok' ? 'inherit' : '#ffffff' }}>{item.text}</button>
            ))}
            </div>
           
        </div>
      </div>
      {selectedDeviceData && selectedDeviceData.canvus && selectedDeviceData.canvus.length > 0 && (
      <div className="container canvas-container">
        <div className="row">
          <canvas id="myCanvas" width="400" height="400" className="canvas-box"></canvas>
        </div>
      </div>
      )}
      {selectedDeviceData && selectedDeviceData.device_table && Object.keys(selectedDeviceData.device_table).length > 0 &&(
      <div className="container">
        <div className="row">
          <table className="device-table">
          <tbody>
              <tr>
                <th>設備</th>
                <th>數據</th>
              </tr>
              {Object.entries(selectedDeviceData.device_table).map(([key, value], index) => (
                <tr key={index}>
                    <td>{key}</td>
                    <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
       )}
    </section>
       </div>
      );      
  };
  
  export default ClientPage;


