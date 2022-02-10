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

function componentToHex(c) {
  //console.log("componentToHex");
  //console.log(typeof(c));
  //console.log("pppppppp");
  if(c!= undefined){
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}






function StarView() {
  const [modalShow, setModalShow] = React.useState({ setShow: false,id: ''});
  const {setShow,id} = modalShow;
  const [account, setAccount] = React.useState('');
  const [formModalShow, setFormModalShow] = React.useState(false);
  const [viewStar, setViewStar] = React.useState(false);
  const [tokenID, setTokenID] = React.useState(-1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [test, setTest] = React.useState([
    {
      styleClass : "",
      inlineStyle :{ 
        animationDelay: "0s",
            left: 0,
            top: 0,
            opacity : 0,
      }
    }

  ]);

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

  const viewMyStar = async (_owner) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(address, abi, provider);
    const myStarList = await contract.myStarOf(_owner);
    console.log(myStarList);

    if(viewStar == false){
      setViewStar(true)
      for(var i in myStarList){
        console.log('list',myStarList)
        //console.log('i : ',list[i]);
        var data = await contract.catDataOf(i);

        $('#'+myStarList[i]).css('width', '20px');
        $('#'+myStarList[i]).css('height', '20px');
        $('#'+myStarList[i]).css('background-color',"#"+ componentToHex(data.catColor.R ) + componentToHex(data.catColor.G) + componentToHex(data.catColor.B));
        $('.myStar').css('opacity','100%');
        $('.myStar').css('text-shadow','0px 0px 8px white');
      } 
    }else if(viewStar == true) {
      setViewStar(false);
      for(var i in myStarList){
        console.log('list',myStarList)
        //console.log('i : ',list[i]);
        $('#'+myStarList[i]).css('width', '3px');
        $('#'+myStarList[i]).css('height', '3px');
        $('#'+myStarList[i]).css('background-color','white');
        $('.myStar').css('opacity','60%');
        $('.myStar').css('text-shadow','');
      } 
    }
    
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
    else {
      var catList = [];
    //var dataList = [];
      for (var i = 0; i < tokenID; i++){
        var data = await contract.catDataOf(i);
        console.log(i, data);

        if (data!=='' && (data.catColor.R === _findColor.R) && (data.catColor.G === _findColor.G) && (data.catColor.B === _findColor.B)){
          //console.log(_findColor, data.catColor);
          catList.push(i);
        }
        data ='';
      }
      console.log('list',catList);
      return catList;
    }
    
  }

  const search = async() => {
    var searchInputs = $('.search-bar').val();
    console.log(searchInputs);
    const hexTorgb = hexToRGB(searchInputs);
    console.log(hexTorgb);
    //console.log(hexTorgb.R);
    if(hexTorgb != null){
      var list = await findColor(hexTorgb);
      for(var i in list){
        console.log('list',list)
        //console.log('i : ',list[i]);
        $('#'+list[i]).css('width', '20px');
        $('#'+list[i]).css('height', '20px');
        $('#'+list[i]).css('@keyframes view-estrela', `0% {
          box-shadow: 0 0 15px 0px rgba('`+ hexTorgb.R +','+ hexTorgb.G +',' + hexTorgb.B + ');'+
        `}
        20% {
          box-shadow: 0 0 40px 9px rgba('`+ hexTorgb.R +','+ hexTorgb.G +',' + hexTorgb.B + ');'+
        `}
        50% {
          box-shadow: 0 0 15px 0px rgba('`+ hexTorgb.R +','+ hexTorgb.G +',' + hexTorgb.B + ');'+
        `}
        70% {
          box-shadow: 0 0 50px 10px rgba('`+ hexTorgb.R +','+ hexTorgb.G +',' + hexTorgb.B + ');'+
        `}
        90% {
          box-shadow: 0 0 15px 0px rgba('`+ hexTorgb.R +','+ hexTorgb.G +',' + hexTorgb.B + ');'+
        `}
        100% {
          box-shadow: 0 0 20px 2px rgba('`+ hexTorgb.R +','+ hexTorgb.G +',' + hexTorgb.B + ');' +
        `}`); 
        //$('#'+i).css('background-color', $('.search-bar').val());
        //$('#'+i).css('box-shadow:', '0px 0px 30px 3px rgba('+ hexTorgb.R +','+ hexTorgb.G +',' + hexTorgb.B + ')');
      }
    }
    
  }


  const fff = () => {
    setTest(Array(tokenID).fill(0).map(() => {
      //console.log("진입");
      //console.log("진입 이후",tokenID)
      return {
        styleClass : "view-estrela "+ style[getRandomArbitrary(0, 4)] + " "
        + opacity[getRandomArbitrary(0, 6)] + " " + tam[getRandomArbitrary(2, 5)] + " ",
        
        inlineStyle :{ animationDelay: getRandomArbitrary(0, 9) + "s",
              left: getRandomArbitrary(0, widthWindow),
              top: getRandomArbitrary(0, heightWindow),
              opacity : [getRandomArbitrary(0, 6)],}
      }
    }))
  }


  const ff =async () => {
    owner = await window.ethereum.request({ method: 'eth_requestAccounts' });
    owner = owner[Object.keys(owner)[0]];
    setAccount(owner);
    // const color = await viewMyColor(owner);
    //setMyColor(color);
    //console.log('000',color)
  }

  const f =async () => {
    const ID = await getTokenNum();
    console.log('view Token! : ', ID);
    setTokenID(ID);
  }


  useEffect(() => {
    f();
    if(tokenID != -1){
      fff();
      setIsLoading(true);
    }  
  }, [tokenID]);


  useEffect(() => {
    ff();
  }, [owner]);
  

  return (
    <>
      { 
        !isLoading ? (
          <div />
        ) : (
          <div className="view-planet">
          <div className="view-constelacao">
            
     
            {
              Array(tokenID).fill(0).map((_,index) => {
                //console.log('-------',test, tokenID);
                return <span id={index} 
                className={test[index].styleClass} 
                onClick={(e) => {
                  e.preventDefault();
                    setModalShow({
                      setShow: true,
                      id: index
                    });
                }} 
                style={test[index].inlineStyle}></span>
              })
          }
          
    {/*
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
        */}
          </div>
          <ViewModal
                show={setShow}
                onHide={() => setModalShow({
                    setShow: false,
                    id:''
                  })}
                  tokenid={id}
                />
          {/* <Meteoro></Meteoro> */}
    
    
    
    
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
            
       
            <img className='search' onClick={(e) => {  
              e.preventDefault();
              setSearchBarShow()}
              } src={Search}/>
              
          </div>
    
          <div className="myStarCon"> 
            {
              console.log(account),
              (account !== '') && (
                <>
                 <div className='myStar' onClick={()=> viewMyStar(account)}> 
                   View My Star
                 </div>
                </>
              )
            }
          </div>
    
          <form className="search-container">
            <input type="text" className="search-bar" placeholder="What is your color?"  />
            <a onClick={search}><img className="search-icon" src={Search}/></a>
          </form>
        </div>
        )
      }
    </>
   
  );
}
export default StarView;


