import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

/**
 * Se crea el Modal Create para que al momento de que se cree el usuario
 * se active este componente con la confirmacion de la creacion del usuario
 * Se maqueta este componente con el paquete de react-bootstrap 
 */


 const MyModalCreate = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {props.body}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" type="submit" onClick={props.onSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModalCreate;