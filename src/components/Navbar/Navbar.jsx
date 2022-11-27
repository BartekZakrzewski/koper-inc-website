import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/KoperWhiteShort.png';
import useStyles from './styles';

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <>
            <AppBar position='fixed' className={classes.appBar} style={{background: '#121212'}}>
                <Toolbar>
                    <Typography component={Link} to="/" onClick={() => {
                        window.scrollTo(0, 0)
                    }} variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Koper Inc." height="50px" className={classes.image}/>
                        Koper Inc.
                    </Typography>
                    <div className={classes.grow}/>
                    {location.pathname === "/" && (
                        <div className={classes.button}>
                            <IconButton component={Link} to="/koszyk" aria-label='Show Cart Items' color='inherit'>
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart/>
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>    
        </>
    )
}

export default Navbar