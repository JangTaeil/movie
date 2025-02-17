import { Card, Col } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const AntCard = (props) => {
  const { Meta } = Card;

  if(props.landingPage) {
    //// [LandingPage] 처리 ======================
    return (
      // GridCard 1개가 열 몇칸 쓰겠다는 소리.
      <Col lg={4} md={6} sm={12} xs={24}>
        <Card 
          hoverable 
          style={{width: 240}}
          cover={<div>
            <Link to={`/detail/${props.movieId}`}>
          {/* <a href={`/movie/${props.movieId}`}> */}
            <img
            style={{width: '100%'}}
            src={props.path}
            alt={props.title}
            />
            </Link>
          {/* </a> */}
        </div>}>
        <Meta title={props.title} /> 
        </Card>
      </Col>
    )
  } else {
    //// [Detail] 처리
    return (
      // GridCard 1개가 열 몇칸 쓰겠다는 소리.
      <Col lg={4} md={6} sm={12} xs={24}>
        <Card 
          hoverable 
          style={{width: '100%'}}
          cover={<div>
            <img
            style={{width:'100%'}}
            src={props.path}
            alt={props.title}
            />
        </div>}>
        <Meta title={props.castName} /> 
        </Card>
      </Col>
      
    )
  }
}
export default AntCard;

