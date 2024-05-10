import { useState } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    username: '',
    user_email:'',
    user_password: '',
    user_display_name: '',
    user_affiliation: '',
    user_role:'',
    pilot_id: '',
};

const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    user_email: Yup.string().email('Invalid email format').required('Required'),
    user_password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    user_display_name: Yup.string().required('Required'),
    user_affiliation: Yup.string().required('Required'),
    user_role: Yup.string().required('Required'),
    pilot_id: Yup.string().required('Required'),
  });
  

const SignUp = () => {
    const navigate = useNavigate()
    const [passwordVisible, setPasswordVisible] = useState(false);
    

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onButtonClick = (values: any) => {
        console.log(values)
        navigate('/main-map')
      }

    return (
        <div className="flex-col flex justify-center items-center overflow-y-auto">
            <img src={"/silvanus_icon.jpg"} className="w-48 h-auto"/>
            <div>
                <div className='font-bold text-4xl mb-4 mt-[-60px]'>Sign Up</div>
            </div>
            <div className='pb-4'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onButtonClick}
                >
                    <Form>
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                            <div className="w-full px-3 mb-6 md:mb-4">
                                <label className="text-grey-darker mb-2 font-bold" htmlFor="username">
                                    Username
                                </label>
                                <Field type="text" id="username" name="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <ErrorMessage name="username" component="div" className="text-red-500 text-xs italic" />
                            </div>

                            <div className="w-full px-3 mb-6 md:mb-2">
                                <label className="text-grey-darker mb-2 font-bold" htmlFor="user_email">
                                    E-Mail
                                </label>
                                <Field type="email" id="user_email" name="user_email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <ErrorMessage name="user_email" component="div" className="text-red-500 text-xs italic" />
                            </div>

                            <div className="w-full px-3 mb-6 md:mb-4">
                                <label className="text-grey-darker mb-2 font-bold" htmlFor="user_display_name">
                                    Display Name
                                </label>
                                <Field type="text" id="user_display_name" name="user_display_name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <ErrorMessage name="user_display_name" component="div" className="text-red-500 text-xs italic" />
                            </div>

                            <div className="w-full px-3 mb-6 md:mb-4">
                                <label className="text-grey-darker mb-2 font-bold" htmlFor="user_affiliation">
                                    User Affiliation
                                </label>
                                <Field type="text" id="user_affiliation" name="user_affiliation" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <ErrorMessage name="user_affiliation" component="div" className="text-red-500 text-xs italic" />
                            </div>

                            <div className="w-full px-3 mb-6 md:mb-4">
                                <label className="text-grey-darker mb-2 font-bold" htmlFor="user_role">
                                    User Role
                                </label>
                                <Field name="user_role" as="select" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option value="">Select A Role</option>
                                    <option value="client">Client</option>
                                    <option value="pilot_admin">Pilot Admin</option>
                                </Field>
                                <ErrorMessage name="user_role" component="div" className="text-red-500 text-xs italic" />
                            </div>

                            <div className="w-full px-3 mb-6 md:mb-4">
                                <label className="text-grey-darker mb-2 font-bold" htmlFor="pilot_id">
                                    Pilot
                                </label>
                                <Field name="pilot_id" as="select" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option value="">Select A Pilot</option>
                                    <option value="1">Taman Nasional Sebangau</option>
                                    <option value="2">Gargano</option>
                                </Field>
                                <ErrorMessage name="pilot_id" component="div" className="text-red-500 text-xs italic" />
                            </div>

                            <div className="w-full px-3 mb-6 md:mb-2">
                                <div className="w-full">
                                    <label className="text-grey-darker mb-2 font-bold" htmlFor="user_password">
                                        Password
                                    </label>
                                    <Field type={passwordVisible? "text" : "password"} id="user_password" name="user_password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    <ErrorMessage name="user_password" component="div" className="text-red-500 text-xs italic" />
                                    <button type="button" className="px-3 text-gray-600 ml-auto" onClick={togglePasswordVisibility}>
                                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                                    </button>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className={'w-full justify-between bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-xl cursor-pointer'}
                            >
                                Sign Up
                            </button>
                        </div>

          {/* <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          </div>
          <div>
            <Field type="email" id="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
          </div> */}


                        {/* <div>
                            <label htmlFor="username">E-Mail</label>
                            <Field 
                                type="text" 
                                id="username" 
                                name="username" 
                                placeholder="Enter your username here"
                                className={'ml-10 py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 mb-2'}/>
                            <ErrorMessage 
                                name="username" 
                                component="div" 
                                className="ml-10 text-red-500 text-sm ml-auto"
                            />
                        </div> */}





                        {/* <div>
                            <label htmlFor="password">Password</label>
                            <Field 
                                type={passwordVisible? "text" : "password"} 
                                id="password" 
                                name="password" 
                                placeholder="Enter your password here"
                                className={'ml-10 py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 mb-8'}/>
                            <button
                                type="button"
                                className="px-3 text-gray-600 ml-auto"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <VisibilityOff /> : <Visibility />}
                            </button>
                            <ErrorMessage 
                                name="password" 
                                component="div" 
                                className="ml-10 text-red-500 text-sm ml-auto"
                            />
                        </div> */}

                        
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default SignUp