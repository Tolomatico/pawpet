import React, { useEffect, useState } from 'react'
import CaretakerProfileInfo from './ProfileInfo'
import Schedule from './Schedule'
import { isAxiosError } from 'axios';
import api from '../../../lib/axios';

export default function ProfileCaretaker({ user }) {

    const [availability, setAvailability] = useState([])


    useEffect(() => {
        const fetchAvailabilities = async () => {
            try {
                const { data } = await api(`/caretaker/${user._id}/availability`);

                setAvailability(data.data);
            } catch (error) {
                if (isAxiosError(error) && error.response) {
                    console.log(error.response.data);
                }
            }
        };
        fetchAvailabilities();
    }, []);



    return (
        <> <div className="profile-container">
          
            <div className="profile-card">
            <h1 className="profile-title">Mi Perfil</h1>

                <CaretakerProfileInfo caretaker={user} />
                <Schedule availability={availability} />
            </div>

        </div>
        </>

    )
}
