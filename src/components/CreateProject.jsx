import { FaTimes } from 'react-icons/fa'
import { useGlobalState, setGlobalState } from '../store'
import { useState } from 'react'
import { createProject } from '../services/blockchain'
const CreateProject = () => {
    const [createModal] = useGlobalState('createModal')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cost, setCost] = useState('')
    const [date, setDate] = useState('')
    const [imageURL, setImageURL] = useState('')

    const toTimestamp = (dateStr) => {
        const dateObj = Date.parse(dateStr)
        return dateObj / 1000
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!title || !description || !cost || !date || !imageURL) return

        const params = {
            title,
            description,
            cost,
            expiresAt: toTimestamp(date),
            imageURL,
        }

        await createProject(params)
        toast.success('Projects created successffully, will refelct in 30sec. ')
    }
    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen flex 
            items-center justify-center bg-black  bg-opacity-50
            transform transition-transform duration-300 ${createModal} `}
        >

            <div
                className="bg-white shadow-xl shadow-black
              rounded-xl w-11/12 md:w-2/5 h-7/12 p-6"
            >
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Add Project</p>
                        <button type="button"
                            onClick={() => setGlobalState('createModal', 'scale-0')}
                            className="border-0 bg-transparent focus:outline-none">
                            <FaTimes />
                        </button>
                    </div>

                    <div className='flex justify-center items-center mt-5'>
                        <div className='rounded-xl overflow-hidden h-20 w-20'>
                            <img src={imageURL || 'https://www.openaccessgovernment.org/wp-content/uploads/2019/09/dreamstime_xxl_123552072.jpg'}
                                alt="project title" className='h-full object-cover w-full cursor-pointer'
                            />
                        </div>
                    </div>

                    <div className='flex justify-between items-center 
                    bg-gray-300 rounded-xl mt-5'>
                        <input className='block w-full bg-transparent
                        border-0 text-sm text-slate-500 focus:outline-none
                        focus:ring-0'
                            type="text"
                            name="title"
                            placeholder='Title'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required
                        />
                    </div>
                    <div className='flex justify-between items-center 
                    bg-gray-300 rounded-xl mt-5'>
                        <input className='block w-full bg-transparent
                        border-0 text-sm text-slate-500 focus:outline-none
                        focus:ring-0'
                            type="number"
                            step={0.01}
                            min={0.01}
                            name="cost"
                            placeholder='cost (ETH)'
                            onChange={(e) => setCost(e.target.value)}
                            value={cost}
                            required
                        />
                    </div>
                    <div className='flex justify-between items-center 
                    bg-gray-300 rounded-xl mt-5'>
                        <input className='block w-full bg-transparent
                        border-0 text-sm text-slate-500 focus:outline-none
                        focus:ring-0'
                            type="date"
                            name="date"
                            placeholder='Expires'
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            required
                        />
                    </div>
                    <div className='flex justify-between items-center 
                    bg-gray-300 rounded-xl mt-5'>
                        <input className='block w-full bg-transparent
                        border-0 text-sm text-slate-500 focus:outline-none
                        focus:ring-0'
                            type="text"
                            name="imgURL"
                            placeholder='Image URL'
                            onChange={(e) => setImageURL(e.target.value)}
                            value={imageURL}
                            required
                        />
                    </div>
                    <div className='flex justify-between items-center 
                    bg-gray-300 rounded-xl mt-5'>
                        <textarea className='block w-full bg-transparent
                        border-0 text-sm text-slate-500 focus:outline-none
                        focus:ring-0'
                            type="text"
                            name="description"
                            placeholder='Description'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required
                        ></textarea>
                    </div>
                    
                    <button type='submit' className='inline-block 
                    px-6 py-2.5 bg-green-600 text-white 
                    font-medium text-md leading-tight 
                    rounded-full shadow-md hover:bg-green-700 mt-5'>
                        Submit Project
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateProject