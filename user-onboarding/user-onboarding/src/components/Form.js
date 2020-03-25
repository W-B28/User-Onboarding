import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';


export default function Form(){




return(
  <form>
    <label htmlFor="name">
      Name
      <input
        type="text"
        name="name"
        placeholder="'John Wick'"
        />
      </label>

      <label htmlFor="email">
       Email
       <input
         type="text"
         name="email"
         placeholder="'wick@badass.com'"
       />
     </label>

     <label htmlFor="password">
     Password
     <input
     type="password"
     id="pwd"
     name="password"
     placeholder="*******"
     />
     </label>

     <label htmlFor="terms" className="terms">
       <input
         type="checkbox"
         name="terms"
         // checked={true} {/* will change later with state */}
       />
       Terms & Conditions
     </label>
     <button>Submit</button>


      </form>
);
}
