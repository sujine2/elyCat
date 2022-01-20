import React, {useEffect} from 'react';
import './starView.css';
import ViewModal from '../components/Modal';
import LoadWallet from '../components/LoadWallet';
import Meteoro from '../components/Meteoro';
import plus from '../img/plus.png';
import FormModal from '../components/FormModal';
import Search from '../img/search.png';
import RGBtoHex from "../components/RGBtoHex";
import jquery from 'jquery';
import $ from 'jquery';
import { ethers } from 'ethers';
import {address, abi} from '../components/contract/contractInfo';
import { hexToRgb } from '@material-ui/core';



function setSearchBarShow() {
  if ($('.search-container').css('display') == 'block') {
    $('.search-container').css('display', 'none');
    window.location.reload();
  } else {
    $('.search-container').css('display', 'block');
  }
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function StarView() {
  const [modalShow, setModalShow] = React.useState({
    setShow: false,
    id: ''
  });
  const {setShow,id} = modalShow;
  const [account, setAccount] = React.useState(['']);
  const [myColor, setMyColor] = React.useState(['']);
  const [formModalShow, setFormModalShow] = React.useState(false);
  const [tokenID, setTokenID] = React.useState([]);

  var style = ["style1", "style2", "style3", "style4"];
  var tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
  var opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];
  var widthWindow = window.innerWidth;
  var heightWindow = window.innerHeight;
  var owner



  const getTokenNum = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(address, abi, provider);
    const TokenID = (await contract.getTokenID()).toNumber();
    //console.log(typeof(await window.ethereum.request({ method: 'eth_requestAccounts' })))
    return TokenID;
  }

  const viewMyColor = async (_owner) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(address, abi, provider);
    const myColor = await contract.myColorOf(_owner);
    return myColor;
  }
  const hexToRGB = (_findColor) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_findColor);
    return result ? {
      R: parseInt(result[1], 16),
      G: parseInt(result[2], 16),
      B: parseInt(result[3], 16)
    } : null
  }

  const findColor = async (_findColor) => {
    const abiCoder = ethers.utils.defaultAbiCoder;
    const colorIndex = ethers.utils.keccak256(abiCoder.encode(["uint","uint","uint"], [_findColor.R, _findColor.G, _findColor.B]));
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(address, abi, provider);
    const colorOwner = await contract.whoColorOf(colorIndex);
    console.log(colorOwner);
    if(colorOwner == 0x0) {
      alert("It's not exist color code");
    }
    var catList = [];
    for (var i = 0; i < tokenID; i++){
      var data = await contract.catDataOf(i);
      if (data.owner == colorOwner){
        catList.push(i);
      }
    }
    console.log(catList);
    return catList;
  }

  const search = async() => {
    var searchInputs = $('.search-bar').val();
    console.log(searchInputs);
    const hexTorgb = hexToRGB(searchInputs);
    console.log(hexTorgb);
    console.log(hexTorgb.R);
    if(hexTorgb != null){
      var list = await findColor(hexTorgb);
      for(var i in list){
        console.log(i);
        $('#'+i).css('width', '20px');
        $('#'+i).css('height', '20px');
        $('#'+i).css('background-color', $('.search-bar').val());
        $('#'+i).css('box-shadow:', '0px 0px 30px 3px rgba('+ hexTorgb.R +','+ hexTorgb.G +',' + hexTorgb.B + ')');
      }
    }
    
  }

  useEffect(() => {
    const f = async () => {
      const ID = await getTokenNum();
      console.log('view Token! : ', ID);
      setTokenID(ID);
    }
    f();
  }, []);

  useEffect(() => {
    const ff =async () => {
      owner = await window.ethereum.request({ method: 'eth_requestAccounts' });
      owner = owner[Object.keys(owner)[0]];
      const color = await viewMyColor(owner);
      setMyColor(color);
      console.log('000',color)
    }
    ff();
  }, [owner])
  

  return (
    <div className="view-planet">
      <div className="view-constelacao">
 
        {

          Array(350).fill(0).map((_,index) => {
            return <span id={index} className={"view-estrela "+ style[getRandomArbitrary(0, 4)]+ " " 
              + opacity[getRandomArbitrary(0, 6)] + " " + tam[getRandomArbitrary(2, 5)] + " "} 
              style onClick={() => {
                setModalShow({
                  setShow: true,
                  id: index
                });
              }} 
              style={{
                animationDelay: getRandomArbitrary(0, 9) + "s",
                left: getRandomArbitrary(0, widthWindow),
                top: getRandomArbitrary(0, heightWindow),
                opacity : [getRandomArbitrary(0, 6)]
            }}></span>
          })
      
      }
      
      {
        Array(350).fill(0).map((_,index) => {
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
        Array(150).fill(0).map((_,index) => {
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
        Array(150).fill(0).map((_,index) => {
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
      <ViewModal
              show={setShow}
              onHide={() => setModalShow({
                setShow: false,
                id:''
              })}
              tokenid={id}
            />
      </div>
      <Meteoro></Meteoro>




      <div className="floresta">
        <img src="https://raw.githubusercontent.com/interaminense/starry-sky/master/src/img/bgTree.png" alt="" />
      </div>

      <div className='form'>
        <img  src={plus} id='plusbtn' onClick={async() => { 
          if(window.ethereum){
            try{
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              setAccount(accounts);
              console.log(accounts);
              window.ethereum.on('accountsChanged', function (accounts) {
                // Time to reload your interface with accounts[0]!
              })
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
        
   
        <img className='search' onClick={() => setSearchBarShow()} src={Search}/>
          
      </div>

      <div className="myColor"> 
        {
          console.log('checkMyColor', myColor.R)
        }
        {
          (myColor.R !== undefined) && (myColor.R !=0) && (myColor.G != 0) && (myColor.B !=0 ) && (
            <>
             <div className='myColor'> 
               My Color
             </div>
              <button className="printMyColor" style={{
              backgroundColor: 'rgba('+ myColor.R +','+ myColor.G +',' + myColor.B + ')',
              border: 0,
              outline: 0
              }}></button>
              <RGBtoHex className="hexMyColor" R={myColor.R} G={myColor.G} B={myColor.B}></RGBtoHex>
            </>
          )
        }
      </div>

      <form className="search-container">
        <input type="text" className="search-bar" placeholder="What is your color?"  />
        <a onClick={search}><img className="search-icon" src={Search}/></a>
      </form>
    </div>
  );
}
export default StarView;


