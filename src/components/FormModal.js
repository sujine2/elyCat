import { Modal,Button, Form } from "react-bootstrap";
import React, {useEffect} from 'react';
import './FormModal.css';
import {address, abi} from '../components/contract/contractInfo';
import { ethers } from "ethers";
import RGBtoHex from "./RGBtoHex";
import { blue } from "@material-ui/core/colors";
//import { useWeb3React } from "@web3-react/core";



function FormModal(props) {

  const viewColor = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(address, abi, provider);
    const color = await contract.getColor();
    return color;
  }


  const [inputs, setInputs] = React.useState({
    catName: '',
    yourName: '',
    dayMet: '',
    favorite: '',
    comment: ''

  });

  const {catName, yourName, dayMet, favorite, comment} = inputs;
  const [colors, setColors] = React.useState([]);

  useEffect(() => {
    const f = async () => {
      const result = await viewColor();
      //console.log(result);
      setColors(result);
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


  return (
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <div className="modalTitle">
            Your Cat Star's Infos
        </div>
        <div className="currentColor"> 
          Current Color  :
          {
            console.log(colors.R, colors.G, colors.B)
          }
          <button className="printColor" style={{
              backgroundColor: 'rgba('+ colors.R +','+ colors.G +',' + colors.B + ')',
              border: 0,
              outline: 0
              }}></button> 
              <RGBtoHex className="hexColor" R={colors.R} G={colors.G} B={colors.B}></RGBtoHex>
          </div>
        
      
      </Modal.Header>
      <Modal.Body>
          <div className="formModalBody">
            <h4>Cat's name</h4>
            <input name="catName" type="text" placeholder="Normal text" style={{width: 400}} onChange={onChange}   value={catName}/>
            <br /><br />
            <h4>Your Name</h4>
            <input name="yourName" type="text" placeholder="Normal text" style={{width: 400}} onChange={onChange}   value={yourName}/>
            <br /><br />
            <h4>The day I met a cat</h4>
            <input name="dayMet" type="number" placeholder="ex)20210510" style={{width: 400}} onChange={onChange}   value={dayMet}/>
            <br /><br />
            <h4>What my cat likes</h4>
            <input name="favorite" type="text" placeholder="Normal text" style={{width: 400}} onChange={onChange}  value={favorite}/>
            <br /><br />
            <h4>Comment</h4>
            <input name="comment" type="text" placeholder="Normal text" style={{width: 400}} onChange={onChange}  value={comment}/>
            <br /><br />
            {
              //console.log({catName},{yourName},{dayMet},{favorite},{comment})
            }


          </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={async()=> {
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
        }}>Make a star</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default FormModal;
  

