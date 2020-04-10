import { actionTypes } from '../constants/QuanLyNguoiDungConstant';
import { settings } from '../../common/config/settings';
import axios from 'axios';

//báo khi lỗi catch trong axios
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

export const dangNhapAction = (thongTinNguoiDung) => {
    return dispatch => {
        axios({
            url: 'http://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap',
            method: 'POST',
            data: thongTinNguoiDung,
        }).then(result => {
            localStorage.setItem(settings.userLogin, JSON.stringify(result.data));
            localStorage.setItem(settings.token, result.data.accessToken);
            dispatch({
                type: actionTypes.DANG_NHAP,
                taiKhoan: result.data,
            });
            console.log(result.data.taiKhoan)
        }).catch(error => {
            swal.fire('Thông báo đăng nhập', error.response.data, 'error')
        })
    }
}

export const layDanhSachNguoiTaoAction = () => {
    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${settings.groupID}`,
            method: 'GET',
        }).then(result => {
            dispatch({
                type: actionTypes.LAY_DANH_SACH_NGUOI_TAO,
                mangNguoiDung: result.data.filter(nd => nd.maLoaiNguoiDung === 'GV')
            })
        }).catch(error => {
            console.log(error.response.data)
        })
    }
}

export const dangKyNguoiDungAction = (thongTinDangKy, callback) => {
    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/DangKy`,
            method: 'POST',
            data: { ...thongTinDangKy, maNhom: 'GP01', }
        }).then(result => {
            console.log(result.data);
            callback();
        }).catch(error => {
            console.log(error.response)
        })
    }
}

export const layThongTinNguoiDung = (taiKhoan) => {
    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyNguoiDung/ThongTinTaiKhoan',
            method: 'POST',
            data: { taiKhoan, maNhom: 'GP01', ngayTao: '07/10/2019' },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            dispatch({
                type: actionTypes.LAY_THONG_TIN_NGUOI_DUNG,
                thongTinNguoiDung: result.data,
                chiTietKhoaHoc: result.data.chiTietKhoaHocGhiDanh,
            });
            console.log(result.data.chiTietKhoaHocGhiDanh)
        }).catch(error => {
            console.log(error.response)
        })
    }
}

export const capNhatNguoiDung = (nguoiDung) => {
    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
            method: 'PUT',
            data: { ...nguoiDung, maNhom: 'GP01', maLoaiNguoiDung: 'HV' },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data);
            localStorage.setItem(settings.userLogin, JSON.stringify(result.data));
            dispatch(
                layThongTinNguoiDung(nguoiDung.taiKhoan)
            );
        }).catch(error => {
            console.log(error.response)
        })
    }
}
export const capNhatNguoiDung1 = (nguoiDung) => {
    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
            method: 'PUT',
            data: { ...nguoiDung, maNhom: 'GP01' },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data);
            dispatch(
                layThongTinNguoiDung(nguoiDung.taiKhoan)
            );
        }).catch(error => {
            console.log(error.response)
        })
    }
}

export const themNguoiDungAction = (nguoiDung) => {
    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyNguoiDung/ThemNguoiDung',
            method: 'POST',
            data: { ...nguoiDung, maNhom: 'GP01' },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data);
            swal.fire('Thêm người dùng thành công', result.data, 'Result')
        }).catch(error => {
            console.log(error.response);
        })
    }
}

export const timNguoiDungAction = (tenNguoiDung) => {
    let nguoiDung = tenNguoiDung.toLowerCase().replace(/\s/g, '');
    let URL = '';
    if (nguoiDung === '') {
        URL = settings.domain + `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${'GP01'}`
    } else {
        URL = settings.domain + `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${'GP01'}&tuKhoa=${nguoiDung}`
    };
    return dispatch => {
        axios({
            url: URL,
            method: 'GET',
            data: { ...tenNguoiDung },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            dispatch({
                type: actionTypes.TIM_NGUOI_DUNG,
                ketQuaTimKiem: result.data
            })
        }).catch(error => {
            console.log(error.response)
        })
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {
    console.log(taiKhoan)
    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data);
            swal.fire('Xóa thành công');
            timNguoiDungAction(taiKhoan)
        }).catch(error => {
            console.log(error);
            Swal.fire('Không thể xóa tài khoản')
        })
    }
}

export const nguoiDungChuaGhiDanh = (maKhoaHoc) => {
    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh',
            method: 'POST',
            data: { maKhoaHoc },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data);
            dispatch({
                type: actionTypes.NGUOI_DUNG_CHUA_GHI_DANH,
                nguoiDungChuaGhiDanh: result.data,
            })
        }).catch(error => {
            console.log(error.response)
        })
    }
}

export const hocVienDaThamGiaKhoaHoc = (maKhoaHoc) => {
    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc',
            method: 'POST',
            data: { maKhoaHoc },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data);
            dispatch({
                type: actionTypes.HOC_VIEN_DA_THAM_GIA_KHOA_HOC,
                mangHVDaThamGiaKH: result.data,
            })
        }).catch(error => {
            console.log(error.response)
        })
    }
}

export const huyGhiDanh = (maKhoaHoc, taiKhoan) => {
    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyKhoaHoc/HuyGhiDanh',
            method: 'POST',
            data: { maKhoaHoc, taiKhoan },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data);
            Swal.fire('Hủy thành công');
        }).catch(error => {
            console.log(error.response)
        })
    }
}

export const danhSachNguoiDungChoDuyet = (maKhoaHoc) => {
    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet',
            method: 'POST',
            data: { maKhoaHoc },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data);
            dispatch({
                type: actionTypes.NGUOI_DUNG_CHO_DUYET,
                mangNguoiDungChoDuyet: result.data,
            })
        }).catch(error => {
            console.log(error.response)
        })

    }
}