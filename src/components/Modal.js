import { Modal,Button } from "react-bootstrap";
import {address, abi} from '../components/contract/contractInfo';
import React, {useEffect} from 'react';
import { ethers } from "ethers";
import './Modal.css';
import jquery from 'jquery';
import $ from 'jquery';
import styled from 'styled-components';

const ModalCustom = styled(Modal)`
   
.modal-content{
  box-shadow: 0px 0px 30px ${(props) => props.color && props.color};
}
`;




function componentToHex(c) {
  //console.log("componentToHex");
  //console.log(typeof(c));
  //console.log("pppppppp");
  if(c!= undefined){
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
}


function ViewModal(props) {
  var url


 
  const viewCatData = async () => {
    const id = props.tokenid;
    console.log('id:',id);
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(address, abi, provider);
    const data = await contract.catDataOf(id);
    return data;
  }

  const [catData, setCatData] = React.useState([]);
  const [colorEffect, setColorEffect] = React.useState();


  useEffect(async () => {
      if (props.tokenid !== '') {
        const result = await viewCatData();
        console.log('check',result);
        setCatData(result);
      }
  
  }, [props.tokenid]); 
 

  useEffect(async ()=> {
    //console.log(catData);
    //console.log('R :', catData.catColor.R);
    const tempColorValue = "#"+ componentToHex(catData.catColor.R) + componentToHex(catData.catColor.G) + componentToHex(catData.catColor.B);
    //console.log('colorEffect:',tempColorValue);
    setColorEffect(tempColorValue);
    
  },[catData])

  return (
      <ModalCustom
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      color={colorEffect}
    >
      {
        console.log(props.tokenid)
      }

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{
          fontSize: 33
        }}>
      
            <div className='infoTitle'style={{ float: "left"}}>
            {props.tokenid} 번째 {catData.catName} 별
            </div>
            
            <div style={{ marginLeft: 600, loat: "left"}}>
            {colorEffect}
            </div>
          
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='catInfo'>
          <br/>
          <h4> 별 소유자 : {catData.yourName}</h4>
          <br/>
          <h4> 만난 날 : {catData.metDay}</h4>
          <br/>
          <h4> 좋아하는 것 : {catData.favorite}</h4>
          <br/><br/>
          <div className="dataComment" >
            {catData.comment}
          </div>
          <br/>
        </div>
        <div className="dataImg">
          {
          url = catData.imgURL,
          console.log('url',url),
          url && (
          url = url.split('/'),
          url = url[5],
          console.log(url))
          }
          <img style={{
            width : 500,
            height : 500
          }} src={"https://drive.google.com/uc?export=view&id=" + url}></img> 
        </div>

      </Modal.Body>
      {/* {
        setTimeout(function(){
        $('.btn-close').on('click',function(){
          $('.modal-content').css("box-shadow", "");
          setColorEffect("");;
        })
      },1000)
      } */}

      {/* {
        //console.log(typeof(colorEffect))
        //console.log('Effect value check',colorEffect)
        setTimeout(function(){
          console.log('colorEffect:',colorEffect);
          $('.modal-content').css("box-shadow", "0px 0px 30px " + colorEffect)
        },1000)
        //$('.modal-content ').css("box-shadow", "0px 0px 30px " + colorEffect)
      } */}
    </ModalCustom>
  );
}



export default ViewModal;
  

