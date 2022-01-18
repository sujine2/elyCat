
import React from 'react';
import './Meteoro.css';

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function carregarMeteoro(){
    var style = ["style1", "style2", "style3", "style4"];
    var numeroAleatorio = 5000;
    numeroAleatorio = getRandomArbitrary(5000, 10000);
    setTimeout(function(){ 
        carregarMeteoro();
    }, numeroAleatorio);

    return (
        <div className="chuvaMeteoro">{
            Array().fill(0).map((_,index) => {
              return <div className={"meteoro "+ style[getRandomArbitrary(0, 4)]}></div>
            })
        }
        </div>
        
    );
}

setTimeout(function(){
    document.getElementsByClassName('chuvaMeteoro')[0].innerHTML = ""
}, 1000);


export default carregarMeteoro;