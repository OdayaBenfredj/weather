import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Crop from './crop1'
export default function ProfilePopup() {
    const CustomButton = React.forwardRef(({ open, ...props }, ref) => (
        <button className="button" ref={ref} {...props}>
            Trigger - {props.open ? 'Opened' : 'Closed'}
        </button>
    ));

    return (
        <Popup trigger={<button> Trigger</button>} position="right center">
            <Crop />
            <Popup
                trigger={open => (
                    <button className="button">Trigger - {open ? 'Opened' : 'Closed'}</button>
                )}
                position="right center"
                closeOnDocumentClick
            >
                <span> Popup content </span>
            </Popup>
        </Popup>)
}
