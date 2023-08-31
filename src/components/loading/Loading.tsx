import icons from '../../assets/icons/icons';

function Loading() {
   return (
      // <div className='animate-spin rounded-full h-20 aspect-square border-b-2 border-dark/50 dark:border-darkText/50'></div>
      <div className='flex items-center justify-center'>
         <img src={icons.spinner} alt='Spinner' className='h-20 w-20' />
      </div>
   );
}

export default Loading;
