import React, { Component } from 'react'
import { connect } from 'react-redux';
import { layThongTinNguoiDung, huyGhiDanh } from '../../redux/actions/QuanLyNguoiDungAction';

class UserCourse extends Component {

    componentDidMount() {
        let nguoiDung = JSON.parse(localStorage.getItem('userLogin'));
        console.log(nguoiDung);
        this.props.khoaHocCuaNguoiDung(nguoiDung.taiKhoan)
    }
    componentDidUpdate() {
        let nguoiDung = JSON.parse(localStorage.getItem('userLogin'));
        this.props.khoaHocCuaNguoiDung(nguoiDung.taiKhoan)
    }

    renderKhoaHoc = () => {
        let nguoiDungGhiDanh = JSON.parse(localStorage.getItem('userLogin'));
        return this.props.thongTinGhiDanh.map((nguoiDung, index) => {
            return (

                < div className="row" key={index}>
                    <div className="col-4">
                        <p>{nguoiDung.maKhoaHoc}</p>
                    </div>
                    <div className="col-8">
                        <h5></h5>
                        <p>{nguoiDung.tenKhoaHoc}</p>
                    </div>
                    <button onClick={() => this.props.huyGhiDanhAction(nguoiDung.maKhoaHoc, nguoiDungGhiDanh.taiKhoan)}>Hủy</button>
                </div >
            )
        })
    }

    render() {
        return (
            <div>
                <h3>Các khóa học đã tham gia</h3>
                <div className="container">
                    {this.renderKhoaHoc()}
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    thongTinGhiDanh: state.QuanLyNguoiDungReducer.chiTietKhoaHoc,
})

const mapDispatchToProps = dispatch => {
    return {
        khoaHocCuaNguoiDung: (taiKhoan) => {
            dispatch(layThongTinNguoiDung(taiKhoan))
        },
        huyGhiDanhAction: (maKhoaHoc, taiKhoan) => {
            dispatch(huyGhiDanh(maKhoaHoc, taiKhoan))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCourse)
