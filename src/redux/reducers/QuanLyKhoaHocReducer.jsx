import { actionTypes } from '../constants/QuanLyKhoaHocConstant'

const initialState = {
    mangDanhMucKhoaHoc: [],
    mangKhoaHoc: [],
    thongTinKhoaHoc: '',
    mangKhoaHocTheoDanhMuc: [],
    mangTimKiem: [],
    khoaHocChuaGhiDanh: [],
    mangChoXet: [],
    khoaHocDaGhiDanh: [],
}

export const QuanLyKhoaHocReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LAY_DANH_MUC_KHOA_HOC:
            {
                state.mangDanhMucKhoaHoc = action.mangDanhMucKhoaHoc
                return { ...state }
            }
        case actionTypes.LAY_DANH_SACH_KHOA_HOC:
            {
                state.mangKhoaHoc = action.mangKhoaHoc;
                return { ...state }
            }
        case actionTypes.LAY_CHI_TIET_KHOA_HOC:
            {
                state.thongTinKhoaHoc = action.thongTinKhoaHoc;
                return { ...state }
            }
        case actionTypes.LAY_KHOA_HOC_THEO_DANH_MUC:
            {
                state.mangKhoaHocTheoDanhMuc = action.mangKhoaHocTheoDanhMuc;
                return { ...state }
            }
        case actionTypes.TIM_KIEM_KHOA_HOC:
            {
                state.mangTimKiem = action.mangTimKiem;
                return { ...state }
            }
        case actionTypes.KHOA_HOC_CHUA_GHI_DANH: {
            state.khoaHocChuaGhiDanh = action.khoaHocChuaGhiDanh;
            return { ...state }
        }
        case actionTypes.KHOA_HOC_CHO_XET:
            {
                state.mangChoXet = action.mangChoXet;
                return { ...state }
            }
        case actionTypes.KHOA_HOC_DA_GHI_DANH:
            {
                state.khoaHocDaGhiDanh = action.khoaHocDaGhiDanh;
                return { ...state }
            }

        default:
            return state
    }
}