import React from 'react'
import "./index.scss"

function Form() {
    return (
        <div className='contact-form'>
            <form action="">
                <input  type="text" placeholder='Your Name' />
                <input type="text" placeholder='Your Email' />
                <input type="text" placeholder='Your Subject' />
                <textarea type="text " cols={'80'} rows={'20'} placeholder='Your message' />
                <button type='submit'>SEND TO US</button>
            </form>
        </div>
    )
}

export default Form