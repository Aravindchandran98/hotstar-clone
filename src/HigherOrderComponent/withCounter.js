import React from 'react';
import faker from "faker/locale/en_IND";

const withCounter = (WrappedComponent) => {
 class Counter extends Component {
     constructor(props) {
         super(props);
         this.state = { 
             count:0,
             text:null,
          }
     }

     increamentCounter=()=>{
       this.setState((prevState)=>{
           return{count:prevState.count+1 , text:faker.name.findName()};
       })
     }
     render() { 
         return ( 
             <WrappedComponent
             count={this.state.count}
             IncreamentCounter={this.increamentCounter}
             />
          );
     }
 }
}

export default withCounter;