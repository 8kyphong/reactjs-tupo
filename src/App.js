import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Home } from './templates/HomeTemplate/Home';
import HomePage from './pages/HomePage/HomePage'
import CourseDetail from './pages/CourseDetail/CourseDetail';
import DetailGroup from './pages/CourseGroup/DetailGroup';
import SearchCourse from './pages/SearchCourse/SearchCourse';

import Login from './pages/Login/Login';

import { Admin } from './templates/AdminTemplate/Admin'
import AdminIndex from './pages/Admin/AdminIndex';
import AddCourse from './pages/Admin/AddCourse/AddCourse';
import CourseListAdmin from './pages/Admin/CourseList/CourseListAdmin';
import Register from './pages/Register/Register';
import { User } from './templates/UserTemplate/User';
import UserInfo from './pages/Users/UserInfo';
import UserCourse from './pages/Users/UserCourse';
import UserList from './pages/Admin/UserList/UserList';
import UserAdd from './pages/Admin/Usercontrol/UserAdd';


function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Home exact path='/coursedetail/:maKhoaHoc' Component={CourseDetail} />
          <Home exact path='/coursegroup/:maDanhMuc' Component={DetailGroup} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />


          <Admin exact path='/admin/addcourse' Component={AddCourse} />
          <Admin exact path='/admin/courselistadmin' Component={CourseListAdmin} />
          <Admin exact path='/admin' Component={AdminIndex} />
          <Admin exact path='/admin/useradd' Component={UserAdd} />
          <Admin exact path='/admin/userlist' Component={UserList} />

          <Home exact path='/' Component={HomePage} />

          <User exact path='/userinfo' Component={UserInfo} />
          <User exact path='/usercourse' Component={UserCourse} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
