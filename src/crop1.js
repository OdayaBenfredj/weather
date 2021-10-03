import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Cropper from 'react-easy-crop'
import getCroppedImg from './cropImg'
import './weather.css'


export default function Crop() {
    const image1 = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sunset-at-Sea.jpg/250px-Sunset-at-Sea.jpg"
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [imageSrc, setImageSrc] = useState(image1)
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(image1)
    const onCropComplete1 = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    function readFile(file) {
        return new Promise(resolve => {
            const reader = new FileReader()
            reader.addEventListener('load', () => resolve(reader.result), false)
            reader.readAsDataURL(file)
        })
    }
    const onFileChange = async e => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            let imageDataUrl = await readFile(file)
            setCrop({ x: 0, y: 0 })
            setZoom(1)
            setRotation(0)
            setImageSrc(imageDataUrl)
        }
    }

    const showCroppedImage = async () => {
        console.log(croppedAreaPixels);
        console.log(croppedAreaPixels);
        // console.log(croppedArea);
        const croppedImage1 = await getCroppedImg(
            imageSrc,
            croppedAreaPixels,
            rotation
        )
        // console.log("croppedImage1", croppedImage1)
        setCroppedImage(croppedImage1)
    }

    return (
        <div className="App" >
            <div className="crop-container">
                <img src={croppedImage} style={{ borderRadius: "50%", width: "20vh", height: "20vh" }} />
                <Cropper
                    // minZoom={minZoom}
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    // cropSize={{ width: 500, height: 500 }}
                    cropShape="round"
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete1}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                />
            </div>

            <div className="controls">
                <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e, zoom) => setZoom(zoom)}
                />
                <Slider
                    value={rotation}
                    min={0}
                    max={360}
                    step={1}
                    onChange={(e, rotation) => setRotation(rotation)} />
                <Button
                    onClick={showCroppedImage}
                    variant="contained"
                    color="primary"
                >
                    Show Img
          </Button>

                <input type="file" onChange={onFileChange} accept="image/*" />

            </div>
        </div>
    )

}

