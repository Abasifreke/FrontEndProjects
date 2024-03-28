import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRef } from 'react';
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetsContext';

export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
    const descriptionRef = useRef();
    const amountRef = useRef();
    const budgetIdRef = useRef();

    const { addExpense, budgets } = useBudgets();

    const handleSubmit = (e) => {
        e.preventDefault();
        addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetIdRef.current.value,
        });

        handleClose();
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-3' controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' required ref={descriptionRef} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='amount'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type='number' required min={0} step={0.01} ref={amountRef} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='budgetId'>
                        <Form.Label>Budget</Form.Label>
                        <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef} >
                            <option id={UNCATEGORIZED_BUDGET_ID} key={UNCATEGORIZED_BUDGET_ID} value={UNCATEGORIZED_BUDGET_ID}>{UNCATEGORIZED_BUDGET_ID}</option>
                            {budgets.map(budget => {
                                return <option key={budget.id} value={budget.id}>{budget.name}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button variant='primary' type='submit' >Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}