import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { getLaunches } from '../store/actions/';
import Details from './Details';

const useStyles = makeStyles({
    card: {
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        backgroundColor: '#222B36',
        height: '350px',
        maxHeight: '350px',
        maxWidth: '250px',
        marginBottom: '20px',
        margin: 'auto',
        padding: '16px',
        transition: '0.3s',
        boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
        '&:hover': {
            cursor: 'pointer',
            boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
        },
    },
    media: {
        paddingTop: '50%',
        width: '230px',
        height: '230px',
        objectFit: 'cover',
    },
    content: {
        textAlign: 'left',
        padding: '5px',
    },
    divider: {
        margin: '10px',
    },
    heading: {
        fontWeight: 'bold',
    },
    subheading: {
        lineHeight: 1,
    },
    button: {
        color: '#fff',
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
});

export default function LaunchCard() {
    const classes = useStyles();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const toggleModal = useCallback(
        (index) => {
            setSelectedIndex(index);
            setIsOpen(!isOpen);
        },
        [isOpen]
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLaunches());
    }, [dispatch]);
    const filteredLaunches = useSelector(
        (state) => state.launches.filteredLaunches
    );

    const renderCard = React.useMemo(
        () => (item, index) => {
            return (
                <Card
                    className={classes.card}
                    key={index}
                    onClick={() => toggleModal(index)}
                >
                    <CardMedia
                        className={classes.media}
                        image={item.links.mission_patch_small}
                    />
                    <CardContent className={classes.content}>
                        <Typography
                            className={'MuiTypography--heading'}
                            variant={'h6'}
                            gutterBottom
                        >
                            Mission: {item.mission_name}
                        </Typography>
                        <Typography
                            className={'MuiTypography--subheading'}
                            variant={'caption'}
                        >
                            Date:{item.launch_date_local}
                        </Typography>
                        <Divider className={classes.divider} light />
                    </CardContent>
                </Card>
            );
        },
        [
            classes.card,
            classes.content,
            classes.divider,
            classes.media,
            toggleModal,
        ]
    );

    return (
        <div className={classes.details}>
            {filteredLaunches.map((item, index) => renderCard(item, index))}
            <Details
                isOpen={isOpen}
                launchData={filteredLaunches[selectedIndex]}
                toggleModal={toggleModal}
            />
        </div>
    );
}
