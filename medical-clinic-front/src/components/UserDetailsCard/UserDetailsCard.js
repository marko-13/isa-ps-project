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
                <div className={[classes.UserInfo, classes.Table].join(' ') + "col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad"} >
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h4 className="panel-title">My profile</h4>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-4 col-lg-2" align='center' style={{ marginTop: '20px' }}>
                                    <img alt="User Pic" src={img} className="img-circle img-responsive" />
                                </div>
                                <div className=" col-md-9 col-lg-9 ">
                                    <table className="table table-user-information">
                                        <tbody>
                                            {userFields}
                                        </tbody>
                                    </table>
                                    <Button style={{ margin: '0px 5px' }} click={props.showDataModal}>Edit account</Button>
                                    <Button style={{ margin: '0px 5px' }} click={props.showPasswordModal}>Change password</Button>
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