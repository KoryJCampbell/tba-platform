import React from 'react';
import QRCode from 'qrcode.react';

const Ticket = (props) => {
    console.log(props)
    return (
        <div className="Ticket">
        <QRCode 
            value={props.match.params.id}
            level="H"
        />
        </div>
    )
}

export default Ticket;
