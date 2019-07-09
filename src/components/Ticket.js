import React from 'react';
import QRCode from 'qrcode.react';

const Ticket = (props) => (
    <div className="Ticket">
       <QRCode 
        value={props.id}
        level="H"
       />
    </div>
)

export default Ticket;
