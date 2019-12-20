// Import dependencies
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import {Button, 
        Row, Col, FormGroup, Label, Input,
        CardGroup} from 'reactstrap'
import styled from 'styled-components';
import DisplayUsers from './DisplayUsers';


// OnboardForm Component
const OnboardForm = (props) => {
    const {values, errors, touched, status} = props;

    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log('status has changed', status)
        status && setUsers([...users, status])
    }, [status]);

    const P = styled.p`
        color: red;
        margin: 0;
        padding: 0;
        font-size: 10px;
    `

    const Onboard_Form = styled.div`
        max-width: 800px;
        width: 70%;
        margin: 0 auto;
        padding: 40px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    `

    const Top = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 20px;
    `
    const RowContainer = styled.div`
        margin: 5px 0 20px 17px;
    `
    // - - - - - - - - - - - - - - - - - - - - - - - - -
    return (
        <Onboard_Form className="onboard-form">
            <Form>
                <Top className="top">
                    <h2 style={{fontSize: "20px"}}>Peronsal Informationn</h2>
                    <RowContainer className="name-container">
                        <label htmlFor="firstName"></label>
                            <Field type="text" name="firstName" id="firstName" placeholder="First Name" />
                        <label htmlFor="lastname"></label>
                            <Field type="text" name="lastName" id="lastName" placeholder="Last Name" />
                        {touched.firstName && errors.firstName && <P className="errors">{errors.firstName}</P>}
                        {touched.lastName && errors.lastName && <P className="errors">{errors.lastName}</P>}
                    </RowContainer>

                    <RowContainer className="user-email-container">
                        <label htmlFor="email"></label>
                            <Field type="email" name="email" id="email" placeholder="user@gmail.com" />
                            {touched.email && errors.email && <P className="errors">{errors.email}</P>}
                    </RowContainer>
                    <RowContainer className="pw-pwc-container">
                        <label htmlFor="pw"></label>
                            <Field type="password" name="pw" id="pw" placeholder="Password" />
                        <label htmlFor="pwc"></label>
                            <Field type="password" name="pwc" id="pwc" placeholder="Confirm" />
                            {touched.pw && errors.pw && <P className="errors">{errors.pw}</P>}
                            {touched.pwc && errors.pwc && <P className="errors">{errors.pwc}</P>}
                    </RowContainer>
                    <RowContainer className="terms-of-service-container">
                        <label htmlFor="tos">Terms of Service</label>
                            <Field type="checkbox" name="tos" id="tos" checked={values.tos}/>
                            {touched.tos && errors.tos && <P className="errors">{errors.tos}</P>}
                    </RowContainer>
                    <RowContainer className="role-container">
                        <label htmlFor="role">Role</label>
                            <Field as="select" name="role" id="role">
                                <option disable value="choose an option"></option>
                                <option value="For myself">For myself</option>
                                <option value="To manage my business">To manage my business</option>
                            </Field>
                            {touched.role && errors.role && <P className="errors">{errors.role}</P>}
                    </RowContainer>
                </Top>
                <div className="Address">
                    <h2 style={{fontSize: "20px"}}>Address</h2>
                    <Col>
                        <FormGroup>
                            <Label for="exampleAddress">Address</Label>
                            <Field type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
                            {touched.address && errors.address && <P className="errors">{errors.address}</P>}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="exampleAddress2">Address 2</Label>
                            <Field type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor"/>
                            {touched.address2 && errors.address2 && <P className="errors">{errors.address2}</P>}
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="exampleCity">City</Label>
                        <Field type="text" name="city" id="exampleCity"/>
                        {touched.city && errors.city && <P className="errors">{errors.city}</P>}
                    </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="exampleState">State</Label>
                            <Field type="text" name="state" id="exampleState"/>
                            {touched.state && errors.state && <P className="errors">{errors.state}</P>}
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="exampleZip">Zip</Label>
                            <Field type="text" name="zip" id="exampleZip"/>
                            {touched.zip && errors.zip && <P className="errors">{errors.zip}</P>}
                        </FormGroup>  
                    </Col>
                </div>

                {/* {Submit Button} */}
                <Button type="submit" color="primary" style={{marginLeft: "400px"}}>Submit</Button>
                
                {/* {Display Users} */}
                <CardGroup>
                    {users.map(user => (
                            <DisplayUsers user={user}/>
                    ))}
                </CardGroup>
            </Form>
        </Onboard_Form>
    )
}

const FormikOnboardForm = withFormik({
    // set initial states of our form
    mapPropsToValues({firstName,lastName, email, pw, pwc, tos, role, address, address2, city, state, zip }) {
        return {
            firstName: firstName || "",
            lastName: lastName || "",
            email: email || "",
            pw: pw || "",
            pwc: pwc || "",
            tos: tos || "",
            role: role || "",
            address: address || "",
            address2: address2 || "",
            city: city || "",
            state: state || "",
            zip: zip || ""
        };
    },

    // Validation
    validationSchema: Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too long!')
            .required('First Name is required!'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too long!')
            .required(`Last Name is required!`),
        email: Yup.string()
            .email('Invalid Email!')
            .matches(/(waffle@syrup.com)/, 'That email is already taken.')
            .required(`Email is required`),
        pw: Yup.string()
            .required(`Password is required`),
        pwc: Yup.string()
            .oneOf([Yup.ref('pw'), null], 'Passwords must match'),
        tos: Yup.boolean()
            .oneOf([true], 'Must Accept Terms and Conditions'),
        role: Yup.string()
            .oneOf([
                "For myself",
                "To manage my business",
                ])
            .required("Please choose one!"),
        address: Yup.string()
            .required(`Address is required`),
        address2: Yup.string()
            .required(`Adress 2 is required`),
        city: Yup.string()
            .required(`City is required`),
        state: Yup.string()
            .required(`State is required`),
        zip: Yup.string()
            .required(`Zipcode is required`)
    }),

    // Submit
    handleSubmit(values, {setStatus, resetForm}) {
        console.log("submitting", values)
        axios.post('https://reqres.in/api/users', values)
        .then(response => {
          console.log('success',response);
          setStatus(response.data)
          resetForm();
        })
        .catch(err => {
          console.log(err);
        })
      }
})(OnboardForm)

export default FormikOnboardForm;