import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
    getCountryDetailAsync,
    setGlobalDataAsync,
    setCountryListAsync
} from '../../actions/countryDetail';
import {
    setDailyChartAsync
} from '../../actions/dailyData';
import {
    getCountries
} from '../../actions/country';
import {
    getNewsAsync
} from '../../actions/news';

import {
    Grid,
    Card,
    Avatar,
    CardContent,
    Container,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Typography,
    Table,
    TableContainer,
} from '@material-ui/core';
import MaterialTable from 'mui-datatables';
import {
    Doughnut,
    Line
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

    const [doughnutGlobal, setdoughnutGlobal] = useState({
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

    const columns = [{
        name : "locations",
        label : "Locations"
    }, {
        name : "confirmed",
        label : "Confirmed"
    }, {
        name : "recovered",
        label : "Recovered"
    }, {
        name : "deaths",
        label : "Deaths"
    }, {
        name : "lastUpdate",
        label : "Last Update"
    }];

    const [tabledata, settabledata] = useState([]);

    const [dailydata, setdailydata] = useState({});
    const [dailydatamonth, setdailydatamonth] = useState({});

    useEffect(() => {
        if(props.detail.defaultCountry.lastUpdate !== ""){
            // set doughnut for global 
            setdoughnutGlobal({
                ...doughnutGlobal,
                datasets: [{
                    ...doughnutGlobal.datasets[0],
                    data : [
                        props.detail.global.confirmed.value,
                        props.detail.global.deaths.value,
                        props.detail.global.recovered.value,
                    ]
                }]
            });

            // set doughnut for indonesia only
            setdoughnut({
                ...doughnut,
                datasets: [{
                    ...doughnut.datasets[0],
                    data : [
                        props.detail.defaultCountry.confirmed.value,
                        props.detail.defaultCountry.deaths.value,
                        props.detail.defaultCountry.recovered.value,
                    ]
                }]
            });
            // set label for all time
            let dailyarray = {
                labels : [],
                datasets: []
            };
            let dailyrecovered = [];
            // let dailydeaths = [];
            let dailyconfirmed = [];
            for(let i = (props.daily.data.length - 1); i >= 0; i--){
                dailyarray.labels.push(props.daily.data[i].reportDateString);
                dailyconfirmed.push(props.daily.data[i].totalConfirmed);
                dailyrecovered.push(props.daily.data[i].totalRecovered);
            }
            dailyarray.datasets.push({
                label : "Recovered",
                borderColor : "#15F900",
                backgroundColor: "transparent",
                data : dailyrecovered
            })
            dailyarray.datasets.push({
                label : "Confirmed",
                borderColor: "#F9F400",
                backgroundColor: "transparent",
                pointBackgroundColor : "#F9F400",
                data : dailyconfirmed
            })
            setdailydata(dailyarray);

            // set per month
            let dailymonth = {
                labels : [],
                datasets: []
            };
            let monthrecovered = [];
            // let dailydeaths = [];
            let monthconfirmed = [];
            for(let i = (props.daily.data.length - 1); i >= 0; i--){
                if(((props.daily.data.length - 1) - i) === 30){
                    break;
                }
                dailymonth.labels.unshift(props.daily.data[((props.daily.data.length) - i)].reportDateString);
                monthconfirmed.unshift(props.daily.data[((props.daily.data.length) - i)].totalConfirmed);
                monthrecovered.unshift(props.daily.data[((props.daily.data.length) - i)].totalRecovered);
            }

            dailymonth.datasets.push({
                label : "Recovered",
                borderColor : "#15F900",
                backgroundColor: "transparent",
                data : monthrecovered
            })
            dailymonth.datasets.push({
                label : "Confirmed",
                borderColor: "#F9F400",
                backgroundColor: "transparent",
                pointBackgroundColor : "#F9F400",
                data : monthconfirmed
            })
            setdailydatamonth(dailymonth);

            // set table
            let tableGlobal = [];
            for(let i in props.detail.list){
                let country = props.detail.list;
                tableGlobal.push({
                    locations : `${country[i].countryRegion} ${country[i].provinceState ? country[i].provinceState : ""}`,
                    confirmed : country[i].confirmed,
                    recovered : country[i].recovered,
                    deaths : country[i].deaths,
                    lastUpdate : moment(country[i].lastUpdate).format("DD/MM/YYYY hh:mm:ss")
                });
            }
            settabledata(tableGlobal);
        } else {
            props.setCountry();
            props.getGlobalData();
            props.getCountryDetailById();
            props.setDailyChart();
            props.setCountryList();
            props.getNews();
        }
    }, [props.detail]);

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
        >
            <Grid items xs={12} lg={12} md={12} sm={12} wrap='wrap-reverse'>
                <Card style={{width: "80vw"}}>
                    <CardContent>
                        <Grid container direction="column" alignItems="center">
                                <Grid items>
                                    <h2>Global</h2>
                                </Grid>
                            </Grid>
                            <Doughnut data={doughnutGlobal}/>
                            <Grid items>
                                <Typography>
                                    Last Update = {moment(props.detail.global.lastUpdate).format("DD/MM/YYYY hh:mm:ss")}
                                </Typography>
                            </Grid> 
                    </CardContent>
                    <CardContent>
                        <Grid container direction="column" alignItems="center">
                            <Grid items>
                                <h2>Indonesia</h2>
                            </Grid>
                        </Grid>
                        <Doughnut data={doughnut}/>
                        <Grid items>
                            <Typography>
                                Last Update = {moment(props.detail.defaultCountry.lastUpdate).format("DD/MM/YYYY hh:mm:ss")}
                            </Typography>
                        </Grid>
                    </CardContent>
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid items xs={12} lg={12} md={12} sm={12}>
                            <h4>All Day</h4>
                        </Grid>
                    </Grid>
                    <CardContent>
                        <Line data={dailydata}/>
                    </CardContent>
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid items xs={12} lg={12} md={12} sm={12}>
                            <h4>Per 30 Day</h4>
                        </Grid>
                    </Grid>
                    <CardContent>
                        <Line data={dailydatamonth}/>
                    </CardContent>
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid items xs={12} lg={12} md={12} sm={12}>
                            <h4>Global</h4>
                        </Grid>
                    </Grid>
                    <Container>
                        <TableContainer>
                            <Table>
                                <MaterialTable
                                    columns={columns}
                                    data={tabledata}
                                    options={{
                                        selectableRows: "none",
                                        responsive: "scrollFullHeight"
                                    }}
                                />
                            </Table>
                        </TableContainer>
                    </Container>
                    <Container>
                        <List style={{marginTop: 50}}>
                            {
                                props.news.articles.map((data) => {
                                    return (
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt={data.author} src={data.urlToImage} />
                                            </ListItemAvatar>
                                            <ListItemText
                                            primary={
                                                <a href={data.url}>{data.title}</a>
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    <div>
                                                        {data.content}
                                                    </div>
                                                    <div>
                                                        {moment(data.publishedAt).format("DD/MM/YYYY hh:mm:ss")}
                                                    </div>
                                                </React.Fragment>
                                            }
                                            />
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </Container>
                </Card>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    style={{marginTop: 50, marginBottom: 20}}
                >
                    <Grid items>
                        API From <a href="https://github.com/mathdroid/covid-19-api">Mathdroid/covid-19-api</a>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        detail : state.countryDetail,
        daily : state.daily,
        news : state.news,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCountryDetailById : (id = "ID") => dispatch(getCountryDetailAsync(id)),
        getGlobalData : () => dispatch(setGlobalDataAsync()),
        setDailyChart : () => dispatch(setDailyChartAsync()),
        setCountryList : () => dispatch(setCountryListAsync()),
        setCountry : () => dispatch(getCountries()),
        getNews : () => dispatch(getNewsAsync()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);