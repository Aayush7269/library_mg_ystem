// import { type } from '@testing-library/user-event/dist/type'
import React from 'react'
import { Form} from 'react-bootstrap'



export const CustomInput = ({label, ...rest}) => {
  return (
    <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control {...rest} />
    <Form.Text className="text-muted">

    </Form.Text>
  </Form.Group>
  )
}
