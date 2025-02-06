import React from 'react'
import { dictionaryService } from '../../../utils/helpers'

export default function CaretakerProfileInfo({ caretaker }) {


    return (
        <>

           
            <img
                className="picture-profile"
                src={caretaker.profilePicture}
                alt="Imagen de cuidador"
            />
            <h2>
                {caretaker.name} {caretaker.lastName}
            </h2>
            
            <p className="p-service">{dictionaryService[caretaker.service]}</p>
            <p>{caretaker.about}</p>
            <p>Tarifa por hora: ${caretaker.cost}</p>
            <p>
                {caretaker.zone}, {caretaker.neighborhood}
            </p>
        </>
    )
}
