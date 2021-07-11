import React, {Fragment} from 'react';
import './Details.css';
import Typography from "@material-ui/core/Typography";
import Header from "../../common/header/Header";
import { makeStyles } from '@material-ui/core/styles';
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridList from "@material-ui/core/GridList";

export default function Details() {

    const props = {
        "id": "52974be0-a235-11e8-9077-720006ceb890",
        "title": "Inception",
        "storyline": "A thief, who steals corporate secrets through the use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.",
        "genres": [
            "Action",
            "Adventure",
            "Scifi"
        ],
        "duration": 148,
        "poster_url": "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
        "trailer_url": "https://www.youtube.com/watch?v=8hP9D6kZseM",
        "wiki_url": "https://en.wikipedia.org/wiki/Inception",
        "release_date": "2010-07-16",
        "censor_board_rating": "UA",
        "rating": 8.8,
        "status": "RELEASED",
        "artists": [
            {
                "id": "24614e76-a238-11e8-9077-720006ceb890",
                "first_name": "Leonardo",
                "last_name": "DiCaprio",
                "role_type": "ACTOR",
                "profile_description": "Leonardo Wilhelm DiCaprio is an American actor and film producer. DiCaprio began his career by appearing in television commercials in the late 1980s. He next had recurring roles in various television series, such as the soap opera Santa Barbara and the sitcom Growing Pains. DiCaprios portrayals of Howard Hughes in The Aviator (2004) and Hugh Glass in The Revenant won him the Golden Globe Award for Best Actor – Motion Picture Drama. His performance as Jordan Belfort in The Wolf of Wall Street won him the Golden Globe award for Best Actor – Motion Picture Musical or Comedy. He also won the Academy Award for Best Actor and BAFTA Award for his performance in The Revenant. DiCaprio is the founder of his own production company, Appian Way Productions.",
                "profile_url": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Leonardo_DiCaprio_visited_Goddard_Saturday_to_discuss_Earth_science_with_Piers_Sellers_%2826105091624%29_cropped.jpg",
                "wiki_url": "https://en.wikipedia.org/wiki/Leonardo_DiCaprio"
            },
            {
                "id": "24615498-a238-11e8-9077-720006ceb890",
                "first_name": "Joseph",
                "last_name": "Gordon-Levitt",
                "role_type": "ACTOR",
                "profile_description": "Joseph Leonard Gordon-Levitt is an American actor, filmmaker, singer, and entrepreneur. As a child, Gordon-Levitt appeared in many films and TV series. He took a break from acting to study at Columbia University, but dropped out in 2004 to pursue acting again. He has since starred in  films like (500) Days of Summer, Inception, The Dark Knight Rises, G.I. Joe: The Rise of Cobra and others. For his leading performances in (500) Days of Summer and 50/50, he was nominated for the Golden Globe Award for Best Actor – Motion Picture Musical or Comedy.",
                "profile_url": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Joseph_Gordon-Levitt_2013.jpg",
                "wiki_url": "https://en.wikipedia.org/wiki/Joseph_Gordon-Levitt"
            }
        ]
    }

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
        e.target.style.color = 'yellow';
    }

    const videoId = props.trailer_url.slice(props.trailer_url.indexOf('?v=') + 3, props.trailer_url.length);
    console.log(videoId);

    return (
        <Fragment>
            <Header isDetailPage="true" />
            <Typography id="backToHomeBtn" variant="button" display="block" gutterBottom>
                {'<'} Back to Home
            </Typography>
            <div className="details-container">
                <div className="left-col">
                    <img src={props.poster_url} alt={props.title} />
                </div>
                <div className="middle-col">
                    <Typography variant="h4" component="h2" gutterBottom>
                        {props.title}
                    </Typography>
                    <Typography>
                       <span className={classes.boldText}>Genres: </span> {props.genres.join(', ')}
                    </Typography>
                    <Typography>
                        <span className={classes.boldText}>Duration: </span> {props.duration}
                    </Typography>
                    <Typography>
                        <span className={classes.boldText}>Release Date: </span> {new Date(props.release_date).toDateString()}
                    </Typography>
                    <Typography>
                        <span className={classes.boldText}>Rating: </span> {props.rating}
                    </Typography>
                    <Typography className={classes.sectionSpace}>
                        <span className={classes.boldText}>Plot: </span>
                        (<a href={props.wiki_url} target="_blank" rel="noopener noreferrer" >Wiki Link</a>) {props.storyline}
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
                        <StarBorderIcon className="star-icon" onClick={onRatingClick}></StarBorderIcon>
                        <StarBorderIcon className="star-icon" onClick={onRatingClick}></StarBorderIcon>
                        <StarBorderIcon className="star-icon" onClick={onRatingClick}></StarBorderIcon>
                        <StarBorderIcon className="star-icon" onClick={onRatingClick}></StarBorderIcon>
                        <StarBorderIcon className="star-icon" onClick={onRatingClick}></StarBorderIcon>
                    </div>

                    <Typography className={`${classes.boldText} ${classes.sectionSpace}`}   >
                        Artists:
                    </Typography>

                    <GridList className={classes.gridMain} cols={2} cellHeight="250">
                        {
                            props.artists.map(artist =>  (
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
