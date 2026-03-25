import { useState } from "react";

export function Register() {
    const [form, setform] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [errors, seterrors] = useState({});

    function handleOnchange(e) {
        const { name, value } = e.target;
        setform(prev => ({ ...prev, [name]: value }));
    }

    function validate() {
        const newErrors = {};


        if (!form.name.trim()) {
            newErrors.name = 'Name is required';
        }


        if (!form.email.includes('@')) {
            newErrors.email = 'Please enter a valid email';
        }


        if (form.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }


        seterrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit() {
        if (!validate()) return;
        console.log("form submitted")
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={form.name} onChange={handleOnchange} placeholder="enter name" />
            {errors.name && (
                <p style={{color: "red"}}>{errors.name}</p>
            )}
            <input type="text" name="email" value={form.email} onChange={handleOnchange} placeholder="enter email" />
            {errors.email && (
                <p style={{color: "red"}}>{errors.email}</p>
            )}
            <input type="text" name="password" value={form.password} onChange={handleOnchange} placeholder="enter password" />
                {errors.password && (
                <p style={{color: "red"}}>{errors.password}</p>
            )}
            <input type="submit" />

        </form>
        </>
    )

}