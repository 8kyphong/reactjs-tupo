import React, { Fragment } from 'react';
import { Route, NavLink } from 'react-router-dom';

const AdminLayout = (props) => {
    return <Fragment>
        <ul className="nav nav-tabs bg-dark text-white">

            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                    aria-haspopup="true" aria-expanded="false">Quản lý người dùng</a>
                <div className="dropdown-menu">
                    <NavLink className="dropdown-item" to='/admin/useradd'>Thêm người dùng</NavLink>
                    <NavLink className="dropdown-item" to='/admin/userlist'>Danh sách người dùng</NavLink>
                </div>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                    aria-haspopup="true" aria-expanded="false">Quản lý khóa học</a>
                <div className="dropdown-menu">
                    <NavLink className="dropdown-item" to='/admin/addcourse'>Thêm khóa học</NavLink>
                    <NavLink className="dropdown-item" to='/admin/courselistadmin'>Danh sách khóa học</NavLink>
                </div>
            </li>
        </ul>

        {props.children}
    </Fragment>
}
export const Admin = ({ Component, ...props }) => (
    <Route {...props} render={(propComponent) => (
        <AdminLayout >
            <Component {...propComponent} />
        </AdminLayout>)
    } />
)