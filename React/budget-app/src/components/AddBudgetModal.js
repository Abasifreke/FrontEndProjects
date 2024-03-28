import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRef } from 'react';
import { useBudgets } from '../contexts/BudgetsContext';

export default function AddBudgetModal({ show, handleClose }) {
    const nameRef = useRef();
    const maxRef = useRef();
    const { addBudget } = useBudgets();

    const handleSubmit = (e) => {
        e.preventDefault();

        addBudget({
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value)
        });

        handleClose();
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-3' controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' required ref={nameRef} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='max'>
                        <Form.Label>Maximum Spending</Form.Label>
                        <Form.Control type='number' required min={0} step={0.01} ref={maxRef} />
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button variant='primary' type='submit' >Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}