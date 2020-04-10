import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import './CourseList.css'

export default class CourseList extends Component {
    renderKhoaHoc = () => {
        //đầu vào là mảng khóa học
        let { mangKhoaHoc } = this.props;
        return mangKhoaHoc.map((khoaHoc, index) => {
            return <div className="col-12 col-md-4 col-sm-6 col-lg-3 card-space" data-aos="fade-up" data-aos-duration="1000" key={index}>
                <div className="card bg-card">
                    <img className="card-img-top img-KhoaHoc" src={khoaHoc.hinhAnh} />
                    <div className="card-body card-homepage">
                        <h4 className="card-title text-title">{khoaHoc.tenKhoaHoc}</h4>
                        <NavLink to={`/coursedetail/${khoaHoc.maKhoaHoc}`} className="btn btn-secondary text-button">CHI TIẾT</NavLink>
                    </div>
                </div>
            </div>
        })
    }

    showHide = () => {
    }

    render() {
        return (
            <div className="container">
                <div className="row contentCourse hideCourse">
                    {this.renderKhoaHoc()}
                </div>
                <div className="show-more text-center">
                    <button className="btn btn-info" onClick={() => this.showHide()}>Show more</button>
                </div>
            </div>
        )
    }
}
