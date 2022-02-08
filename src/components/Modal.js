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
      {
        console.log(catData)
      }
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{
          fontSize: 33
        }}>
      
            <div style={{ float: "left"}}>
            #{props.tokenid} Cat Stars 
            </div>
            
            <div style={{ marginLeft: 600, loat: "left"}}>
            {colorEffect}
            </div>
          
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='catInfo'>
          <h4>Star's Name : {catData.catName}</h4>
          <br/>
          <h4>Star's Owner : {catData.yourName}</h4>
          <br/>
          <h4>The day we met : {catData.metDay}</h4>
          <br/>
          <h4>Favorite Things : {catData.favorite}</h4>
          <br/>
          <h4>Comment : {catData.comment}</h4>
          <br/>

      <div className="dataImg">
        
      </div>

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
  

