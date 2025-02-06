import React, { useEffect, useState } from 'react'
import api from '../../lib/axios';
import { isAxiosError } from 'axios';
import Pet from './Pet';

export default function Pets({ id }) {
    const [pets, setPets] = useState([])
    const [refetch, setRefetch] = useState(false)
    useEffect(() => {
        const fetchPets = async () => {
            try {
                const { data } = await api(`/pets/user/${id}`);
                  
              setPets(data)

            } catch (error) {
                if (isAxiosError(error) && error.response) {
                    console.log(error.response.data);
                    setPets([])
                }
            }
        };
        fetchPets();
    }, [id, refetch]);




    const onDelete = async (petId) => {

        try {
            const { request } = await api.delete(`/pets/delete/${petId}`)
            console.log(request)
            setRefetch(prev => !prev);
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                console.log(error.response.data)
            }
        }
    }


    return (
        <div className='section-pets'>
            {
                pets.length > 0 ? pets.map(pet => (
                    <Pet onDelete={onDelete} pet={pet} key={pet._id} />

                )) : <p>No se encontraron mascotas</p>
            }
        </div>
    )
}
