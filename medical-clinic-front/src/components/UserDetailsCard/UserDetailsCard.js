import React from 'react';
import Button from '../UI/Button/Button';
import doctorImage from '../../assets/images/doctor.png';
import patientImage from '../../assets/images/patient.png';
import nurseImage from '../../assets/images/nurse.png';
import clinicalAdminImage from '../../assets/images/clinicaladmin.png';
import clinicalCenterAdminImage from '../../assets/images/clinicalcenteradmin.png';

import classes from './UserDetailsCard.module.css';

const UserDetailsCard = (props) => {

    let userFields = null;

    userFields = Object.keys(props.user).map(key => {
        if (props.user[key] !== undefined) {
            return (
                <tr key={key}>
                    <td className={classes.Capitalize}>{key}:</td>
                    <td>{props.user[key]}</td>
                </tr>
            );
        }
    });

    let img = null;

    switch(props.user.role){
        case 'patient': img = patientImage;
        break;
        case 'doctor': img = doctorImage;
        break;
        case 'nurse': img = nurseImage;
        break;
        case 'adminclinic': img = clinicalAdminImage;
        break;
        case 'adminclinicalcenter': img = clinicalCenterAdminImage;
        break;

        default:
    }

    return (
        <div className='container'>
            <div className='row' style={{ margin: '0 5px' }}>
                <div class={[classes.UserInfo, classes.Table].join(' ') + "col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad"} >
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h4 class="panel-title">My profile</h4>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-md-4 col-lg-2" align='center' style={{ marginTop: '20px' }}>
                                    <img alt="User Pic" src={img} class="img-circle img-responsive" />
                                </div>
                                <div class=" col-md-9 col-lg-9 ">
                                    <table class="table table-user-information">
                                        <tbody>
                                            {userFields}
                                        </tbody>
                                    </table>
                                    <Button style={{ margin: '0px 5px' }}>Edit account</Button>
                                    <Button style={{ margin: '0px 5px' }}>Change password</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsCard;