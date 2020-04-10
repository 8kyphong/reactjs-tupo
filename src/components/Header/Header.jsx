import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import './Header.css';

//ket nối redux
import { connect } from 'react-redux';
import { layDanhMucKhoaHocAction, timKiemKhoaHocAction } from '../../redux/actions/QuanLyKhoaHocAction'

function Header(props) {

    const [state, setState] = useState({
        mangDanhMucKhoaHoc: [],
        timKiem: {
            key: '',
        },
        error: {
            key: '',
        },
    });

    useEffect(() => {
        props.layDanhMucKhoaHoc();
    }, []
    )




    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSearch(state.timKiem.key);
    }
    const handleChange = (e) => {
        let { value, name } = e.target;
        setState({
            timKiem: { ...state.timKiem, [name]: value },
        })
    }
    const renderDanhMucKhoaHoc = () => {
        return props.mangDanhMucKhoaHoc.map((dmkh, index) => {
            return <NavLink key={index} className="dropdown-item text-danhMuc" to={`/coursegroup/${dmkh.maDanhMuc}`} >{dmkh.tenDanhMuc}</NavLink>
        })
    }

    const dangXuat = () => {
        localStorage.removeItem('userLogin');
        props.dangXuatAction();
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark background-header" style={{ backgroundColor: '#e3f2fd' }}>
            <NavLink to="/" className="navbar-brand" href="#">KyPhong</NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" href="#">HOME<span className="sr-only">(current)</span></NavLink>
                    </li>
                    {
                        props.user ?
                            <>
                                <li className="nav-item li_name">
                                    <NavLink to="/userinfo" className="name_header">
                                        {props.user.taiKhoan}
                                    </NavLink>
                                </li>
                                <li className="nav-item m-1">
                                    <button className="log_out" onClick={dangXuat}>Đăng xuất</button>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">Đăng ký</NavLink>
                                </li>
                            </>
                    }
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Danh mục khóa học</a>
                        <div className="dropdown-menu dropdown-css" aria-labelledby="dropdownId">
                            {renderDanhMucKhoaHoc()}
                        </div>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin">Admin</NavLink>
                    </li>
                </ul>
                <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
                    <input name='key' value={state.timKiem.key} onChange={handleChange} className="form-control mr-sm-2" type="text" placeholder="Search box" />
                    <button className="btn btn-outline-warning header-search my-2 my-sm-0" type="submit">
                        TÌM KIẾM</button>
                </form>

            </div>

        </nav >
    )
}

const mapStateToProps = (state) => {
    return {
        mangDanhMucKhoaHoc: state.QuanLyKhoaHocReducer.mangDanhMucKhoaHoc,
        user: state.QuanLyNguoiDungReducer.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        layDanhMucKhoaHoc: () => {
            dispatch(layDanhMucKhoaHocAction());
        },

        handleSearch: (tuKhoa) => {
            dispatch(timKiemKhoaHocAction(tuKhoa));
        },
        dangXuatAction: () => {
            const action = {
                type: 'DANG_XUAT',
            };
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

