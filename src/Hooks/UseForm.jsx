import React from 'react'

const types = {
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i, 
        message: 'Please enter a valid email'
    },
    password: {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        message: 'The password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.'
    },
    number:{
        regex: /^\d+$/,
        message: 'This field only accepts numbers '
    }
};

const Useform = (type) => {

    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(null);

    function validate(value){
        if (type === false) return true;
        if (value.length === 0){
            setError('Please enter a value in the field')
            return false;
        }else if (types[type] && !types[type].regex.test(value)){
            setError(types[type].message)
            return false;
        }else{
            setError(null);
            return true;
        }
    }

    function onChange({target}){
        if (error) validate(target.value);
        setValue(target.value);
    }

  return ({ 
    value,
    error,
    setValue,
    onChange,
    validate: () => validate(value),
    onBlur: ()=> validate(value), 
    });
}

export default Useform
