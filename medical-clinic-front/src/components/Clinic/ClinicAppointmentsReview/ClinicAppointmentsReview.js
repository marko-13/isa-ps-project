import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Button from '../../UI/Button/Button';
import classes from './ClinicAppointmentsReview.module.css';
import moment from 'moment';
import axios from '../../../axios';

class ClinicAppointmentsReview extends Component {

    state = {
        appointmments: [],
        totalAppointnts: 0
    }

    onDayHandler = () => {

        const currentDate = moment();
        const beforeDay = moment(currentDate).subtract(1, 'd');

        const interval = {
            startDate: beforeDay,
            endDate: currentDate
        }

        axios.post("/appointment/getAllHeldAndBetweenDates", interval)
            .then(res => {
                console.log(res.data);
                this.countAppointments(res.data, interval, 'day');
            })
            .catch(err => {
                this.setState({ appointmments: [], totalAppointnts: 0 });
                console.log(err);
            });

    }

    onWeekHandler = () => {
        const currentDate = moment();
        const beforeWeek = moment(currentDate).subtract(1, 'week');

        const interval = {
            startDate: beforeWeek,
            endDate: currentDate
        }

        axios.post("/appointment/getAllHeldAndBetweenDates", interval)
            .then(res => this.countAppointments(res.data, interval, 'week'))
            .catch(err => {
                this.setState({ appointmments: [] });
                console.log(err);
            });

    }

    onMonthHandler = () => {
        const currentDate = moment();
        const beforeMonth = moment(currentDate).subtract(1, 'M');

        const interval = {
            startDate: beforeMonth,
            endDate: currentDate
        }

        axios.post("/appointment/getAllHeldAndBetweenDates", interval)
            .then(res => {
                console.log(res.data);
                this.countAppointments(res.data, interval, 'month');
            })
            .catch(err => {
                this.setState({ appointmments: [], totalAppointnts: 0 });
                console.log(err);
            });

    }

