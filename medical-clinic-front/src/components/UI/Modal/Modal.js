import React, {Component} from 'react';

import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return(
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div 
                    className={classes.Modal} 
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                        width: this.props.largeWidth ? '60%' : '500px',
                        left: this.props.largeWidth ? '20%' : 'left: calc(50% - 250px)',
                        maxHeight: this.props.largeWidth ? '80%' : '',
                        top: this.props.largeWidth ? '10%' : '30%'
                }}>
                    {this.props.children}
                </div>     
            </Auxiliary>
        );
    }
 }

export default Modal;