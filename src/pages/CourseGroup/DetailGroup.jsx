import React, { Component } from 'react'
import { connect } from 'react-redux';
import { layKhoaHocTheoDanhMucAction } from '../../redux/actions/QuanLyKhoaHocAction';
import { NavLink } from 'react-router-dom';

class DetailGroup extends Component {

    componentDidMount() {
        let { maDanhMuc } = this.props.match.params;
        this.props.layKhoaHocTheoDanhMuc(maDanhMuc)
    }

    componentDidUpdate() {
        let { maDanhMuc } = this.props.match.params;
        this.props.layKhoaHocTheoDanhMuc(maDanhMuc)
    }

    renderKhoaHoc() {
        let { khoaHocTDM } = this.props;
        return khoaHocTDM.map((khoaHoc, index) => {
            return (
                <div key={index} className="col-4 mt-3">
                    <div className="card text-white bg-secondary">
                        <img width="100%" height={300} src={khoaHoc.hinhAnh} />
                        <div className="card-body">
                            <h3>{khoaHoc.tenKhoaHoc}</h3>
                            <p className="card-text">{khoaHoc.moTa}</p>
                            <NavLink to={`/coursedetail/${khoaHoc.maKhoaHoc}`} className="btn btn-secondary">Đăng ký</NavLink>
                        </div>
                    </div>
                </div >
            )
        })
    }
    render() {


        return (
            <div className="container mt-2">
                <div className="row">
                    {this.renderKhoaHoc()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    khoaHocTDM: state.QuanLyKhoaHocReducer.mangKhoaHocTheoDanhMuc,
})
const mapDispatchToProps = dispatch => ({
    layKhoaHocTheoDanhMuc: maDanhMuc => {
        dispatch(layKhoaHocTheoDanhMucAction(maDanhMuc));
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(DetailGroup);