import React, { useState } from 'react'
import { Col, Button, Card, Form, Container, Modal } from 'react-bootstrap'
import { gql, useMutation, useQuery } from '@apollo/client'

const CreateTaskMutation = gql`
    mutation CreateTask($id: String, $title: String!, $description: String!, $status: String!, $userId: String) {
        createTask(id: $id, title: $title, description: $description, status: $status, userId: $userId) {
            id
            title
            description
            status
        }
    }
`

const AddTaskModal = ({
    showModal,
    handleClose,
    boardCategory
}: {
    boardCategory: String;
    showModal: boolean;
    handleClose: () => void;
}) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [assignTo, setAssignTo] = useState('')

    const [createTask, { data, loading, error }] = useMutation(CreateTaskMutation, {
        onCompleted: (data) => {
            setTaskTitle('')
            setTaskDescription('')
            setAssignTo('')
        }
    })

    const handleTaskCreate = (e) => {
        e.preventDefault();
        console.log('submit')
        createTask({
            variables: {
                title: taskTitle,
                description: taskDescription,
                status: boardCategory,
            }
        })
        handleClose()
    }

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleTaskCreate}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={taskTitle} onChange={(e) => {setTaskTitle(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={taskDescription} onChange={(e) => {setTaskDescription(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Assign To</Form.Label>
                        <Form.Select value={assignTo} onChange={(e) => {setAssignTo(e.target.value)}}></Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AddTaskModal