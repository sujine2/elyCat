import { Modal,Button, Form } from "react-bootstrap";
import './FormModal.css';

function FormModal(props) {
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
                <Form>
                    <h4>Cat's name</h4>
                    <Form.Control type="text" placeholder="Normal text" style={{width: 500}}/>
                    <br />
                    <h4>Your Name</h4>
                    <Form.Control type="text" placeholder="Normal text" style={{width: 500}}/>
                    <br />
                    <h4>The day I met a cat</h4>
                    <Form.Control type="text" placeholder="Normal text" style={{width: 500}}/>
                    <br />
                    <h4>What my cat likes</h4>
                    <Form.Control type="text" placeholder="Normal text" style={{width: 500}}/>
                    <br />
                    <h4>The day I met a cat</h4>
                    <Form.Control type="text" placeholder="Normal text" style={{width: 500}}/>
                    <br />
                    <h4>Comment</h4>
                    <Form.Control type="text" placeholder="Normal text" style={{width: 500}}/>
                    <br />
                </Form>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}
export default FormModal;
  

