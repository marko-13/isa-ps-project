import React, { Component } from 'react';

import classes from './NewDoctor.module.css';
import Button from '../../UI/Button/Button';

class NewDoctor extends Component {
    render() {
        return (
            <div className={classes.Form}>
                <h2>Add new doctor</h2>

                <div className={classes.Inputs}>
                    <form>
                        <div className='form-row'>

                            <div className='col'>
                                <input type="text" class="form-control" placeholder="First name" />
                            </div>

                            <div className='col'>
                                <input type="text" class="form-control" placeholder="Last name" />
                            </div>

                            <div className='col'>
                                <input type="text" class="form-control" placeholder="Email" />
                            </div>

                        </div>

                        <div className='form-row'>

                            <div className='col'>
                                <input type="text" class="form-control" placeholder="City" />
                            </div>

                            <div className='col'>
                                <input type="text" class="form-control" placeholder="Address" />
                            </div>

                            <div className='col'>
                                <input type="text" class="form-control" placeholder="State" />
                            </div>

                        </div>

                        <div className='form-row'>

                            <div className='col-4'>
                                <input type="text" class="form-control" placeholder="Mobile" />
                            </div>

                            <div className='col-4'>
                                <input type="text" class="form-control" placeholder="Shift" />
                            </div>

                        </div>

                        <div className={classes.Buttons + ' row'}>
                            <Button type='green'>Add</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewDoctor;