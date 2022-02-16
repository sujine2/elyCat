import React from 'react';

function componentToHex(c) {
    //console.log('type',typeof(c))
    if(c!= undefined){
      var hex = parseInt(c,10).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }
  }
  
  

function RGBtoHex (props) {
    return (
        <div className="colorHex" style={{
            float: 'right',
            marginRight: 30
        }}>
            #{componentToHex(props.R)}{componentToHex(props.G)}{componentToHex(props.B)}
        </div>
    );
}
export default RGBtoHex;