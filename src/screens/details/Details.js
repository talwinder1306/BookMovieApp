import React, {Fragment, useEffect, useState} from 'react';
import './Details.css';
import Typography from "@material-ui/core/Typography";
import Header from "../../common/header/Header";
import { makeStyles } from '@material-ui/core/styles';
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridList from "@material-ui/core/GridList";
import { Link, useLocation, Redirect } from 'react-router-dom';

export default function Details(props) {
    const location = useLocation();
    const [movieDetails, setMovieDetails] = useState({
        id: '',
        title: '',
        poster_url: '',
        trailer_url: '',
        genres: [],
        duration: '',
        release_date: '',
        rating: '',
        wiki_url: '',
        storyline: '',
        artists: []
    });
    const[stars, setStars] = useState([false,false,false,false,false]);

    const fetchMovie = () => {
        const movieId = location.movieId;
        fetch(`http://localhost:8085/api/v1/movies/${movieId}`)
            .then(response => response.json())
            .then(data => {
                const {id, title, poster_url, trailer_url, genres, duration,release_date, rating, wiki_url, storyline, artists} = data;
                const movie = {
                    id: id,
                    title: title,
                    poster_url: poster_url,
                    trailer_url: trailer_url,
                    genres: genres,
                    duration: duration,
                    release_date: release_date,
                    rating: rating,
                    wiki_url: wiki_url,
                    storyline: storyline,
                    artists: artists,
                }

                setMovieDetails(movie);
                console.log(`Movie ${movie}`);
            });
    }

    useEffect(() => {
        fetchMovie();
    }, []);

    const useStyles = makeStyles((theme) => ({
        boldText: {
            fontWeight: "bold",
        },
        sectionSpace: {
            marginTop: 16
        },
        gridMain: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        }
    }));

    const classes = useStyles();

    const opts = {
        height: '390',
        width: '95%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const onRatingClick = (e) => {
        const id = e.target.id;
        const n = id.substring(5);
        const star = [];
        for(let i=0; i < 5; i++) {
            if(i <= n) {
                star[i] = true;
            } else {
                star[i] = false;
            }
        }

        setStars(star);
    }

    const videoId = movieDetails !== undefined && movieDetails.trailer_url !== undefined?
        movieDetails.trailer_url.slice(movieDetails.trailer_url.indexOf('?v=') + 3, movieDetails.trailer_url.length) : '';
    const numberOfStars = 5;

    return (
        <Fragment>
            {location.movieId === undefined || location.movieId === ''? <Redirect to="/" /> : ''}
            <Header isDetailPage="true" />
            <Link to="/">
                <Typography id="backToHomeBtn" variant="button" display="block" gutterBottom>
                    {'<'} Back to Home
                </Typography>
            </Link>
            <div className="details-container">
                <div className="left-col">
                        <img src={movieDetails.poster_url} alt={movieDetails.title} />
                </div>
                <div className="middle-col">
                    <Typography variant="h4" component="h2" gutterBottom>
                        {movieDetails.title}
                    </Typography>
                    <Typography>
                       <span className={classes.boldText}>Genres: </span> {movieDetails.genres.join(', ')}
                    </Typography>
                    <Typography>
                        <span className={classes.boldText}>Duration: </span> {movieDetails.duration}
                    </Typography>
                    <Typography>
                        <span className={classes.boldText}>Release Date: </span> {new Date(movieDetails.release_date).toDateString()}
                    </Typography>
                    <Typography>
                        <span className={classes.boldText}>Rating: </span> {movieDetails.rating}
                    </Typography>
                    <Typography className={classes.sectionSpace}>
                        <span className={classes.boldText}>Plot: </span>
                        (<a href={movieDetails.wiki_url} target="_blank" rel="noopener noreferrer" >Wiki Link</a>) {movieDetails.storyline}
                    </Typography>

                    <Typography className={classes.sectionSpace}>
                        <span className={classes.boldText}>Trailer: </span>
                    </Typography>
                    <div className="video-container">
                        <YouTube
                            videoId={videoId}
                            opts={opts}/>
                    </div>

                </div>
                <div className="right-col">
                    <Typography className={classes.boldText}>
                        Rate this movie:
                    </Typography>
                    <div className="star-container">
                        {[...Array(+numberOfStars).keys()].map(n => {
                            return (
                                <StarBorderIcon
                                    key={`star-${n}`}
                                    id={`star-${n}`}
                                    onClick={onRatingClick}
                                    className={stars[n] === true ? 'star-selected': 'star-icon'}
                                ></StarBorderIcon>
                            );
                        })}
                    </div>
                    <Typography className={`${classes.boldText} ${classes.sectionSpace}`}   >
                        Artists:
                    </Typography>

                    <GridList className={classes.gridMain} cols={2} cellHeight="250">
                        {
                            movieDetails.artists.map(artist =>  (
                                    <GridListTile
                                        key={artist.id}
                                    >
                                        <img src={artist.profile_url} alt={artist.first_name} />
                                        <GridListTileBar title={`${artist.first_name} ${artist.last_name}`}></GridListTileBar>
                                    </GridListTile>
                                )
                            )
                        }
                    </GridList>
                </div>
            </div>
        </Fragment>

    )
}
