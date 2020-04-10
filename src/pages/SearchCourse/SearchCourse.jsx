import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { timKiemKhoaHocAction } from '../../redux/actions/QuanLyKhoaHocAction';

export default class SearchCourse extends Component {

    renderKetQua() {
        let { mangTimKiem } = this.props;
        console.log(mangTimKiem)
        return mangTimKiem.map((khoaHoc, index) => {
            return (
                <div key={index} className="row">
                    <div className="col-3">
                        <img height={200} width={200} src={khoaHoc.hinhAnh} />
                    </div>
                    <div className="col-9">
                        <h3>{khoaHoc.tenKhoaHoc}</h3>
                        <p>{khoaHoc.moTa}</p>
                        <p>{khoaHoc.luotXem}</p>
                        <NavLink to={`/coursedetail/${khoaHoc.maKhoaHoc}`} className="btn btn-success">Chi tiết khóa học</NavLink>
                    </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div className="container">
                {this.renderKetQua()}
            </div>
        )
    }
}