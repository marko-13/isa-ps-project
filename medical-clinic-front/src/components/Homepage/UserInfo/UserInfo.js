import React from 'react';

import doctorImage from '../../../assets/images/doctor.png';
import patientImage from '../../../assets/images/patient.png';
import nurseImage from '../../../assets/images/nurse.png';
import clinicalAdminImage from '../../../assets/images/clinicaladmin.png';
import clinicalCenterAdminImage from '../../../assets/images/clinicalcenteradmin.png';
import classes from './UserInfo.module.css';
import './UserInfo.css';

const UserInfo = (props) => {   
    let image = null;

    if(props.role === 'patient'){
      image = patientImage;
    }
    else if (props.role === 'doctor') {
      image = doctorImage;
    }
    else if (props.role === 'nurse'){
      image = nurseImage;
    }
    else if (props.role === 'adminclinic'){
        image = clinicalAdminImage;
    }
    else if (props.role === 'adminclinicalcenter'){
        image = clinicalCenterAdminImage;
    }
//col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad
    return (
                <div className={[classes.UserInfo, classes.Table, props.full === undefined ? ' col-4' : ' col-7'].join(' ')}>
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h4 className="panel-title">User profile</h4>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-4 col-lg-2" align='center' style={{marginTop: '20px'}}>
                                    <img alt="User Pic" src={image} className="img-circle img-responsive" hidden={image === null}/>
                                </div>
                                <div className=" col-md-9 col-lg-9 ">
                                    <table className="table table-user-information">
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
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default UserInfo;
