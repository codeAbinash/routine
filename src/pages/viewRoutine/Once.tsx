import React from 'react'
import { Routine } from '../../lib/dateMethods'

function Once({ routine }: { routine: Routine }) {
    const startTime = new Date(routine.time[0])
    const endTime = new Date(routine.time[1])

    return (
        <div className='text-center flex gap-3 flex-col my-10 font-[450]'>
            <div>
                <p>
                    From {startTime.toLocaleString('default', { hour: "2-digit", minute: "2-digit", day: "2-digit", month: 'long', year: "numeric" })}
                </p>
            </div>
            <div>
                <p>
                    To {startTime.toLocaleString('default', { hour: "2-digit", minute: "2-digit", day: "2-digit", month: 'long', year: "numeric" })}
                </p>
            </div>
        </div>
    )
}

export default Once