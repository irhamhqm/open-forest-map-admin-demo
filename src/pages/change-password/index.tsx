
export default ChangePassword() {
  return (
    <div className="h-screen flex-col flex justify-center items-center mt-[-60px]">
      <img src={"/silvanus_icon.jpg"} />
      <div>
        <div className="font-bold text-4xl mb-4 mt-[-60px]">Sign In</div>
      </div>
      <div className="pb-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onButtonClick}
        >
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username here"
                className={
                  "ml-10 py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 mb-2"
                }
              />
              <ErrorMessage
                name="username"
                component="div"
                className="ml-10 text-red-500 text-sm ml-auto"
              />
            </div>
            <div>
              <label htmlFor="password">Password </label>
              <Field
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password here"
                className={
                  "ml-10 py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 mb-8"
                }
              />
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
            </div>

            <button
              type="submit"
              className={
                "w-full justify-between bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-xl cursor-pointer"
              }
            >
              Sign In
            </button>

            {isError && (
              <Alert
                variant="filled"
                severity="error"
                className="w-full mt-10 rounded-lg"
              >
                {/* {error?.data?.meta} */}
                Unexpected error occured
              </Alert>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  )
}
