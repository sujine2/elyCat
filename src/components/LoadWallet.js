import React from 'react';
import { ethers } from 'ethers';
import {Button} from "@material-ui/core";



export const ConnetWallet = (props) => {
    const btn = document.getElementById('plusbtn');
    console.log('btnbtn');
    btn.loadWallet('click', async() => { 
        if(window.ethereum){
          try{
            await window.ethereum.enable();
          }catch (error) {
            console.log(error);
          }
        } else if (window.web3) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
      
        }else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    });

}

export default ConnetWallet;



