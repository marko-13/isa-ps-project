import React from 'react';
import Button from '../UI/Button/Button';

import classes from './UserDetailsCard.module.css';

const UserDetailsCard = () => {
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
                                    <img alt="User Pic" src={''} class="img-circle img-responsive" />
                                </div>
                                <div class=" col-md-9 col-lg-9 ">
                                    <table class="table table-user-information">
                                        <tbody>
                                            <tr>
                                                <td>Role:</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Name:</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Lastname:</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Button style={{margin: '0px 5px'}}>Edit account</Button>
                                    <Button style={{margin: '0px 5px'}}>Change password</Button>
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