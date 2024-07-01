import React, { useEffect,useState } from 'react';
import {API_KEY, API_URL, IMAGE_BASE_URL} from '../Config'
import MainImage from './Section/MainImage';
import { Button, Row } from 'antd';
import GridCards from '../commons/GridCards';
import { useNavigate } from 'react-router-dom';
import AntCard from '../commons/AntCard';

function LandingPage() {
  const navigate = useNavigate()

  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const page = 1
    fetchMovies(page);
  }, []);

  const loadMoreItems = () => {
    console.log('더보기 버튼 클릭!!!!!')
    fetchMovies(CurrentPage + 1);
  };

  return (
    <>
    <div style={{ width: '100%' }}>
      {/* Main Image */}
      {MainMovieImage && 
        <MainImage 
        image={`${IMAGE_BASE_URL}w1280${MainMovieImage.poster_path}`} 
        title={MainMovieImage.original_title}
        overview={`${MainMovieImage.overview}`}
        />
      }
      {/* 버튼 */}
        <div style={{textAlign:'center', marginTop: '20px'}}>
        {/* <div style={{position:'absolute', top: 0, bottom:0}}> */}
          <Button onClick={()=> navigate(1)}>다음</Button>
        </div>

      <div style={{ width: '85%', margin: '1rem auto' }}>
        <h2>새로 나온 영화</h2>
        <hr />

        {/* Movie Grid Card */}
          {/* <GridCards 
              path={`${IMAGE_BASE_URL}w400${Movies[0].poster_path}`}
              title={Movies[0].title}
          />
          <GridCards 
              path={`${IMAGE_BASE_URL}w400${Movies[1].poster_path}`}
              title={Movies[1].title}
          />
          <GridCards 
              path={`${IMAGE_BASE_URL}w400${Movies[2].poster_path}`}
              title={Movies[2].title}
          />
          <GridCards 
              path={`${IMAGE_BASE_URL}w400${Movies[3].poster_path}`}
              title={Movies[3].title}
          />
          <GridCards 
              path={`${IMAGE_BASE_URL}w400${Movies[4].poster_path}`}
              title={Movies[4].title}
          />
          <GridCards 
              path={`${IMAGE_BASE_URL}w400${Movies[5].poster_path}`}
              title={Movies[5].title}
          />
          <GridCards 
              path={`${IMAGE_BASE_URL}w400${Movies[6].poster_path}`}
              title={Movies[6].title}
          /> */}
        <Row gutter={[10, 10]}>
          {Movies.map(movie  => {
            return(
              <React.Fragment key={movie.id}>
                <AntCard
                landingPage
                path={`${IMAGE_BASE_URL}w400${movie.poster_path}`}
                title={movie.title}
                movieId={movie.id}
                />
              </React.Fragment>
            );
          })}
        </Row>

      </div>
      <div style={{display: 'flex', justifyContent: 'center', margin : '20px 0'}}>
        <button onClick={loadMoreItems}> 더보기 </button>
      </div>

    </div>
    </>
  );

  function fetchMovies(page) {
    const endpoint = `${API_URL}popular?api_key=${API_KEY}&language=en-US&page=${page}`;

    fetch(endpoint)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        // console.log(response.page);
        // console.log(response.results);
        setMovies([...Movies, ...response.results]);
        setMainMovieImage(response.results[0]);
        setCurrentPage(response.page);
        console.log(Movies)
      });
  }
}

export default LandingPage