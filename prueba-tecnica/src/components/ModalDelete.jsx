import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


/**
 * Se crea el Modal Create para que al momento de que se quiera eliminar un
 * usuario se active este componente para que el usuario de la confirmacion de la eliminación
 * y posteriormente eliminar el usuario de la base de datos
 * Se maqueta este componente con el paquete de react-bootstrap 
 */

 const MyModalDelete = (props) => {
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
        <Button variant="danger" onClick={props.onHide}>Cancelar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModalDelete;