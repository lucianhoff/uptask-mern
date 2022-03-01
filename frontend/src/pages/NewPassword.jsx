import React from 'react'
const NewPassword = () => {
    return (
        <>
            <h1 className='text-purple-500 font-bold text-6xl p-5 md:text-center'>
                Reset your password and don't lose access to your
                <span className='text-slate-700 capitalize'> projects</span>
            </h1>

            <form className='my-10 px-5'>

                <div className='my-5'>
                    <label htmlFor='password' className='block text-gray-700 text-xl font-bold mb-2'>
                        Password
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='password'
                        type='password'
                        placeholder='********'
                    />
                </div>

                <div className='my-5'>
                    <label htmlFor='passwordconfirm' className='block text-gray-700 text-xl font-bold mb-2'>
                        Confirm Password
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='passwordconfirm'
                        type='password'
                        placeholder='********'
                    />
                </div>


                <input
                    type="submit"
                    value="Confim change password"
                    className='my-5 bg-purple-600 text-white w-full py-3 font-bold rouded hover:cursor-pointer hover:bg-purple-800 transition-colors ' />
            </form>
        </>
    )
}

export default NewPassword