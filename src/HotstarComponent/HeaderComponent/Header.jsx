import React, { Component, Fragment } from 'react'
import "./HeaderStyles.css";
import { Link,withRouter } from "react-router-dom";
import firebase from "../../firebase";
import { toast } from "react-toastify";
class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          user: "",
         }
    }
    signOut=()=>{
       firebase.auth().signOut().then( _ =>{
         toast.success("successfully user signout");
         this.props.history.push("/login");
       })
       .catch(err => toast.error(err.message))
    }

    render() {
      let {photoURL,displayName,email}=this.props.user;

      let AnonymousUser=()=>{
        return(
          <Fragment>
            <li className="nav-item">
              <Link className="nav-link text-uppercase" to="/login">
                login
              </Link>
            </li>
          </Fragment>
        )
      }; 
      let AuthUser=()=>{
        return(
          <Fragment>
            <li className="nav-item profile_block">
              <a className="nav-link text-uppercase">
                <img src={photoURL} alt={displayName}/>
              </a>
              <ul className="dropdownMenu">
                <li><a href="/">Watchlist</a></li>
                <li><a href="/">{displayName}</a></li>
                <li className="nav-item">
                  <Link className="nav-link text-uppercase" to="/upload-movies">
                    Upload Movies
                  </Link>
                </li>
                <li><a href="/login" onClick={this.signOut}>signout</a></li>
              </ul>
            </li>
          </Fragment>
        ) 
      }
        return ( 
    <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <span className="bar-icon">
             <i className="fad fa-bars"></i>
         </span>           
        <a className="navbar-brand" href="/">
            <img src="/disney-hotstar-logo-dark.svg" alt="logo" />
        </a>
        <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">TV</a>
            </li>
            <li className="nav-item">
              <Link to="/list-movies" className="nav-link">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Sports</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">News</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Premium</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disney-block" href="/">
                  <div>Disney+</div>
                  <div>new</div>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link kids-block" href="/"></a>
            </li>
           </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <input type="text"
                    className="form-control"
                    placeholder="search"/>
                    </li>
                    <span style={{ position:"relative" }}>
                        <i className="fas fa-search" style={{ 
                            position:"absolute" ,
                            top:"19px",
                            right:"8px",
                            fontSize:"16px",
                            color:"rgb(119 119 119)",
                    }}></i>
                    </span>
                    <li className="nav-item">
                        <a href="/" className="nav-link subscribe-block">
                            subscribe
                        </a>
                    </li>
                    {this.props.user.emailVerified || 
                    this.props.user.isAnonymous === false ? 
                    ( <AuthUser/>)
                    : ( <AnonymousUser/>) }
            </ul>
        </div>
      </nav>
    </Fragment>
         );
    }
}
 
export default withRouter(HeaderComponent);