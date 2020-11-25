import React, { Component } from 'react';
class ClickCounter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            count :0
         };
    }
    render() { 
        let { count,IncreamentCounter } = this.props;
        return ( 
            <React.Fragment>
                <button className="btn btn-danger" onMouse></button>
            </React.Fragment>
         );
    }
}
 
export default ClickCounter;
