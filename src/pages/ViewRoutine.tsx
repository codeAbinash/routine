import { useNavigate, useParams } from 'react-router-dom'
import BackHeader from '../components/BackHeader'
import { Routine } from '../lib/dateMethods'
import ls from '../lib/storage'
import Weekly from './viewRoutine/Weekly'
import Daily from './viewRoutine/Daily'


function ViewRoutine() {
    let { routineId } = useParams<any>()
    const routines = JSON.parse(ls.get('routines') || '[]')
    const routine: Routine = routines[parseInt(routineId as string)]
    const navigate = useNavigate()
    return (
        <div className="screen flex flex-col justify-between dark:text-darkText">
            <div className="top">

                <BackHeader title={`${routine.name} (${routine.type})`} />
                <section className='px-5'>
                    {/* <h1 className='font-medium text-center'>{routine.type}</h1> */}
                    {/* <p>{routine.description}</p> */}
                    {viewRoutineTyped(routine)}
                    <div className="description mt-6">
                        <p className='text-xs text-grey'>Description </p>
                        <p className='text-sm p-4 bg-inputBg dark:bg-darkInputBg rounded-xl mt-2 tap99'>{routine.description}</p>
                    </div>
                </section>
            </div>
            <div className="bottom w-full flex flex-row justify-between p-5 gap-4">
                <button className='btn-full bg-pink text-[0.8rem] no-highlight tap97 flex-1' onClick={() => deleteRoutine(routineId as string)}>Delete</button>
                <button className='btn-full bg-accent text-[0.8rem] no-highlight tap97 flex-1'>Edit</button>
            </div>
        </div>
    )

    function deleteRoutine(routineId: string) {
        let confirm
        let confirm2
        console.log("Ok")
        if (routine.sub !== 'LOCAL') {
            const subscription = JSON.parse(ls.get('subscriptions') || '{}')[routine.sub]
            confirm = window.confirm(`Warning! This routine belongs to your subscription of ${subscription.name}. If you delete this routine, this will be restored in the next update of that subscription. Are you sure?`)
            confirm && (confirm2 = window.confirm(`Really? Are you sure you want to delete this routine?`))
            confirm = confirm && confirm2
        } else {
            confirm = window.confirm('Are you sure you want to delete this routine?')
        }

        if (!confirm) return
        const routines = JSON.parse(ls.get('routines') || '[]')
        routines.splice(parseInt(routineId), 1)
        ls.set('routines', JSON.stringify(routines))
        navigate(-1)
    }
}
function viewRoutineTyped(routine: Routine) {
    if (routine.type === 'weekly') {
        return <Weekly routine={routine} />
    }
    if (routine.type === 'daily') {
        return <Daily routine={routine} />
    }
    else
        return (
            <div>
                <p>Not implemented yet</p>
                <div className='p-4 bg-black text-white rounded-2xl mt-4'>
                    <code className='text-sm'>{JSON.stringify(routine, null, 4)}</code>
                </div>
            </div>
        )
}



export default ViewRoutine