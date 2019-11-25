import React from 'react';

import doctorImage from '../../../assets/images/doctor.png';
import Button from '../../UI/Button/Button';
import classes from './UserInfo.module.css';
import './UserInfo.css';

const UserInfo = () => {
    return (
                <div class={classes.UserInfo + " col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad"} >
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h4 class="panel-title">User profile</h4>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-md-4 col-lg-2" align='center'>
                                    <img alt="User Pic" src={doctorImage} class="img-circle img-responsive"/>
                                </div>
                                <div class=" col-md-9 col-lg-9 ">
                                    <table class="table table-user-information">
                                        <tbody>
                                            <tr>
                                                <td>Role:</td>
                                                <td>AAAA</td>
                                            </tr>
                                            <tr>
                                                <td>Name:</td>
                                                <td>BBBB</td>
                                            </tr>
                                            <tr>
                                                <td>Lastname:</td>
                                                <td>CCCC</td>
                                            </tr>

                                            <tr>
                                                <td>Clinic:</td>
                                                <td>CCCC</td>
                                            </tr>

                                            <tr>
                                                <td>Shift</td>
                                                <td>DDDD</td>
                                            </tr>
                                            <tr>
                                                <td>Review</td>
                                                <td>EEEE</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>info@support.com</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Button>Edit profile</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default UserInfo;