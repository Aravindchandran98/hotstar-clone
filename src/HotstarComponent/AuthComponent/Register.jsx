import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import firebase from "../../firebase";
import { toast } from 'react-toastify';
import "./Auth-Styles.css";
import md5 from "md5";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: '',
            email: '',
            phone:'',
         }
    }
    handleChange =(e)=>{ 
        this.setState({ [e.target.name]:e.target.value });
     };
    handleSubmit = async (e)=>{ 
         try{ 
           let{ username,password,email } = this.state;
           e.preventDefault();

           //connecting firebasee auth provider
           let userData = await firebase.auth().createUserWithEmailAndPassword(email,password);
           console.log(userData);
           userData.user.sendEmailVerification();//firebase
           let message = `A verfication mail sent to ${ email } please verify `;
           toast.success(message); 
           //update profile including user photo ,phone number,id,whattever
           await userData.user.updateProfile({
             displayName:username,
             photoURL:`https://www.gravatar.com/avatar/${md5(
               userData.user.email
             )}?d=identicon`,
            //  phoneNumber:phone,
           });
           console.log(userData);
           //store user Information in RealTime Database
           //1 : should have to config real time firebase database

           //connect firebase realtime database
           await firebase.database().ref().child("/users"+userData.user.uid).set({ 
             email:userData.user.email,
             displayName:userData.user.displayName,
             photoURL:userData.user.photoURL,
             uid:userData.user.uid, 
             RegistrationData: new Date().toString(),
             
            });
           console.log({ username,password,email }); 
          //  toast.success("Successfully user created...");        
           this.setState({ 
               username: "",
               password: "",
               email: "",
               phone:"",
            });
          }catch(err){ 
            console.error(err); 
            toast.error(err.message);  
           }
      }
     
    render() { 
        let { username,password,email,phone }= this.state;
        return ( 
            <Fragment>
            <section className="authBlock">
                <section className="card col-md-3 mx-auto">
          <article className="form-block">
            <h5 className="h5 font-weight-bold p-4">Register</h5>
            <div className="card-body">
              <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="enter username"
                    value={ username }
                    onChange={ this.handleChange }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="enter email"
                    value={ email }
                    onChange={ this.handleChange }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="enter password"
                    value={ password }
                    onChange={ this.handleChange }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phonenumber</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    placeholder="enter phonenumber"
                    value={ phone }
                    onChange={ this.handleChange }
                    required
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-block btn-primary">Register</button>
                </div>
                <div className="form-group">
                    <span>Already have an account please
                        <Link to="/login" className="login-link float-right">Login</Link>
                    </span>
                </div>
              </form>
            </div>
          </article>
        </section>
        </section>
            </Fragment>
         );
    }
}
 
export default Register;