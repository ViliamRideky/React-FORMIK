import './CompanyForm.css'
import React, { useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import emailjs from '@emailjs/browser';

const initialValues = {
    name: '',
    email: '',
    company: ''
}

const onSubmit = values => {
    console.log('form data', values)

}

const validationSchema = Yup.object({
    name: Yup.string().required('This field is required'),
    email: Yup.string()
        .email("Invalid email format")
        .required('This field is required'),
    company: Yup.string().required('This field is required')
})

const CompanyForm = () => {

    const [showMessage, setShowMessage] = useState("")

    const submitMessage = () => {
        setShowMessage('Report was sent to email')
    }

    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_dpn3s0o', 'template_tt1pp2e', form.current, 'T93L-RYslxbn2EAJD')
            .then((result) => {
                console.log(result.text);
                console.log("message was sent")
            }, (error) => {
                console.log(error.text);
            });
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    console.log('Form errors', formik.errors)
    console.log('Visited fields', formik.touched)

    return (
        <div>
            <div className='header'>
                <h1>Basic Formik with Yup - schema validation</h1>
                <p>EmailJS is used to send data</p>
            </div>
            <form ref={form} onSubmit={(e) => { formik.handleSubmit(); sendEmail(e) }} >
                <div className='form-control'>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (<div className='error'>{formik.errors.name}</div>) : null}
                </div>

                <div className='form-control'>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (<div className='error'>{formik.errors.email}</div>) : null}
                </div>

                <div className='form-control'>
                    <label htmlFor="company">Company</label>
                    <input type="text" id="company" name="company"
                        onChange={formik.handleChange}
                        value={formik.values.company}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.company && formik.errors.company ? (<div className='error'>{formik.errors.company}</div>) : null}
                </div>

                <button className='submit-btn' type='submit' onClick={submitMessage}>Submit </button>
                <p className='sent-message'>{showMessage}</p>
            </form >
        </div >
    )
}
export default CompanyForm