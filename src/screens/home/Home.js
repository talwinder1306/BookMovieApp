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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import {makeStyles} from "@material-ui/core";

export default function Home() {

    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [releasedMovies, setReleasedMovies] = useState([]);
    const [completeReleasedMovies, setCompleteReleasedMovies] = useState([]);
    const [allGenres, setAllGenres] = useState([]);
    const [allArtists, setAllArtists] = useState([]);
    const [genresSelected, setGenresSelected] = useState([]);
    const [artistsSelected, setArtistsSelected] = useState([]);
    const [filterForm, setFilterForm] = useState({
        moviename: '',
        releaseStartDate: '',
        releaseEndDate: '',

    })

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
            margin: '16px',
            cursor: "pointer",
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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
            width: '86%',
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
                            const {id, title, poster_url, release_date, genres, artists} = m;
                            let d = new Date(release_date);
                            const release_date_formatted = `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
                            const val = {
                                id: id,
                                title: title,
                                poster_url: poster_url,
                                release_date: release_date_formatted,
                                genres: genres,
                                artists: artists
                            };
                            newReleasedMovies.push(val);
                        })
                        setUpcomingMovies(newUpcomingMovies);
                        setReleasedMovies(newReleasedMovies);
                        setCompleteReleasedMovies(newReleasedMovies);
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

                setAllGenres(newGenres);
                console.log(`Genres ${allGenres}`);
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

                        setAllArtists(newArtists);
                        console.log(allArtists);
                    })
            });
    }

    const handleGenreChange = (event) => {
        setGenresSelected(event.target.value);
    };

    const handleArtistChange = (event) => {
        setArtistsSelected(event.target.value);
    };

    const filterInputChangedHandler = (e) => {
        const state = filterForm;
        state[e.target.name] = e.target.value;
        setFilterForm({...state})
    }

    const onFilterApplied = (e) => {
        e.preventDefault();
        let filteredList = completeReleasedMovies;
        if(moviename !== '') {
            filteredList = filteredList.filter(data => data.title.includes(moviename));
        }
        console.log(filteredList);
        if(releaseStartDate !== '' && releaseEndDate !== '') {
            filteredList = filteredList.filter(data => {
                const release = new Date(data.release_date).getTime();
                const start = new Date(releaseStartDate).getTime();
                const end = new Date(releaseEndDate).getTime();
                return release >= start && release <= end
            });
        }
        console.log(genresSelected);
        if(genresSelected.length > 0) {
            filteredList = filteredList.filter(data => {
                console.log(data.genres);
                let result = false;
                for(let i=0; i < data.genres.length; i++) {
                    const d = data.genres[i];
                    if(genresSelected.includes(d)) {
                        result = true;
                        break;
                    }
                }
                console.log(result);
                return result;
            });
        }

        console.log(filteredList);

        console.log(artistsSelected);

        if(artistsSelected.length > 0) {
            filteredList = filteredList.filter(data => {
                console.log(data.artists);
                let result = false;
                for(let i=0; i < data.artists.length; i++) {
                    const d = `${data.artists[i].first_name} ${data.artists[i].last_name}`;
                    if(artistsSelected.includes(d)) {
                        result = true;
                        break;
                    }
                }
                console.log(result);
                return result;
            });
        }

        console.log(filteredList);

        if(moviename === '' && (releaseStartDate === '' || releaseEndDate === '')
            && genresSelected.length === 0 && artistsSelected.length === 0) {
            setReleasedMovies(completeReleasedMovies);
        } else {
            setReleasedMovies(filteredList);
        }
    }
    
    useEffect(() => {
        fetchMoviesList();
        fetchGenres();
        fetchArtists();
    }, []);


    const {moviename, releaseStartDate, releaseEndDate} = filterForm;
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
                            <form className="filter-form" onSubmit={onFilterApplied}>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="movie-name"
                                        label="Movie Name"
                                        name="moviename"
                                        onChange={filterInputChangedHandler}
                                        value={moviename}
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="genres-mutiple-checkbox-label">Genres</InputLabel>
                                    <Select
                                        labelId="genres-mutiple-checkbox-label"
                                        id="genres-mutiple-checkbox"
                                        multiple
                                        value={genresSelected}
                                        onChange={handleGenreChange}
                                        input={<Input />}
                                        renderValue={(selected) => selected.join(', ')}
                                    >
                                        {allGenres.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={genresSelected.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="artists-mutiple-checkbox-label">Artists</InputLabel>
                                    <Select
                                        labelId="artists-mutiple-checkbox-label"
                                        id="artists-mutiple-checkbox"
                                        multiple
                                        value={artistsSelected}
                                        onChange={handleArtistChange}
                                        input={<Input />}
                                        renderValue={(selected) => selected.join(', ')}
                                    >
                                        {allArtists.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={artistsSelected.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="start-date"
                                        label="Release Date Start"
                                        type="date"
                                        defaultValue="dd-mm-yyyy"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        name="releaseStartDate"
                                        onChange={filterInputChangedHandler}
                                        value={releaseStartDate}
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="end-date"
                                        label="Release Date End"
                                        type="date"
                                        defaultValue="dd-mm-yyyy"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        name="releaseEndDate"
                                        onChange={filterInputChangedHandler}
                                        value={releaseEndDate}
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <Button className="applyBtn" name="Apply" variant="contained" color="primary"
                                            type="submit">APPLY</Button>
                                </FormControl>
                            </form>
                        </CardContent>

                    </Card>
                </div>
            </div>
        </Fragment>

    )
}
