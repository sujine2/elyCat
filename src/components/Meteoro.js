
import React from 'react';
import './Meteoro.css';

var numeroAleatorio = 5000;

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

setTimeout(function(){ 
    carregarMeteoro();
}, numeroAleatorio);

function carregarMeteoro(){
    var style = ["style1", "style2", "style3", "style4"];
    setTimeout(carregarMeteoro, numeroAleatorio);
    numeroAleatorio = getRandomArbitrary(5000, 10000);

    return (
        <div className="chuvaMeteoro">{
            Array().fill(0).map((_,index) => {
              return <div className={"meteoro "+ style[getRandomArbitrary(0, 4)]}></div>
            })
        }
        {
        setTimeout(function(){
            document.getElementsByClassName('chuvaMeteoro').innerHTML = "";
            }, 1000)
        }
        </div>
        
        
    );
}



export default carregarMeteoro;