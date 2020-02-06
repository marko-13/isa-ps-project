import React, { Component } from 'react';

import classes from './OperationRoomForm.module.css';
import Button from '../../UI/Button/Button';
import axios from '../../../axios';

class OperationRoomForm extends Component {

    state = {
        room: {
            name: '',
            number: ''
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.room !== this.props.room) {
            this.setState({ room: this.props.room });
        }
    }


    changeHandler = event => {
        const room = {
            ...this.state.room,
            [event.target.name]: event.target.value
        }

        console.log(room);

        this.setState({ room: room });
    };

    onCloseHandler = event => {
        event.preventDefault();
        this.props.closeModal();
        this.props.back(false)
    }

    onConfirmHandler = event => {
        event.preventDefault();

        const newRoom = {
            ...this.state.room
        }

        console.log(newRoom);

        if(this.props.header !== undefined){
            axios.post('/operationRoom/save', newRoom)
            .then(res => {
                this.props.pushNewRoom(res.data);
                this.props.back(false)
            })
            .catch(err => console.log(err));
        }else{
            axios.post('/operationRoom/update', newRoom)
            .then(res => {
                this.props.closeModal();
                this.props.replaceRoom(newRoom);
            })
            .catch(err => alert('Unable to update room.\nReason: ' + err.response.data));
        }
        
    }

    render() {
        return (
            <div className={classes.Form}>
                <h3 className={classes.Header}>{this.props.header === undefined ? "Edit room" : this.props.header}</h3>

                <div className={classes.Inputs}>
                    <form>
                        <div className='form-col'>

                            <div className='col'>
                                <input type="text" className="form-control" placeholder="Name" name="name" value={this.state.room.name} onChange={this.changeHandler} required />
                            </div>

                            <div className='col'>
                                <input type="text" className="form-control" placeholder="Number" name="number" value={this.state.room.number} onChange={this.changeHandler} required />
                            </div>

                            <div className={classes.Buttons + ' col'}>
                                <Button type='green' click={this.onConfirmHandler}>Confirm</Button>
                                <Button type='red' click={this.onCloseHandler}>Back</Button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default OperationRoomForm;