import { Button, Divider, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../Config';
import MainImage from '../LandingPage/Section/MainImage';
import AntCard from '../commons/AntCard';
import MovieInfo from './MovieInfo';
import ImageList from './ImageList';

const Detail = () => {
  const navigate = useNavigate()
  const { movieId } = useParams() 
  // console.log('movieId >>', movieId)

  //// [state] =====================================
  const [Movie, setMovie] = useState({})
  const [Casts, setCasts] = useState([])
  const [Crews, setCrews] = useState([])
  const [ActorToggle, setActorToggle] = useState(false)
  const [StaffToggle, setStaffToggle] = useState(false)

  useEffect(() => {
    console.log('페이지가 로드되면, 실행됩니다!')

    //// [특정 영화 정보] URL
    // https://api.themoviedb.org/3/movie/11?api_key=001ad91dbbb655d145ea35db4df239c9
    let endpointInfo = `${API_URL}${movieId}?api_key=${API_KEY}`
    // console.log(endpointInfo)

    //// [출연진] URL
    // 'https://api.themoviedb.org/3/movie/movie_id/credits?api_key=001ad91dbbb655d145ea35db4df239c9';
    let endpointCrew =`${API_URL}${movieId}/credits?api_key=${API_KEY}`
    console.log(endpointCrew)
    
    //// [특정 영화 정보] 영화 아이디로 정보 요청
    fetch(endpointInfo)
      .then(response => response.json())
      .then(response => {
        // console.log(response)
        setMovie(response)
      })

      /////[출연진] 영화배우 정보 요청
      fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
          // console.log(response)
          setCasts(response.cast)
          setCrews(response.crew) 
        })

  }, []);

  //// 버튼 핸들러 =========================
  function toggleActorView() {
    // console.log('버튼 클릭!!!')
    setActorToggle(!ActorToggle)
    // console.log('ActorToggle >> ', ActorToggle)
  }

  function toggleStaffView() {
    setStaffToggle(!StaffToggle)
  }

  return (
    <>
    

    {/* Header */}
      {Movie &&
      <MainImage 
        image={`${IMAGE_BASE_URL}w1280${Movie.poster_path}`} 
        title={Movie.original_title}
        overview={`${Movie.overview}`}
        /> 
    }

    {/* 영화 목록 버튼 */}
    <div style={{textAlign:'center', margin: "40px"}}>
      <Button onClick={() => navigate(-1)}>영화 목록</Button>
    </div>

    {/* Body */}
    <div style={{width: '85%', margin: '20px auto'}}>
    {/* MovieInfo */}
    <MovieInfo movie={Movie} />

    <br />

    {/* Actor Grid */} 
    <div style={{ textAlign:'center', margin: "40px 0"}}>
      <Button 
      type={ActorToggle?'primary':'dashed'} 
      onClick={toggleActorView} 
      style={{ marginRight: "20px"}}>배우 목록</Button>
      <Button 
      type={StaffToggle?'primary':'dashed'}
      onClick={toggleStaffView}>제작진 목록</Button>
    </div>  

    {ActorToggle &&
      <div>
        <Divider 
        dashed 
        orientation='left'
        orientationMargin={200}
        style={{ borderColor: '#f00' }}>배우 목록</Divider>
              <Row gutter={[10, 10]}>
      {Crews.map((crew, index) => {
        return(
          <React.Fragment key={index}>
            {crew.profile_path &&
            <AntCard
            path={`${IMAGE_BASE_URL}w400${crew.profile_path}`}
            castName={crew.name}
            />
        }
          </React.Fragment>
        )
        })}
      </Row>
      </div>
  }

  {StaffToggle &&
    <div>
      <Divider 
      dashed 
      orientation='left'
      orientationMargin={200}
      style={{ borderColor: '#f00' }}>제작진 목록</Divider>
      <Row gutter={[10, 10]}>
      {Crews.map((crew, index) => {
        return(
          <React.Fragment key={index}>
            {crew.profile_path &&
            <AntCard
            path={`${IMAGE_BASE_URL}w400${crew.profile_path}`}
            castName={crew.name}
            />
        }
          </React.Fragment>
        )
        })}
      </Row>
    </div>
  }
  </div>

    </>
  )
}

export default Detail