import { Modal,Button } from "react-bootstrap";
import {address, abi} from '../components/contract/contractInfo';
import React, {useEffect} from 'react';
import { ethers } from "ethers";
import './Modal.css';

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

  useEffect(() => {
    const f = async () => {
      if (props.tokenid !== '') {
        const result = await viewCatData();
        console.log('check',result);
        setCatData(result);
      }
    }
    f();
  }, [props.tokenid]);

  return (
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
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
          #{props.tokenid} Cat Stars Info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='catInfo'>
          <h4>Star's Name : {catData.catName}</h4>
          <h4>Star's Owner : {catData.yourName}</h4>
          <h4>The day we met : {catData.metDay}</h4>
          <h4>Favorite Things : {catData.favorite}</h4>
          <h4>Comment : {catData.comment}</h4>
          <span className="starFive"></span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ViewModal;
  

