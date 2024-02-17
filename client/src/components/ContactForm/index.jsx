import React, { useState } from 'react'
import "./index.scss"
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

function Form() {



    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [subject, setSubject] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        try {
            const serviceId = "service_36dvwhb"
            const templateId = "template_cae27qq"
            const publicKey = "o6oC4M2FMQmY3Z3ZF"

            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                to_name: "Ilkin",
                message: message

            }

            emailjs.send(serviceId, templateId, templateParams, publicKey).then((response) => {
                setEmail('')
                setName('')
                setMessage('')
                setSubject('')
            })
            toast.success("Email Sent Successfully")
        } catch (error) {
            toast.error('Oops! there was an error')
        }

    }



    return (
        <div className='contact-form'>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder='Your Subject' value={subject} onChange={(e) => setSubject(e.target.value)} />
                <textarea type="text " cols={'80'} rows={'20'} placeholder='Your message' value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type='submit'>SEND TO US</button>
            </form>
        </div>
    )
}


export default Form


