import './Home.css';
import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Header from '../../components/Header/Header';

const HomeLayout = (props) => {
    return <Fragment>
        <Header />
        {props.children}
    </Fragment>
}
export const Home = ({ Component, ...props }) => (
    <Route {...props} render={(propComponent) => (
        <HomeLayout >
            <Component {...propComponent} />
        </HomeLayout>)
    } />
)