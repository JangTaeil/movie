import React from 'react'

const Test = (props) => {
  console.log('props.hello >> ', props.hello)
  return <div>Test Component {props.hello}</div>
}

function Items() {
  return (
    <>
      <div>상품 정보</div>
    </>
  )
}

export default Items