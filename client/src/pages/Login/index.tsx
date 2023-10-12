import React from 'react' 
import useLogin from './useLogin';

const Login = () => {

    const {isSignIn, errorMessage, formData, setFormData, toggleSignInForm, handleCta, disabled} = useLogin()

    return (
            <div className="mt-16 flex items-center justify-center">
                <div className="bg-white p-8 border-[2px] border-gray shadow-md rounded-lg w-96">
                    {/* <h1 className="text-3xl font-semibold mb-4">LetsCode</h1> */}
                    <img src='/LetsCodeLogo.png' alt='letcode logo'/>
                    <h2 className="text-xl mb-4">{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        {!!errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
                        {!isSignIn && (
                            <>
                            <input
                                value={formData.fullName}
                                onChange={(e) =>
                                setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                                }
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-[2px] focus:border-orange-300"
                            />
                            <input
                                value={formData.userName}
                                onChange={(e) =>
                                setFormData((prev) => ({ ...prev, userName: e.target.value }))
                                }
                                type="text"
                                placeholder="User Name"
                                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-[2px] focus:border-orange-300"
                            />
                            </>
                        )}
                
                        <input
                            value={formData.emailAddress}
                            onChange={(e) =>
                            setFormData((prev) => ({ ...prev, emailAddress: e.target.value }))
                            }
                            type="text"
                            placeholder={isSignIn ? 'Email address or User Name' : 'Email address'}
                            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-[2px] focus:border-orange-300"
                        />
                        <input
                            value={formData.passWord}
                            onChange={(e) =>
                            setFormData((prev) => ({ ...prev, passWord: e.target.value }))
                            }
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-[2px] focus:border-orange-300"
                        />
                        <button
                            onClick={handleCta}
                            disabled = {disabled}
                            className={`w-full ${disabled ? `bg-orange-300` : `bg-orange-500`} text-white py-2 rounded-md hover:bg-orange-600`}
                        >
                            {isSignIn ? 'Sign In' : 'Sign Up'}
                        </button>
                        <span
                            onClick={toggleSignInForm}
                            className="mt-2 block text-center text-orange-500 cursor-pointer"
                        >
                            {isSignIn ? 'New to LetsCode? Sign Up Now' : 'Already a User? Sign In'}
                        </span>
                    </form>
                </div>
            </div>
        
    );
    
}

export default Login