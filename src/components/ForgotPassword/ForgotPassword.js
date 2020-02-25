import React, { useState } from 'react';
// import '../../App.css'
// import { Form, Icon, Input, Button } from 'antd';

const ForgotPassword = () => {
    
    const [formValues, setFormValues] = useState({
        email: ""
    })

    const handleChange = e => {
        setFormValues({
            formValues,
            [e.target.name]: e.target.value
          })
    }
    
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let errorcount = 0

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formValues.email);
        if(emailRegex.test(formValues.email) === true) {
            console.log("good")
            setFormValues({
                    email: ""
                })
        } else {
            console.log("BAD");
            const p = document.createElement("p")
            if(errorcount < 1) {
                errorcount++
                p.textContent = "Bad Email Address"
                p.style.color = "red"
                document.querySelector("body").append(p)
            }
        }
    }

  return (
    <div className="forgot-password" onSubmit={handleSubmit}>
        <h1>Reset Password</h1>

        <form>
            <label>Email</label>
            <input type="text" name="email" value={formValues.email} onChange={handleChange} />
            <input type="submit" />
        </form>
        {/* <Form>
            <Input>
            </Input>
        </Form> */}
    </div>
  )
}

export default ForgotPassword;