import React from 'react';

import doctorImage from '../../../assets/images/doctor.png';
import patientImage from '../../../assets/images/patient.png';
import nurseImage from '../../../assets/images/nurse.png';
import clinicalAdminImage from '../../../assets/images/clinicaladmin.png';
import clinicalCenterAdminImage from '../../../assets/images/clinicalcenteradmin.png';
import Button from '../../UI/Button/Button';
import classes from './UserInfo.module.css';
import './UserInfo.css';

const UserInfo = (props) => {
    let image

    let shiftInfo = null;
    let reviewInfo = null;
    let jmbgInfo = null;
    let clinicInfo = null;
    let clinicalCenterInfo = null;

    if(props.role === 'patient'){
      image = patientImage;
      jmbgInfo = (  <tr><td>JMBG:</td><td>12345</td></tr>);
    }
    else if (props.role === 'doctor') {
      image = doctorImage;
      shiftInfo = (<tr><td>Shift:</td><td>DDDD</td></tr>);
      reviewInfo = (<tr><td>Review:</td><td>EEEE</td></tr>);
    }
    else if (props.role === 'nurse'){
      image = nurseImage;
      shiftInfo = (<tr><td>Shift:</td><td>DDDD</td></tr>);
    }
    else if (props.role === 'adminclinic'){
        image = clinicalAdminImage;
        clinicInfo = (<tr><td>Clinic:</td><td>CCCC</td></tr>);
    }
    
    else if (props.role === 'adminclinicalcenter'){
        image = clinicalCenterAdminImage;
        clinicalCenterInfo = (<tr><td>Clinical Center:</td><td>FFFF</td></tr>);
    }

    return (
                <div class={[classes.UserInfo, classes.Table].join(' ') + " col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad"} >
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h4 class="panel-title">User profile</h4>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-md-4 col-lg-2" align='center' style={{marginTop: '20px'}}>
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
                                            {shiftInfo}
                                            {reviewInfo}
                                            {jmbgInfo}
                                            {clinicInfo}
                                            {clinicalCenterInfo}
                                            <tr>
                                                <td>Email:</td>
                                                <td>info@support.com</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Button style={{margin: '0px 5px'}}>Edit profile</Button>
                                    <Button style={{margin: '0px 5px'}}>Change password</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default UserInfo;
