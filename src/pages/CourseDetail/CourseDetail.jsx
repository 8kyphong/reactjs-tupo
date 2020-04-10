import React, { Component } from 'react';
import { connect } from 'react-redux';
import { layChiTietKhoaHocAction, dangKyKhoaHoc } from '../../redux/actions/QuanLyKhoaHocAction'
import './CourseDetail.css'
class CourseDetail extends Component {
    componentDidMount() {

        let { maKhoaHoc } = this.props.match.params;
        this.props.layThongTinKhoaHoc(maKhoaHoc);


    }

    render() {
        let { thongTinKhoaHoc } = this.props;
        let nguoiDung = JSON.parse(localStorage.getItem('userLogin'))
        console.log(this.props)
        return (
            <div className='container'>

                <div className="col-6">
                    <h3 className="text-title-ChiTiet">{thongTinKhoaHoc.tenKhoaHoc}</h3>
                    <img className="img-KhoaHocChiTiet" src={thongTinKhoaHoc.hinhAnh} width={300} height={200} />
                </div>
                <div className="col-6">
                    <p>{thongTinKhoaHoc.moTa}</p>
                    <button className="text-dangKy" onClick={() => {
                        this.props.dangKyKhoaHocAction(thongTinKhoaHoc.maKhoaHoc, nguoiDung.taiKhoan);
                        this.props.history.push('/')
                    }}>Đăng ký</button>
                </div>
            </div>
        )
    }
}

const mapState = state => (
    {
        thongTinKhoaHoc: state.QuanLyKhoaHocReducer.thongTinKhoaHoc,
    }
)
const mapDispatch = dispatch => (
    {
        layThongTinKhoaHoc: (maKhoaHoc) => {
            dispatch(layChiTietKhoaHocAction(maKhoaHoc))
        },
        dangKyKhoaHocAction: (maKhoaHoc, taiKhoan) => {
            dispatch(dangKyKhoaHoc(maKhoaHoc, taiKhoan))
        }
    })
export default connect(mapState, mapDispatch)(CourseDetail)
