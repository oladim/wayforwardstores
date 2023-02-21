import styled from "styled-components";
// import { useRef } from "react";
// import { Link } from "react-router-dom";

export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number)
}

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type])
  if (type === 'color') {
    unique = unique.flat()
  }
  return ['All Products', ...new Set(unique)]
}

export const BlackButton = () => {
//  const productSection = useRef(null)

//  const scrollToSection = (elementRef) => {
//   window.scrollTo({
//     top: elementRef.current.offsetTop,
//     behavior: "smooth"
//   })
//  }

  return<Wrapper>
    <div className="link"><div className="order">More Products</div></div>
  </Wrapper>
}

const Wrapper = styled.div`

.link{
  text-decoration: none;
}
.order{

  width: 120.37px;
  height: 42.18px;
  background: #000000;
  border-radius: 40px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
 }
`
