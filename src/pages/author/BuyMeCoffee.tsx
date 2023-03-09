import Emoji from 'emoji-store'
import images from '../../assets/images/images'
import BackHeader from '../../components/BackHeader'

function BuyMeCoffee() {
    return (
        <div className='screen pb-32 dark:text-darkText'>
            <BackHeader title="Buy Me Coffee" />
            <section className='px-5 text-sm pt-5'>
                <p className='indent-5'>Thank you for using my application. As an independent developer, creating and maintaining apps is my passion. Your support and encouragement mean a lot to me, and I'm grateful for your trust in my work.</p>
                <div className="coffee">
                    <img src={Emoji.get('☕')} className='w-[25%] block m-auto my-10 ' />
                </div>
                <div className="flex flex-col gap-2">
                    <p className='indent-5'>
                        You can donate via UPI by scanning the QR code below or by using the UPI ID <span className='text-accent'>codeabinash@oksbi</span> . Any amount is appreciated, and it helps me continue to improve the app and create new features.
                    </p>
                    <div className="qr">
                        <img src={images.QR} className='block m-auto w-[70%] rounded-3xl my-5' />
                    </div>
                    <p className='indent-5'>
                        Thank you for your support, and please don't hesitate to contact me if you have any questions or feedback.
                    </p>
                    <div className="aboutMe flex justify-center items-center flex-col mt-10">
                        <p className='text-xl font-medium'>Abinash</p>
                        <p><a href="mailto:codeAbinash@gmail.com" className='text-accent text-base'>codeAbinash@gmail.com</a></p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BuyMeCoffee