import React, { useEffect } from 'react';
import './HomePage.css';
import { connect } from 'react-redux';
import { layDanhSachKhoaHocAction } from '../../redux/actions/QuanLyKhoaHocAction';
import CourseList from '../../components/CourseList/CourseList';
import SearchCourse from '../SearchCourse/SearchCourse';

function HomePage(props) {
    let mangTimKiem = props.mangTimKiem;
    useEffect(() => {
        props.layDanhSachKhoaHoc();
    }, [])


    return (
        <div>
            <section className="home-header">
                <div className="slick-carousel">
                    <div className="carousel-items img-1">
                        <div className="carousel__caption">
                            <span>ACTION, ADVENTURE, FANTASY</span>
                            <h1>FRONT-END DEVELOPER</h1>
                            <p>Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum
                                est notare quam littera gothica, quam nunc putamus parum.</p>
                            <div className="carousel__detail">
                                <span>PG</span>
                                <button className="btn btn-secondary ml-2"><i className="fa fa-play">Course Detail</i> </button>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-items img-2">
                        <div className="carousel__caption">
                            <span>ACTION, ADVENTURE, FANTASY</span>
                            <h1>BACK-END DEVELOPER</h1>
                            <p>Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum
                                est notare quam littera gothica, quam nunc putamus parum.</p>
                            <div className="carousel__detail">
                                <span>PG</span>
                                <button className="btn btn-secondary ml-2"><i className="fa fa-play">Course Detail</i> </button>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-items img-3">
                        <div className="carousel__caption">
                            <span>ACTION, ADVENTURE, FANTASY</span>
                            <h1>TƯ DUY LẬP TRÌNH</h1>
                            <p>Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum
                                est notare quam littera gothica, quam nunc putamus parum.</p>
                            <div className="carousel__detail">
                                <span>PG</span>
                                <button className="btn btn-secondary ml-2"><i className="fa fa-play">Course Detail</i> </button>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-items img-4">
                        <div className="carousel__caption">
                            <span>ACTION, ADVENTURE, FANTASY</span>
                            <h1>LẬP TRÌNH MOBILE</h1>
                            <p>Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum
                                est notare quam littera gothica, quam nunc putamus parum.</p>
                            <div className="carousel__detail">
                                <span>PG</span>
                                <button className="btn btn-secondary ml-2"><i className="fa fa-play">Course Detail</i> </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="homeCourse" data-aos="fade-up">
                <h2 className="text-center my-3 textHome">Các Khóa Học Tại Trung Tâm</h2>
                {mangTimKiem == '' ? <CourseList mangKhoaHoc={props.mangKhoaHoc} /> : <SearchCourse mangTimKiem={props.mangTimKiem} />}
            </section>

            {/* STARTED */}
            <section className="get-started" data-aos="fade-up">
                <div className="icon-top">
                    <i className="fab fa-viadeo" />
                    <i className="fa fa-pause"></i>
                    <i className="fa fa-balance-scale"></i>
                    <i className="fa fa-hospital"></i>
                    <i className="fa fa-address-book"></i>
                </div>
                <div className="mid">
                    <i className="fab fa-viadeo"></i>
                    <div className="text">
                        <h3>Get personalized recommendations</h3>
                        <p>Answer a few questions for your top picks</p>
                        <button className="btn btn--purple">Get Started</button>
                    </div>
                    <i className="fa fa-facebook"></i>
                </div>
                <div className="icon-bottom">
                    <i className="fab fa-viadeo"></i>
                    <i className="fa fa-pause"></i>
                    <i className="fa fa-balance-scale"></i>
                    <i className="fa fa-hospital"></i>
                    <i className="fa fa-address-book"></i>
                </div>
            </section>
            {/* STUDEN TALK */}
            <section className="saying" data-aos="fade-up">
                <div className="say-container">
                    <h3>Cảm Nhận Của Học Viên</h3>
                    <div className="say-carousel">
                        <div className="item">
                            <div>
                                <img src="https://hinhanhdep.vn/wp-content/uploads/2019/07/hinh-anh-hotboy-nam-sinh-dep-trai-5.jpeg" />
                                <p>Zulaika</p>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero adipisci voluptatibus odit
                              quibusdam,
                              quidem odio
                            quo veritatis nisi.</p>
                        </div>
                        <div className="item">
                            <div>
                                <img src="https://i.pinimg.com/originals/04/fe/b0/04feb0ed8558b1949c6600f6ebb837ad.jpg" />
                                <p>Marko</p>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero adipisci voluptatibus odit
                              quibusdam,
                              quidem odio
                                quo veritatis nisi.</p>
                        </div>
                        <div className="item">
                            <div>
                                <img src="https://cdn.24h.com.vn/upload/4-2019/images/2019-11-28/1574931300-964-hot-girl-lao-goc-viet-dep-khong-ty-vet-khoe-than-hinh-van-nguoi-me-c1-1574928072-width477height567.jpg" />
                                <p>Justin</p>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero adipisci voluptatibus odit
                              quibusdam,
                              quidem odio
                                quo veritatis nisi.</p>
                        </div>
                        <div className="item">
                            <div>
                                <img src="https://znews-photo.zadn.vn/w660/Uploaded/mdf_drkydd/2019_10_09/03.jpg" />
                                <p>Zulaika</p>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero adipisci voluptatibus odit
                              quibusdam,
                              quidem odio
                                quo veritatis nisi.</p>
                        </div>
                        <div className="item">
                            <div>
                                <img src="http://tbdn.com.vn/data/data/ngoclinh/2017/10/18/hot-boy-vietnam-airlines-don-tim-dan-mang-viet-la-ai-hinh-2.jpg" />
                                <p>Marko</p>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero adipisci voluptatibus odit
                              quibusdam,
                              quidem odio
                             quo veritatis nisi.</p>
                        </div>
                        <div className="item">
                            <div>
                                <img src="http://www.lysa.vn/wp-content/uploads/2018/10/vai-boy.jpg" />
                                <p>Justin</p>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero adipisci voluptatibus odit
                              quibusdam,
                              quidem odio
                            quo veritatis nisi.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        mangKhoaHoc: state.QuanLyKhoaHocReducer.mangKhoaHoc,
        mangTimKiem: state.QuanLyKhoaHocReducer.mangTimKiem,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        layDanhSachKhoaHoc: () => {
            dispatch(layDanhSachKhoaHocAction());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
