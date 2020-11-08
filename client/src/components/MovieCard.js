import React, { useContext } from 'react';

// import bootstrap-react components
import { Accordion, AccordionContext, Button, Card, ResponsiveEmbed, Row, Col } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import { MdChevronRight, MdChevronLeft, MdFavoriteBorder, MdClose } from "react-icons/md";


// import utils
import Auth from '../utils/auth';
import { useFantinderContext } from "../utils/GlobalState";

const MovieCard = (props) => {
    const [state, ] = useFantinderContext();
    const { likedMovies, dislikedMovies } = state;
    const {
        movie,
        displayTrailer,
        likeMovieHandler,
        dislikeMovieHandler,
        displaySkip,
        nextMovieHandler,
        prevMovieHandler
    } = props;

    function ContextAwareToggle({ eventKey, callback }) {
        const currentEventKey = useContext(AccordionContext);
    
        const decoratedOnClick = useAccordionToggle(
            eventKey,
            () => callback && callback(eventKey),
        );
    
        const isCurrentEventKey = currentEventKey === eventKey;
      
        return (
            <Button
                variant="link"
                className={`link ${isCurrentEventKey ? 'text-muted' : '' }`}
                onClick={decoratedOnClick}
            >
                {isCurrentEventKey
                ?   <span className="small">Collapse <i className="pl-1 fas fa-chevron-up"></i></span>
                :   <span className="small">Click for details <i className="pl-1 fas fa-chevron-down"></i></span>
                }
            </Button>
        );
    }

    function displayLikedUsers(likedUsers) {
        if (!likedUsers.length) {
            return null
        }

        // get the usernames
        const otherUsers = likedUsers.filter(user => user._id !== state.currentUser);
        const usernames = otherUsers.filter(user => user.username !== undefined).map(user => user.username);

        // format the liked users for the card
        switch (true) {
            case (otherUsers.length === 0):
                return (
                    <Card.Text className='small'>
                        No other users have liked this movie!
                    </Card.Text>
                )
            case (otherUsers.length === 1):
                return (
                    <Card.Text className='small'>
                        {usernames[0]} {otherUsers.length < likedUsers.length ? 'also' : null } liked this movie
                    </Card.Text>
                )
            case (otherUsers.length === 2):
                return (
                    <Card.Text className='small'>
                        {usernames[0]} and {usernames[1]} {otherUsers.length < likedUsers.length ? 'also' : null } liked this movie
                    </Card.Text>
                )
            case (otherUsers.length > 2):
                const otherLength = otherUsers.length - 2;
                return (
                    <Card.Text className='small'>
                        {usernames[0]}, {usernames[1]}, and {otherLength} other {otherLength === 1 ? 'user' : 'users'} {otherUsers.length < likedUsers.length ? 'also' : null } liked this movie
                    </Card.Text>
                )
            default:
                return null
        }
    }

    return (
        movie
        ?   <Accordion>
            <Card>
                {displayTrailer && movie.trailer
                    ? <ResponsiveEmbed aspectRatio="16by9">
                        <iframe
                            title={movie._id}
                            width="560"
                            height="315"
                            src={movie.trailer}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                    </ResponsiveEmbed>
                    : (movie.poster && <Card.Img src={movie.poster} alt={`The cover for ${movie.title}`} variant='top' />)
                }
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Row>
                        <Col xs={6}>
                            { movie.rating >= 0
                            ?   <StarRatings
                                    rating={movie.rating/2}
                                    numberOfStars={5}
                                    name={`${movie._id}-rating`}
                                    starDimension="20px"
                                    starSpacing="1px"
                                />
                            :   null
                            }
                            <Card.Text className="small">
                                ({movie.voteCount?.toLocaleString()} ratings)
                            </Card.Text>
                        </Col>
                        <Col className="text-right">
                            <ContextAwareToggle eventKey={movie._id} />
                        </Col>
                    </Row>
                </Card.Body>
                <Accordion.Collapse eventKey={movie._id}>
                    <Card.Body>
                        <Card.Text>Plot Summary</Card.Text>
                        <Card.Text className='small'>{movie.overview}</Card.Text>
                        <Card.Text className='small'>Release Date: {movie.releaseDate}</Card.Text>
                        {movie.likedUsers
                            ? displayLikedUsers(movie.likedUsers)
                            : <Card.Text className='small'>No users have liked this movie</Card.Text>   
                        }
                    </Card.Body>
                </Accordion.Collapse>

                <Card.Footer className="d-flex justify-content-center align-items-center">
                    { displaySkip
                    ?   <Button
                            className="btn-round-sm mr-3"
                            variant={"outline-secondary"}
                            onClick={() => prevMovieHandler()}
                        >
                            <MdChevronLeft />
                        </Button>
                    :   null }
                    {Auth.loggedIn()
                    ?   <>
                            <Button
                                className="btn-round-lg mr-3"
                                disabled={dislikedMovies?.some(dislikedMovie => dislikedMovie._id === movie._id)}
                                variant={dislikedMovies?.some(dislikedMovie => dislikedMovie._id === movie._id) ? "outline-secondary" : "outline-danger"}
                                onClick={() => dislikeMovieHandler(movie)}
                            >
                                <MdClose />
                            </Button>
                            <Button
                                className="btn-round-lg mr-3"
                                disabled={likedMovies?.some(likedMovie => likedMovie._id === movie._id)}
                                variant={likedMovies?.some(likedMovie => likedMovie._id === movie._id) ? "outline-secondary" : "outline-success"}
                                onClick={() => likeMovieHandler(movie)}
                            >
                                <MdFavoriteBorder />
                            </Button>
                        </>
                    :   null }
                    { displaySkip
                    ?   <Button
                            className="btn-round-sm"
                            variant={"outline-secondary"}
                            onClick={() => nextMovieHandler()}
                        >
                            <MdChevronRight />
                        </Button>
                    :   null }
                </Card.Footer>
                </Card>
            </Accordion>
        :   null
    )
}

export default MovieCard;