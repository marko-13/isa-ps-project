import React, { Component } from 'react';

import classes from './OperationRoomForm.module.css';
import Button from '../../UI/Button/Button';
import axios from '../../../axios';

class OperationRoomForm extends Component {

    state = {
        room: null
    }


    static getDerivedStateFromProps(props, state) {
        if (props.room !== null) {
            const newState = {
                room: {
                    ...props.room
                },
                newRoom: false
            }
            return newState
        }

        const initialState = {
            room: {
                name: '',
                number: '',

            },
            newRoom: true
        }
        return initialState;
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onCloseHandler = event => {
        event.preventDefault();
        this.props.closeModal();
    }

    onConfirmHandler = event => {
        event.preventDefault();

        const newRoom = {
            ...this.state.room
        }

        if(this.state.newRoom){
            //axios za novu sobu
        }else{
            //axios za update postojece sobe
        }
    }

    render() {
        return (
            <div className={classes.Form}>
                <h3 className={classes.Header}>Edit room</h3>

                <div className={classes.Inputs}>
                    <form>
                        <div className='form-col'>

                            <div className='col'>
                                <input type="text" className="form-control" placeholder="Name" name="name" value={this.state.room.name} onChange={this.changeHandler} required />
                            </div>

                            <div className='col'>
                                <input type="text" className="form-control" placeholder="Address" name="number" value={this.state.room.number} onChange={this.changeHandler} required />
                            </div>

                            <div className={classes.Buttons + ' col'}>
                                <Button type='green' click={this.onConfirmHandler}>Confirm</Button>
                                <Button type='red' click={this.onCloseHandler}>Close</Button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default OperationRoomForm;