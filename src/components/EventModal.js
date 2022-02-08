import { Modal,Button, Form } from "react-bootstrap";
import React, {useEffect} from 'react';
import './EventModal.css';
import testImg from '../img/cat2.jpg'
import jquery from 'jquery';
import $ from 'jquery';
//import { useWeb3React } from "@web3-react/core";



  

function EventModal(props) {

  return (
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <div className="eventModalTitle">
            우리 고양이 구경하세욤♥︎
        </div>
      
      </Modal.Header>
      <Modal.Body>
          <div className="formModalBody">
            <div className="imgText">
              이름은 코코에요 ㅋㅋ 올해 10 살 이고 10살 기념 축하 댓글 달아주시면 감사하겠습니당
            </div>
            <div className="eventImgCon">
              <img className="testImg" src={testImg} ></img>
            </div>
          </div>
      </Modal.Body>
      <Modal.Footer>
      <div className="wrap1">
        <div className="button-wrap">
          <button className="heart-button" onClick={() => like()}>
            <svg mlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" className="heart">
              <path className="heart" d="M471.4,72.6C444.9,43.8,408.5,28,369,28c-29.6,0-56.6,9.3-80.4,27.8c-12,9.3-22.9,20.7-32.5,34c-9.6-13.3-20.5-24.7-32.5-34
                                    C199.6,37.3,172.6,28,143,28c-39.5,0-75.9,15.8-102.4,44.6C14.4,101,0,139.8,0,181.9c0,43.3,16.1,82.9,50.8,124.7
                                    c31,37.4,75.5,75.4,127.1,119.3c17.6,15,37.6,32,58.3,50.2c5.5,4.8,12.5,7.4,19.8,7.4c7.3,0,14.3-2.6,19.8-7.4
                                    c20.7-18.1,40.7-35.2,58.3-50.2c51.6-43.9,96.1-81.9,127.1-119.3c34.6-41.8,50.8-81.4,50.8-124.7C512,139.8,497.6,101,471.4,72.6
                                    L471.4,72.6z"/>
            </svg>
          </button>
          <div className="number">0</div>
        </div>
      </div>

      <div className="wrap2">
        <div className="comment-wrap">
          <button className="comment-button" onClick={() => comment()}>
            <svg mlns="http://www.w3.org/2000/svg" viewBox="-9.5 -5 14 10" className="comment">
              <path className="comment" d="M -9 0 V -5 C 4 -5 6 -5 6 -5 C 6 0 6 2 6 4 C 6 4 3 4 -2 4 C -2 4 -2 4 -6 7 L -6 7 Q -6 7 -6 4 C -6 4 -6 4 -9 4 V 0"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="commentInfo">
        <div className="commentList">

        </div>
        <div className="commentSubmitCon">
          <form className="commentSubmit">
            <input className="commentInput"/>
          </form>
        </div>
        <div className="commentSubmit-wrap">
          <button type="button" className="commentSubmit-button">
            <svg mlns="http://www.w3.org/2000/svg" viewBox="-13.5 -2 20 10" className="submit">
              <path className="submit" d="M -9 3 L 0 -1 L -1 6 L -4 5 L -4 5 L -6 7 L -6 7 Q -6 7 -6 4 C -6 4 -6 4 -9 3 L -9 3 L -9 3"/>
            </svg>
          </button>
        </div>
      </div>
      </Modal.Footer>
    </Modal>
  );
}


function like(){
  var $count = $('.nubmer').html();
  console.log($count);
  $('.heart-button').addClass('active');
  //console.log($('.heart-button').hasClass('active'));
  if ($('.heart-button').hasClass('active')) {
    if (!$('.heart-button').hasClass('fallow')) {
      $('.heart-button').addClass('fallow');
      $count++;
    } else {
      $('.heart-button').removeClass('fallow');
      $count--;
    }
    setTimeout(function(){
      $('.number').innerHTML = $count;
    }, 200)
  }
}

function comment(){
  $('.comment-button').addClass('active');
  //console.log($('.heart-button').hasClass('active'));
  if ($('.comment-button').hasClass('active')) {
    if (!$('.comment-button').hasClass('fallow')) {
      $('.comment-button').addClass('fallow');
      $('.commentInfo').show();
    } else {
      $('.comment-button').removeClass('fallow');
      $('.commentInfo').hide();
    }
  }
}

export default EventModal;
  

