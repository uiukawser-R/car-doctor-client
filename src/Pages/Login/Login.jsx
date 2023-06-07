import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthContext } from '../../Provider/AuthProvider';
import { useContext } from 'react';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
const Login = () => {

    const { signIn } = useContext(AuthContext);
    const location = useLocation()
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/'

    // const handleLogin = event => {
    //     event.preventDefault();
    //     const form = event.target;
    //     const email = form.email.value;
    //     const password = form.password.value;
    //     const user = { email, password };
    //     // console.log(user); 
    //     signIn(email, password)
    //         .then(result => {
    //             const user = result.user;
                
    //             console.log(user);
    //             navigate(from, {replace:true})


               
    //         })
    //         .catch(error => console.log(error))
    // }


    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(user); 
        signIn(email, password)
            .then(result => {
                const user = result.user;
                const loggedUser={
                    email:user.email
                }
                
                console.log(loggedUser);
                
                fetch('http://localhost:5000/jwt',{
                    method:'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                }) 
                .then(res=>res.json())
                .then(data=>{
                    console.log('jwt response',data);
                    localStorage.setItem('car-access-token',data.token);
                    navigate(from, {replace:true})
                })
            })
            .catch(error => console.log(error))
    }




    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className=" w-1/2 mr-12">

                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Login now!</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text"
                                    name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">

                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='m-4 text-center'>new to car doctoes <Link className='text-orange-600 font-bold' to="/signup">Sign Up</Link></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;