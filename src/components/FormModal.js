import { Modal,Button, Form } from "react-bootstrap";
import React from 'react';
import './FormModal.css';
import {address, abi} from '../components/contract/contractInfo';
import { Contract, ethers } from "ethers";
//import { useWeb3React } from "@web3-react/core";


const provider = new ethers.providers.Web3Provider(window.ethereum)
console.log(provider);
const contract = new ethers.Contract(address, abi, provider);
const signer = provider.getSigner(); 
const contractWithSigner = contract.connect(signer);
/* contractWithSigner.estimateGas.getColor().then((result) => {
  console.log(result);
  console.log(ethers.BigNumber.from(result))
}).catch((e) => {
  console.log(e);
}) 
 */


//console.log(color);
console.log(contract);
console.log(signer);
console.log(window.ethereum);

const viewColor = async ()=> {
  try {
    console.log(await contract.getOwner());
    const color = (await contract.getOwner());
    //awiat 
    console.log(color);
    
  } catch (error) {
    console.log(error)
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


  const onChange = (e) => {
    const {value, name} = e.target;
    setInputs({
      ...inputs,
      [name] : value
    });
  };

  return (
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Your Cat Star's Infos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div className="formModalBody">
            {
              viewColor()
            }
              
            <h4>Cat's name</h4>
            <input name="catName" type="text" placeholder="Normal text" style={{width: 400, position: "relative"}} onChange={onChange}   value={catName}/>
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
              console.log({catName},{yourName},{dayMet},{favorite},{comment})
            }
          </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={async () => {
          console.log(dayMet,comment);
          console.log(typeof({dayMet}),typeof({comment}));
          let test = new Number({dayMet});
          console.log({test});
          
          //let tx = await contractWithSigner.mint(catName,yourName,comment,favorite,dayMet,0);
          //console.log(tx);
        }}>Make a star</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default FormModal;
  

