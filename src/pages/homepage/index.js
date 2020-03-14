import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
    getCountryDetailAsync
} from '../../actions/countryDetail';
import {
    Grid,
    Card,
    CardContent,
    Typography
} from '@material-ui/core';
import {
    Doughnut
} from "react-chartjs-2";
import moment from 'moment';

const Homepage = (props) => {
    const [doughnut, setdoughnut] = useState({
        labels: [
            'Confirmed',
            'Deaths',
            'Recovered',
        ],
        datasets: [{
            data: [0,0,0],
            backgroundColor: [
                '#FFCE56',
                '#FA2D58',
                '#15F900',
            ],
            hoverBackgroundColor: [
                '#FFCE56',
                '#FF6384',
                '#36A2EB',
            ]
        }]
    });

    useEffect(() => {
        console.log(props.detail);
        console.log(props.detail.confirmed === {});
        if(props.detail.lastUpdate !== ""){
            console.log("Tests");
            setdoughnut({
                ...doughnut,
                datasets: [{
                    ...doughnut.datasets[0],
                    data : [
                        props.detail.confirmed.value,
                        props.detail.deaths.value,
                        props.detail.recovered.value,
                    ]
                }]
            });
        } else {
            props.getCountryDetailById();
        }
    }, [props.detail]);

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
        >
            <Grid items>
                <h2>Indonesia</h2>
            </Grid>
            <Grid items xs={12} lg={12} md={12} sm={12} wrap='wrap-reverse'>
                <Card style={{width: "60vw"}}>
                    <CardContent>
                        <Doughnut data={doughnut}/>
                        <Grid items>
                            <Typography>
                                Last Update = {moment(props.detail.lastUpdate).format("DD/MM/YYYY hh:mm:ss")}
                            </Typography>
                        </Grid>
                    </CardContent>
                </Card>
                
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        detail : state.countryDetail
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCountryDetailById : (id = "ID") => dispatch(getCountryDetailAsync(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);