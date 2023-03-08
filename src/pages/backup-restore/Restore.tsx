import React from 'react'
import BackHeader from '../../components/BackHeader'
import images from '../../assets/images/images'
function Restore() {
  return (
    <div className='restore screen dark:text-darkText'>
      <BackHeader title='Restore data' />
      <section className='p-5 flex flex-col justify-center items-center pt-16'>
        <img src={images.undraw_add_notes_re_ln36} className='w-[70%] m-auto mt-10' />
        <p className='mt-8 text-xs px-3 pt-2 text-center'>Restore your data from a backed up file.</p>
        {/* <input type="file"  /> */}
      </section>

    </div>
  )
}

export default Restore