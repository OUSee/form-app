import React, { ChangeEvent, FormEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import styles from "./styles.module.css";

enum GenderEnum {
  female = "female",
  male = "male"
}

interface IUserForm {
    age: number
    firstName: string
    lastName: string
    gender: GenderEnum
    email: string
    phone: number
    adress: string
}

export const UserForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IUserForm>()
    const [fNameErr, setFNameErr] = useState("Invalid value")
    const [lNameErr, setLNameErr] = useState("Invalid value")
    const [mailErr, setMailErr] = useState("Invalid value")
    const [phoneErr, setPhoneErr] = useState("Invalid value")

    const onSubmit = handleSubmit((data) => console.log(data))

    const isRequired = () => {
        if (errors.firstName) return ("*")
        return ""
     
    }

    return (
        <form className={styles.formContainer} onSubmit={onSubmit}>
            <div className={styles.mainInfoContainer}>
                <label>First name</label>
                <input
                    className={styles.defaultInput}
                    aria-invalid = {errors.firstName ? "true" : "false"}
                    {...register("firstName", { value: "", required: true, pattern: /^[A-Za-zа-яА-Я]+$/i, maxLength: 20 })}
                />
                {errors.firstName && (<span className={styles.error}>invalid value</span>)}
                <label>Last Name</label>
                <input className={styles.defaultInput} aria-invalid = {errors.lastName ? "true" : "false"} {...register("lastName", { value: "", required: true, pattern: /^[A-Za-zа-яА-Я]+$/i, maxLength: 20 })} /> 
                {errors.lastName && (<span className={styles.error}>invalid value</span>)}
                <label>Email</label>
                <input className={styles.defaultInput} aria-invalid={errors.email ? "true" : "false"} {...register("email", { value: "", required: true, pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i })} />
                {errors.email && (<span className={styles.error}>invalid value</span>)}
                <label>Phone</label>
                <input className={styles.defaultInput} aria-invalid = {errors.phone ? "true" : "false"} {...register("phone", { required: true, pattern: /[0-9]+$/i, maxLength: 11, minLength: 11 })} />    
                {errors.phone && (<span className={styles.error}>invalid value</span>)}
            </div>
            <div className={styles.ageGenderContainer}>
                <div className={styles.ageContainer}>
                    <label>Age</label>
                    <input className={styles.ageInput} type="number" {...register("age", { value: 18, min: 12, required: true })} />
                    {errors.age && (<span className={styles.error}>you are two young</span>)}
                </div>
                <div className={styles.GenderContainer}>
                    <label>Gender</label>
                    <select className={styles.genderInput} {...register("gender")}>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </div>
            </div>
            <input
                type="submit"
                className={styles.submitButton}
                value="Sent Info"
                />
        </form>
    )
}