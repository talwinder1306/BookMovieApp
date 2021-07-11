import React, {Fragment, useEffect, useState} from 'react';
import Header from "../../common/header/Header";
import './Home.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import {makeStyles} from "@material-ui/core";

export default function Home() {

    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [releasedMovies, setReleasedMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [artists, setArtists] = useState([]);

    const useStyles = makeStyles((theme) => ({
        ugridMain: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        ugridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        utitle: {
            color: theme.palette.primary.light,
        },
        utitleBar: {
            background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
        rgridMain: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        rgridListTile: {
            margin: 16,
            cursor: "pointer"
        },
        card: {
            minWidth: 275,
        },
        cardTitle: {
            fontSize: 14,
            color:theme.palette.primary.light
        },
        cardPos: {
            marginBottom: 12,
        },
    }));

    const classes = useStyles();
    const fetchMoviesList = () => {
        fetch('http://localhost:8085/api/v1/movies?page=1&limit=10')
            .then(response => response.json())
            .then(response => {
                const totalMovieCount = response["total_count"];
                fetch(`http://localhost:8085/api/v1/movies?page=1&limit=${totalMovieCount}`)
                    .then(response => response.json())
                    .then(data => {
                        const upcoming = data["movies"].filter(d => d.status === 'PUBLISHED');
                        const released = data["movies"].filter(d => d.status === 'RELEASED');

                        const newUpcomingMovies = [];
                        upcoming.forEach((m) => {
                            const {id, title, poster_url} = m;
                            const val = {
                                id: id,
                                title: title,
                                poster_url: poster_url
                            };
                            newUpcomingMovies.push(val);
                        })

                        const newReleasedMovies = [];
                        var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
                        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                        released.forEach((m) => {
                            const {id, title, poster_url, release_date} = m;
                            let d = new Date(release_date);
                            const release_date_formatted = `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
                            const val = {
                                id: id,
                                title: title,
                                poster_url: poster_url,
                                release_date: release_date_formatted
                            };
                            newReleasedMovies.push(val);
                        })
                        setUpcomingMovies(newUpcomingMovies);
                        setReleasedMovies(newReleasedMovies);
                        console.log(newReleasedMovies);
                    })
            })
    }

    const fetchGenres = () => {
        fetch('http://localhost:8085/api/v1/genres')
            .then(response => response.json())
            .then(data => {
                const newGenres = [];
                data["genres"].forEach( (g) => {
                        const {genre} = g;
                        newGenres.push(genre);
                    }
                )

                setGenres(newGenres);
                console.log(`Genres ${genres}`);
            });
    }

    const fetchArtists = () => {
        fetch('http://localhost:8085/api/v1/artists?page=1&limit=10')
            .then(response => response.json())
            .then(data => {
                const total = data["total_count"];
                fetch(`http://localhost:8085/api/v1/artists?page=1&limit=${total}`)
                    .then(response => response.json())
                    .then(data => {
                        const newArtists = [];
                        data["artists"].forEach((artist) => {
                            const {first_name, last_name} = artist;
                            const name = `${first_name} ${last_name}`
                            newArtists.push(name);
                        })

                        setArtists(newArtists);
                        console.log(artists);
                    })
            });
    }
    useEffect(() => {
        fetchMoviesList();
        fetchGenres();
        console.log(genres);
        fetchArtists();
        console.log(artists);
    }, []);


    return (
        <Fragment>
            <Header isDetailPage="false" />
            <div className="type-heading">Upcoming Movie</div>
            <div className={classes.ugridMain}>
            <GridList className={classes.ugridList} cols={6} cellHeight="250">
                {
                    upcomingMovies.map(movie =>  (
                            <GridListTile
                                key={movie.poster_url}
                                >
                                <img src={movie.poster_url} alt={movie.title} />
                                <GridListTileBar title={movie.title}></GridListTileBar>
                            </GridListTile>
                        )
                    )
                }
            </GridList>
            </div>
            <div className="released-movie-container">
                <div className="released-movies">
                    <div className={classes.rgridMain}>
                        <GridList className={classes.rgridList} cols={4} cellHeight="350">
                            {
                                releasedMovies.map(movie =>  (
                                        <GridListTile
                                            className={classes.rgridListTile}
                                            key={movie.poster_url}
                                            >
                                            <img src={movie.poster_url} alt={movie.title} />
                                            <GridListTileBar
                                                title={movie.title}
                                                subtitle={<span>Released Date: {movie.release_date}</span>}
                                            ></GridListTileBar>
                                        </GridListTile>
                                    )
                                )
                            }
                        </GridList>
                    </div>
                </div>
                <div className="filter-movies">
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                                FIND MOVIES BY:
                            </Typography>
                            <form className="filter-form">
                                <TextField id="movie-name" label="Movie Name" />
                            </form>
                        </CardContent>

                    </Card>
                </div>
            </div>
        </Fragment>

    )
}
