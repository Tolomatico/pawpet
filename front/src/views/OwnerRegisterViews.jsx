import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import api from '../lib/axios'
import { isAxiosError } from 'axios'
import Form1 from '../components/auth/Form1'
import Form2 from '../components/auth/Form2'
import Form3 from '../components/auth/Form3'
import  RegisterCongratulations  from '../components/auth/RegisterCongratulations'

export default function OwnerRegisterViews() {

    const params = useParams()
    const id = params.id
    const [user, setUser] = useState(null)
    const [currentForm, setCurrentForm] = useState(1);

    const nextForm = () => {
        setCurrentForm(currentForm + 1);
    };

    const prevForm = () => {
        setCurrentForm(currentForm - 1);
    };
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const request = await api(`/users/${id}`)
                setUser(request.data)
            } catch (error) {
                if (isAxiosError(error) && error.response) {
                    throw new Error(error.response.data.error)
                }
            }
        }
        fetchUser()

    }, [])

    return (
        <>
            {currentForm === 1 && <Form1 user={user} nextForm={nextForm} />}
            {currentForm === 2 && <Form2  prevForm={prevForm} nextForm={nextForm} />}
            {currentForm === 3 && <Form3  nextForm={nextForm} />}
            {currentForm === 4 && <RegisterCongratulations/>}
        </>
    )
}
