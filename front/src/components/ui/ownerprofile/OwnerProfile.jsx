import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import api from '../../../lib/axios'
import Pets from '../Pets'

export default function OwnerProfile() {
    const params = useParams()
    const { id } = params
    const [user, setUser] = useState({})

    useEffect(() => {

        const fetchUser = async () => {

            try {
                const { data } = await api.get(`/users/${id}`)
                console.log(data)
                setUser(data)
            } catch (error) {
                if (isAxiosError(error) && error.response) {
                    console.log(error.response.data.error)
                }
            }
        }
        fetchUser()

    }, [])

    
    return (
        <div className="profile-view-container">
            <h1 className="profile-title">Perfil del Dueño</h1>

            <div className="profile-section">

                <div className="user-info">
                    <img
                        className="user-picture"
                        src={user.profilePicture}
                        alt="Imagen de perfil"
                    />
                    <div className="user-details">
                        <h2 className="user-name">
                            {user.name} {user.lastName}
                        </h2>
                        <p className="user-location">
                            {user.zone}, {user.neighborhood}
                        </p>
                    </div>


                </div>
            </div>

            {/* Sección de mascotas */}
            <div className="pets-section">

                <h2 className="pets-title">Mascotas</h2>

                <Pets id={id} />
            </div>

        </div>
    )
}
