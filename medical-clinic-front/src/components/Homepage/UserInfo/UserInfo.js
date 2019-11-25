import React from 'react';

import doctorImage from '../../../assets/images/doctor.png';
import patientImage from '../../../assets/images/patient.png';
import nurseImage from '../../../assets/images/nurse.png';
import Button from '../../UI/Button/Button';
import classes from './UserInfo.module.css';
import './UserInfo.css';

const UserInfo = (props) => {
    let image
    let userInfoFields
    let userInfoFields2 = ''
    let userInfoFields3 = ''
    if(props.role === 'patient'){
      image = patientImage;
      userInfoFields = (  <tr><td>JMBG:</td><td>12345</td></tr>)
    }
    else if (props.role === 'doctor') {
      image = doctorImage
      userInfoFields = (<tr><td>Clinic:</td><td>CCCC</td></tr>)
      userInfoFields2 = (<tr><td>Shift</td><td>DDDD</td></tr>)
      userInfoFields3 = (<tr><td>Review</td><td>EEEE</td></tr>)
    }
    else if (props.role == 'nurse') {
      image = nurseImage
      userInfoFields = (<tr><td>Clinic:</td><td>CCCC</td></tr>)
      userInfoFields2 = (<tr><td>Shift</td><td>DDDD</td></tr>)
      userInfoFields3 = (<tr><td>Review</td><td>EEEE</td></tr>)
    }

    return (
                <div class={classes.UserInfo + " col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad"} >
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h4 class="panel-title">User profile</h4>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-md-4 col-lg-2" align='center'>
                                    <img alt="User Pic" src={image} class="img-circle img-responsive"/>
                                </div>
                                <div class=" col-md-9 col-lg-9 ">
                                    <table class="table table-user-information">
                                        <tbody>
                                            <tr>
                                                <td>Role:</td>
                                                <td>{props.role}</td>
                                            </tr>
                                            <tr>
                                                <td>Name:</td>
                                                <td>{props.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Lastname:</td>
                                                <td>{props.lastname}</td>
                                            </tr>
                                            {userInfoFields}
                                            {userInfoFields2}
                                            {userInfoFields3}
                                            <tr>
                                                <td>Email</td>
                                                <td>info@support.com</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Button>Edit profile</Button>
                                    <Button>Change password</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default UserInfo;
