import { Modal,Button, Form } from "react-bootstrap";
import React, {useEffect} from 'react';
import './FormModal.css';
import {address, abi} from '../components/contract/contractInfo';
import { ethers } from "ethers";
import RGBtoHex from "./RGBtoHex";
import jquery from 'jquery';
import $ from 'jquery';
import axios from "axios";
//import { useWeb3React } from "@web3-react/core";


function componentToHex(c) {
  //console.log("componentToHex");
  //console.log(typeof(c));
  //console.log("pppppppp");
  if(c!= undefined){
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
}


function FormModal(props) {
  const [inputs, setInputs] = React.useState({
    catName: '',
    yourName: '',
    dayMet: '',
    favorite: '',
    comment: ''

  });

  const {catName, yourName, dayMet, favorite, comment} = inputs;
  const [colors, setColors] = React.useState([]);
  const [colorValue, setColorValue] = React.useState();

  useEffect(() => {
    const f = async () => {
      const result = await viewColor();

      if(result){
      console.log(result);
      setColors(result);
      const tempColorValue = "#"+ componentToHex(result.R) + componentToHex(result.G) + componentToHex(result.B);
      console.log('colorValue:',tempColorValue);
      setColorValue(tempColorValue);
      //$('.changeColor').val(tempColorValue);
      }
    }
    f();
    
  }, []);


  const onChange = (e) => {
    const {value, name} = e.target;
    setInputs({
      ...inputs,
      [name] : value
    });
  }

  const [colorDup, setColorDup] = React.useState(true);

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
    //console.log(colorOwner);
    if(colorOwner == 0x0) {
      //console.log('alsdj;flajf');
      setColorDup(true);
    }else {
      setColorDup(false);
    }
  }


  const viewColor = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(address, abi, provider);
    const color = await contract.getColor();
    return color;
  }

    
  setTimeout(function(){
    //console.log("I am the third log after 3 seconds");
    $('.changeColor').change(async function (){
      //console.log($('.printColor').val());
      setColorValue($('.changeColor').val());
      const rgbColor = await hexToRGB($('.changeColor').val());
      await findColor(rgbColor);
  
      //console.log('isColor',colorDup);
    })

  },500);

  useEffect(async ()=> {

    if(colorDup == false){
      $('.isColorDup').text('이미 사용된 컬러 입니다.',{colorDup});
      console.log('false check');
    }else {
      $('.isColorDup').text('');
      console.log('true check');
    }
  },[colorDup]);


  return (
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* {
        setTimeout(function(){
          $('.modal-content').css("box-shadow", "")
        },1000)
      } */}
      <Modal.Header closeButton>
        <div className="modalTitle">
            Your Cat Star's Infos
        </div>
        <div className="currentColor"> 
          Current Color  :
          {
           //$('.printColor').attr('value',colorValue)
           //console.log(colorValue)
          }
          <button className="printColor" style={{
              backgroundColor: 'rgba('+ colors.R +','+ colors.G +',' + colors.B + ')',
              border: 0,
              outline: 0
              }}></button> 
          <RGBtoHex className="hexColor" R={colors.R} G={colors.G} B={colors.B}></RGBtoHex>
          
          <div>
          <input type="checkbox" className="changeColorCheck" onClick={()=> controlColor()} /> 
          <label htmlFor="changeColorCheck" style={{
            fontSize: 15,
            marginLeft: 10,
            color: "gray"
          }}>컬러 바꾸기  1 Klay</label>
          </div>

          <div className="changeColorCon">
            <input className="changeColor" type="color" defaultValue={colorValue}></input>
            <span className="printColorValue" >{colorValue}</span>
            <span style={{
              marginLeft : 15, 
              color: "red",
              fontSize: 12
            }} className="isColorDup"></span>
          </div>
          
        </div>
        
      
      </Modal.Header>
      <Modal.Body>
          <div className="formModalBody">
            <h4>Cat's name</h4>
            <input className="inputData" name="catName" type="text" style={{width: 400}} onChange={onChange}   value={catName}    required />
            <br /><br />
            <h4>Your Name</h4>
            <input className="inputData" name="yourName" type="text" style={{width: 400}} onChange={onChange}   value={yourName}   required />
            <br /><br />
            <h4>The day I met a cat</h4>
            <input className="inputData" name="dayMet" type="number" placeholder="ex)20210510" style={{width: 400}} onChange={onChange}   value={dayMet}    required />
            <br /><br />
            <h4>What my cat likes</h4>
            <input className="inputData" name="favorite" type="text" style={{width: 400}} onChange={onChange}  value={favorite}   required />
            <br /><br />
            <h4>Comment</h4>
            <input className="inputData" name="comment" type="text" style={{width: 400}} onChange={onChange}  value={comment}   required />
            <br /><br />
            <h4>Image Link</h4>
            <input className="inputData" name="image" type="text" placeholder="google dirve **전체 공유 링크를** 넣어주세요!" style={{width: 400}} />
            <br /><br />
            {
              //console.log({catName},{yourName},{dayMet},{favorite},{comment})
            }
{/*             <img style={{
              width : 500,
              height : 500
            }} src={"https://drive.google.com/uc?export=view&id=11ie-eM87PwR54QDNVFoGYAqVDu-7MQPZ"}></img> */}
          </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={async()=> {
          if(colorDup == false && $('#ckBox').is(':checked')){
            alert('이미 사용된 컬러 입니다. 색상을 변경해 주세요.');
          }else {
            console.log(typeof(dayMet))
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(address, abi, provider);
            const signer = provider.getSigner(); 
            const contractWithSigner = contract.connect(signer);
            console.log(contractWithSigner.catData);
            const tx = await contractWithSigner.mint(catName,yourName,comment,favorite,parseInt(dayMet),0);
            console.log(tx);
            const receipt = await tx.wait();
            console.log(receipt);
            window.location.reload();
          }
        }}>Make a star</Button>
      </Modal.Footer>
    </Modal>
  );
}


function controlColor(){
  console.log($('.changeColorCheck').is(':checked'));
  if($('.changeColorCheck').is(':checked')){
    $('.changeColorCon').show();
  }else {
    $('.changeColorCon').hide();
  }
}


export default FormModal;
  

