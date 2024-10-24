import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WineListScanner = () => {
    const navigate = useNavigate();
    const [stream, setStream] = useState(null);
    const [error, setError] = useState(null);
    const [wineList, setWineList] = useState('');
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [profileId, setProfileId] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const profileIdFromStorage = localStorage.getItem('ProfileID');
        if (!profileIdFromStorage) {
            // Redirect to login if no ProfileID is found
            navigate('/login', { state: { message: 'Please login first' } });
            return;
        }
        setProfileId(profileIdFromStorage);
        console.log("ProfileID from storage:", profileIdFromStorage);
    }, [navigate]);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                },
            });
            setStream(mediaStream);
            console.log('Media stream started:', mediaStream);
            setIsCameraActive(true);
            setError(null);
        } catch (err) {
            setError('Unable to access camera. Please check permissions.');
            console.error('Error accessing camera:', err);
        }
    };

    useEffect(() => {
        if (isCameraActive && videoRef.current && stream) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
                videoRef.current.play().catch((error) => {
                    console.error('Error playing video:', error);
                });
            };
        }
    }, [isCameraActive, stream]);

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
            setIsCameraActive(false);
        }
    };

    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
        stopCamera();
    };

    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [stream]);

    const submitImage = async () => {
      if (!capturedImage) return;
  
      try {
          // Convert base64 to blob
          const base64Response = await fetch(capturedImage);
          const blob = await base64Response.blob();
  
          // Create FormData and append the image
          const formData = new FormData();
          formData.append('wineListImage', blob, 'wine-list.jpg');
          formData.append('profileId', profileId);
  
          const response = await fetch('http://localhost:7071/api/processWineList', {
              method: 'POST',
              body: formData,
          });
  
          const result = await response.json();
          
          if (!response.ok) {
              throw new Error(result.error || 'Failed to process image');
          }
  
          console.log('Wine list text:', result.wineListText);
            // Navigate to recommendations page with the data
            navigate('/recommendations', { 
              state: { 
                  recommendations: result.wineListText
              }
          });
          setError(null);
      } catch (error) {
          console.error('Error submitting image:', error);
          setError(error.message || 'Failed to process the wine list image. Please try again.');
          setWineList('');
      }
  };

    // Rest of the component remains the same
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="flex-1 p-4">
                <h2 className="text-2xl font-semibold text-center mb-6">Scan Your Wine List</h2>
                <div className="relative mb-4">
                    {capturedImage ? (
                        <div className="relative aspect-[3/4] w-full bg-black rounded-lg overflow-hidden">
                            <img src={capturedImage} alt="Captured wine list" className="w-full h-full object-contain" />
                            <button
                                onClick={() => {
                                    setCapturedImage(null);
                                    startCamera();
                                }}
                                className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full shadow-lg"
                            >
                                Retake
                            </button>
                        </div>
                    ) : isCameraActive ? (
                        <div className="relative aspect-[3/4] w-full bg-black rounded-lg overflow-hidden">
                            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                            <canvas ref={canvasRef} className="hidden" />
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                                <button
                                    onClick={capturePhoto}
                                    className="bg-white text-black p-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-full border-4 border-black" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={startCamera}
                            className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex flex-col items-center justify-center"
                        >
                            <Camera className="w-12 h-12 mb-2 text-gray-400" />
                            <span className="text-sm text-gray-500">Tap to start camera</span>
                        </button>
                    )}
                </div>
                <div className="text-center">
                    <p className="text-gray-500 mb-4">or manually enter wine names</p>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm mb-4"
                        placeholder="Enter wine names..."
                        value={wineList}
                        onChange={(e) => setWineList(e.target.value)}
                    />
                    <button
                        className="w-full bg-wine-red text-white p-3 rounded-lg hover:bg-green-700 transition-colors"
                        onClick={() => {
                            if (capturedImage) {
                                submitImage();
                            }
                        }}
                    >
                        Submit Wine List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WineListScanner;