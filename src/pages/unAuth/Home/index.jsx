import img1 from '../../../assets/img/1.jpg'
import imag2 from '../../../assets/img/2.jpg'
export default function Home() {
    return (
        <div>
            <div className='w-[100%] h-[80vh] bg-red-500 text-white text-[2rem])] bg-no-repeat object-cover'>
                <div className='w-[50%] py-[5rem] mx-auto flex justify-center items-center flex-col'>
                    <h1 className='text-yellow-500 text-[2.5rem] font-bold '>Your Ultimate Online <br />
                        Note-Taking Solution</h1>
                    <div>
                        <p id="pra">iCloudNoteBook is a user-friendly and feature-rich website designed to revolutionize your note-taking experience. With its intuitive interface and robust functionality, it offers a seamless platform for capturing, organizing, and accessing your notes anytime, anywhere.</p>

                        <div className='flex justify-center gap-4'>
                            <button id="button-1" class="no-underline bg-yellow-500 text-white rounded-md px-2 py-1">Join Us</button>
                            <button className='no-underline border border-yellow-500 text-white rounded-md px-2 py-1'>Sign Up</button>
                        </div>
                    </div>

                </div>
            </div>
            <div className='flex gap-2 p-4'>
                <div>
                    <img src={img1} alt="pic1" class="pics" />
                </div>
                <div>
                    <img src={imag2} alt="pic2" class="pics" />
                </div>
            </div>
            <div id="future">
                <h1 id="head" class="text-yellow-500 pt-4 text-center">Efficient Note Search <br /> Made Simple</h1>
                <p id="pra" class="dark:text-white pt-3 text-center">Our advanced search feature lets you find specific notes instantly, saving you valuable time and ensuring you never lose track of important information</p>

            </div>
        </div>
    )
}
