import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';


const formSchema = yup.object().shape({
  name: yup.string().required("Name is a required field."),
  email: yup
    .string()
    .email("Must be a valid email address.")
    .required("Must include email address."),
  terms: yup.boolean().oneOf([true], "please agree to terms of use"),
  password: yup.string().required("Must enter a pasword"),
});

export default function Form(){


  // Button availability toggle
const [ buttonDisabled, setButtonDisabled] = useState(true);

  // managing Form state
  const [ formState, setFormState ] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  const [ errors, setErrors ] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  // set state for post request
  const [post, setPost] = useState([])

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const formSubmit = e => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(res => {
        console.log(res)
        setPost(res.data); // get just the form data from the REST api
        console.log("success", post);
        // reset form if successful
        setFormState({
          name: "",
          email: "",
          terms: "",
          password: "",

        });
      })
      .catch(err => console.log("ERROR", err.response));

  };



  const validateChange = e => {
    // Reach will allow us to "reach" into the schema and test only one part.
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };

  const inputChange = e => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };

    validateChange(e);
    setFormState(newFormData);
  };


return(
  <form onSubmit={formSubmit}>
    <label htmlFor="name">
      Name
      <input
        type="text"
        name="name"
        placeholder="'John Wick'"
        value={formState.name}
        onChange={inputChange}
        />
      </label>
      {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      <label htmlFor="email">
       Email
       <input
         type="text"
         name="email"
         placeholder="'wick@badass.com'"
         value={formState.email}
         onChange={inputChange}
       />
     </label>
     {errors.email.length > 0 ? (
               <p className="error">{errors.email}</p>
             ) : null}
     <label htmlFor="password">
     Password
     <input
     type="password"
     name="password"
     placeholder="*******"
     value={formState.password}
     onChange={inputChange}
     minlength="8"
     required />
     </label>

     <label htmlFor="terms" className="terms">
       <input
         type="checkbox"
         name="terms"
         checked={formState.terms}
         onChange={inputChange}
         required
         // checked={true} {/* will change later with state */}
       />
       Terms & Conditions
     </label>
     <pre>{JSON.stringify(post, null, 2)}</pre>
     <button disabled={buttonDisabled}>Submit</button>
      </form>
);
}
