import React, { Component, Fragment } from 'react';
import HeaderComponent from './HotstarComponent/HeaderComponent/Header';
import { Route,Switch,Link,withRouter } from 'react-router-dom';
import Login from './HotstarComponent/AuthComponent/Login';
import Register from './HotstarComponent/AuthComponent/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from './firebase';
import PasswordReset from './HotstarComponent/AuthComponent/PasswordReset';
import AddMovieForm from './HotstarComponent/HotStarAdmin/AddMovieForm';
import ListMovies from './HotstarComponent/HotStarAdmin/ListMovies';
import ListMovie from './HotstarComponent/HotStarAdmin/ListMovie';
import PhoneAuth from './HotstarComponent/AuthComponent/PhoneAuth';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userData: "",
         }
    }
    async componentDidMount(){
        await firebase.auth().onAuthStateChanged((user)=>{
            // if (user === null) {
            //     console.log("no user");
            // }
            if (user) {
                this.setState({userData: user});
                this.props.history.push("/");
            } else{
                this.setState({userData:""});
                this.props.history.push("/login");
            }
        })
    }
    render() { 
        console.log(this.props);
        return ( 
            <Fragment>
                <header>
                    <HeaderComponent user={this.state.userData}/>
                </header>
                <main>
                    <ToastContainer/>
                    <Switch>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/register" exact component={ Register }/>
                        <Route path="/password-reset" exact component={ PasswordReset }/>
                        <Route path="/phone-auth" component={ PhoneAuth }/>
                        {/* //react expression */}
                        {
                            this.state.userData ? (
                            <Fragment>
                                <Route 
                                path="/upload-movies" 
                                exact 
                                component={()=>
                                    <AddMovieForm user={this.state.userData}/>
                            }/>
                            <Route path="/list-movies" exact component={() => <ListMovies user={this.state.userData}/>}/>
                            <Route path="/list-movie/:name/:id"  component={()=><ListMovie user={this.state.userData}/>}/>
                            </Fragment>
                            ) : null  
                        }
                    </Switch>
                </main>
            </Fragment>
         );
    }
}
 
export default withRouter(App);