    countAppointments = (appointments, interval, type) => {


        let mappedApps = [];

        if (appointments === null || appointments === undefined || appointments.length === 0) {
            return;
        }

        const startDate = interval.startDate; //1581116400000
        const endDate = interval.endDate; //1583622000000

        switch (type) {
            case 'day':
                let oneThirdDay = moment(startDate).add(8, 'hours');
                let secondThirddDay = moment(oneThirdDay).add(8, 'hours');

                let oneThirdDayCount = 0;
                let twoThirdDayCount = 0;
                let endDayCount = 0;

                appointments.forEach(app => {

                    const currentDate = moment(app.date);

                    if (currentDate.isAfter(startDate) && currentDate.isBefore(oneThirdDay)) {
                        oneThirdDayCount++;
                    }

                    if (currentDate.isAfter(oneThirdDay) && currentDate.isBefore(secondThirddDay)) {
                        twoThirdDayCount++;
                    }

                    if (currentDate.isAfter(secondThirddDay) && currentDate.isBefore(endDate)) {
                        endDayCount++;
                    }
                });

                mappedApps = [
                    {
                        count: 0,
                        interval: startDate.format('ddd hh:mm')
                    },
                    {
                        count: oneThirdDayCount,
                        interval: oneThirdDay.format('ddd hh:mm')
                    },
                    {
                        count: twoThirdDayCount,
                        interval: secondThirddDay.format('ddd hh:mm')
                    },
                    {
                        count: endDayCount,
                        interval: 'Now'
                    },

                ];
                this.setState({
                    appointmments: mappedApps,
                    totalAppointnts: oneThirdDayCount + twoThirdDayCount + endDayCount
                });
                break;


            case 'week':
                const secondDay = moment(startDate).add(1, 'days');
                const thirdDay = moment(secondDay).add(1, 'days');
                const fourthDay = moment(thirdDay).add(1, 'days');
                const fifthDay = moment(fourthDay).add(1, 'days');
                const sixthDay = moment(fifthDay).add(1, 'days');

                let day2 = 0;
                let day3 = 0;
                let day4 = 0;
                let day5 = 0;
                let day6 = 0;
                let day7 = 0;

                appointments.forEach(app => {

                    const currentDate = moment(app.date);

                    if (currentDate.isAfter(startDate) && currentDate.isBefore(secondDay)) {
                        day2++;
                    }
                    if (currentDate.isAfter(secondDay) && currentDate.isBefore(thirdDay)) {
                        day3++;
                    }
                    if (currentDate.isAfter(thirdDay) && currentDate.isBefore(fourthDay)) {
                        day4++;
                    }
                    if (currentDate.isAfter(fourthDay) && currentDate.isBefore(fifthDay)) {
                        day5++;
                    }
                    if (currentDate.isAfter(fifthDay) && currentDate.isBefore(sixthDay)) {
                        day6++;
                    }
                    if (currentDate.isAfter(sixthDay) && currentDate.isBefore(endDate)) {
                        day7++;
                    }
                });

                mappedApps = [
                    {
                        count: 0,
                        interval: startDate.format('MM-DD')
                    },
                    {
                        count: day2,
                        interval: secondDay.format('MM-DD')
                    },
                    {
                        count: day3,
                        interval: thirdDay.format('MM-DD')
                    },
                    {
                        count: day4,
                        interval: fourthDay.format('MM-DD')
                    },
                    {
                        count: day5,
                        interval: fifthDay.format('MM-DD')
                    },
                    {
                        count: day6,
                        interval: sixthDay.format('MM-DD')
                    },
                    {
                        count: day7,
                        interval: 'Now'
                    },

                ];
                this.setState({
                    appointmments: mappedApps,
                    totalAppointnts: day2 + day3 + day4 + day5 + day6 + day7
                });
                break;

            case 'month':
                const secondWeek = moment(startDate).add(1, 'w');
                const thirdWeek = moment(secondWeek).add(1, 'w');

                let secondWeekCount = 0;
                let thirdWeekCount = 0;
                let fourthWeekCount = 0;

                appointments.forEach(app => {

                    const currentDate = moment(app.date);

                    if (currentDate.isAfter(startDate) && currentDate.isBefore(secondWeek)) {
                        secondWeekCount++;
                    }

                    if (currentDate.isAfter(secondWeek) && currentDate.isBefore(thirdWeek)) {
                        thirdWeekCount++;
                    }

                    if (currentDate.isAfter(thirdWeek) && currentDate.isBefore(endDate)) {
                        fourthWeekCount++;
                    }
                });

                mappedApps = [
                    {
                        count: 0,
                        interval: startDate.format('YYYY-MM-DD')
                    },
                    {
                        count: secondWeekCount,
                        interval: secondWeek.format('YYYY-MM-DD')
                    },
                    {
                        count: thirdWeekCount,
                        interval: thirdWeek.format('YYYY-MM-DD')
                    },
                    {
                        count: fourthWeekCount,
                        interval: 'Now'
                    },

                ];

                this.setState({
                    appointmments: mappedApps,
                    totalAppointnts: secondWeekCount + thirdWeekCount + fourthWeekCount
                });
                break;

            default:
               
        }

    }


    render() {

        let chart = null;
        console.log(this.state);

        if (this.state.appointmments.length !== 0) {
            if (this.state.totalAppointnts !== 0) {
                chart = (
                    <LineChart width={600} height={300} data={this.state.appointmments} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="count" stroke="#1abc9c" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="interval" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                );
            }
        } else {
            chart = <h2>There are no appointments for this interval</h2>
        }

        return (
            <div className='row'>
                <div className='col-4'>
                    <h4>Appointments held</h4>
                    <div className={classes.Buttons}>
                        <div>
                            <Button click={this.onDayHandler}>Day</Button>
                        </div>
                        <div>
                            <Button click={this.onWeekHandler}>Week</Button>
                        </div>
                        <div>
                            <Button click={this.onMonthHandler}>Month</Button>
                        </div>
                    </div>
                </div>

                <div className='col-8'>
                    {chart}
                </div>

            </div>
        );
    }
}

export default ClinicAppointmentsReview;