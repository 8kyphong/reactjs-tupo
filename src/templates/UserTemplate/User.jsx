import React, { Fragment } from 'react';
import { Route, NavLink } from 'react-router-dom';


const UserLayout = (props) => {
    return <Fragment>
        <span>
            <div> <NavLink className="nav-link font-weight-bold" to="/">Trang chủ</NavLink></div>
            <h3 className="text-center">Trang Cá nhân</h3>
        </span>
        <ul className="nav nav-tabs bg-dark text-white nav-stacked">
            <li className="nav-item">
                <div> <NavLink className="nav-link" to='/userinfo' >Thông tin cá nhân</NavLink></div>
            </li>
            <li className="nav-item">
                <div>  <NavLink className="nav-link" to='/usercourse'>Khóa học của tôi</NavLink></div>
            </li>
        </ul>
        {props.children}
    </Fragment>
}
export const User = ({ Component, ...props }) => (
    <Route {...props} render={(propComponent) => (
        <UserLayout>
            <Component {...propComponent} />
        </UserLayout>
    )} />
)
