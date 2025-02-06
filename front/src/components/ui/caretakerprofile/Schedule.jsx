import React from 'react'
import { dictionary } from '../../../utils/helpers'

export default function Schedule({ availability }) {

    
    return (
        <div className='availability-container'>
            <h3 className='schedule-title'>Horarios de Servicio</h3>
          
            <div className='schedule-container'>
                <div>
                    <p>Día</p>
                </div>

                <div>
                    <p>Horarios</p>
                </div>


            </div>
            {
                availability?.map(avail => (
                    <div className='schedule-container' key={avail._id} >

                        <div>
                            <p >{dictionary[avail.day]}</p>
                        </div>

                        <div>
                            <p>{avail.startTime} a {avail.endTime} </p>
                        </div>

                    </div>

                ))
            }
        </div>
    )
}
