import React from 'react';
import './starView.css';
import ViewModal from '../components/Modal';
import LoadWallet from '../components/LoadWallet';
import Meteoro from '../components/Meteoro';
import plus from '../img/plus.png';
import FormModal from '../components/FormModal';
import Search from '../img/search.png';
import jquery from 'jquery';
import $ from 'jquery';
import { ethers } from 'ethers';




function setSearchBarShow() {
  if ($('.search-container').css('display') == 'block') {
    $('.search-container').css('display', 'none');
  } else {
    $('.search-container').css('display', 'block');
  }
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function StarView() {
  const [modalShow, setModalShow] = React.useState(false);
  const [formModalShow, setFormModalShow] = React.useState(false);
  var style = ["style1", "style2", "style3", "style4"];
  var tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
  var opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];
  var widthWindow = window.innerWidth;
  var heightWindow = window.innerHeight;



  return (
    <div className="view-planet">
      <div className="view-constelacao">{
        Array(600).fill(0).map((_,index) => {
          return <span className={"view-estrela "+ style[getRandomArbitrary(0, 4)]+ " " 
            + opacity[getRandomArbitrary(0, 6)] + " " + tam[getRandomArbitrary(0, 5)] + " "} 
            style onClick={() => setModalShow(true)} 
            style={{
              animationDelay: getRandomArbitrary(0, 9) + "s",
              left: getRandomArbitrary(0, widthWindow),
              top: getRandomArbitrary(0, heightWindow),
              opacity : [getRandomArbitrary(0, 6)]
          }}></span>
        })
      }
      
      {
        Array(400).fill(0).map((_,index) => {
          return <span className={"view-estrela "+ style[getRandomArbitrary(0, 4)]+ " " 
            + opacity[getRandomArbitrary(0, 6)] + " " + tam[getRandomArbitrary(0, 5)] + " "} 
            style onClick={() => setModalShow(true)} 
            style={{
              animationDelay: getRandomArbitrary(0, 9) + "s",
              left: getRandomArbitrary(0, widthWindow),
              top: getRandomArbitrary(350, 450),
              opacity : [getRandomArbitrary(0, 6)]
          }}></span>
        })
      }
      {
        Array(200).fill(0).map((_,index) => {
          return <span className={"view-estrela "+ style[getRandomArbitrary(0, 4)]+ " " 
            + opacity[getRandomArbitrary(0, 6)] + " " + tam[getRandomArbitrary(0, 5)] + " "} 
            style onClick={() => setModalShow(true)} 
            style={{
              animationDelay: getRandomArbitrary(0, 9) + "s",
              left: getRandomArbitrary(0, widthWindow),
              top: getRandomArbitrary(200, 300),
              opacity : [getRandomArbitrary(0, 6)]
          }}></span>
        })
      }
      {
        Array(200).fill(0).map((_,index) => {
          return <span className={"view-estrela "+ style[getRandomArbitrary(0, 4)]+ " " 
            + opacity[getRandomArbitrary(0, 6)] + " " + tam[getRandomArbitrary(0, 5)] + " "} 
            style onClick={() => setModalShow(true)} 
            style={{
              animationDelay: getRandomArbitrary(0, 9) + "s",
              left: getRandomArbitrary(0, widthWindow),
              top: getRandomArbitrary(300, 400),
              opacity : [getRandomArbitrary(0, 6)]
          }}></span>
        })
      }
      </div>
      <ViewModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Meteoro></Meteoro>




      <div className="floresta">
        <img src="https://raw.githubusercontent.com/interaminense/starry-sky/master/src/img/bgTree.png" alt="" />
      </div>

      <div className='form'>
        <img  src={plus} id='plusbtn' onClick={async() => { 
          if(window.ethereum){
            try{
              await window.ethereum.request({ method: 'eth_requestAccounts' });
            }catch (error) {
              console.log(error);
            }
          } else if (window.web3) {
            console.log('check');
            const provider = new ethers.providers.Web3Provider(window.ethereum);
        
          }else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
          }
          setFormModalShow(true)}} />
        <FormModal
        show={formModalShow}
        onHide={() => setFormModalShow(false)}/>
        
       {/*<input className='search-bar-btn' type='checkbox'></input>
        <label htmlFor='search-bar-btn'></label>*/}
          <img className='search' onClick={() => setSearchBarShow()} src={Search}/>
          
      </div>

      <form className="search-container">
        <input type="text" className="search-bar" placeholder="What is your color?"/>
        <a href="#"><img className="search-icon" src={Search}/></a>
      </form>
    </div>
  );
}
export default StarView;


