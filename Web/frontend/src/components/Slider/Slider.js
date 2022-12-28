import React from "react";
import "./Slider.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
const ReactCardSlider = (props) => {
  const { state } = useLocation();
  console.log("user", state);

  const his = useNavigate();
  const slideLeft = () => {
    var slider = document.getElementById("slider" + props.CategoryName);
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  console.log(props.slides);
  const slideRight = () => {
    var slider = document.getElementById("slider" + props.CategoryName);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const handleFavouriteClick=(e) => {
    e.target.style.color ='#faaf00'
     }

  return (
    <div id="main-slider-container">
      <MdChevronLeft
        size={40}
        className="slider-icon left"
        onClick={slideLeft}
      />
      <div className="slider" id={"slider" + props.CategoryName}>
        {props.slides.map((slide, index) => {
          return (
            <div
              className="slider-card"
              key={index}
            >
              <div
                className="slider-card-image"
                onClick={(e) => his(`product/${slide.pid}`, { state: state })}
                style={{
                  backgroundImage: `url(${slide.img_link})`,
                  backgroundSize: "cover",
                }}
              ></div>
              <p onClick={(e) => his(`product/${slide.pid}`, { state: state })} className="slider-card-title">{slide.product_name}</p>
              <Rating
                onClick={(e) => his(`product/${slide.pid}`, { state: state })}
                className="slider_rating"
                name="half-rating-read"
                defaultValue={slide.p_value}
                precision={0.5}
                size="small"
                readOnly
              />
              
              <div style={{display:'flex',justifyContent:'space-between'}}>
                {<FavoriteIcon color='disabled' onClick={handleFavouriteClick} />}
              <p className="slider-card-price">{slide.price}$</p>
              </div>
            </div>
          );
        })}
      </div>
      <MdChevronRight
        size={40}
        className="slider-icon right"
        onClick={slideRight}
      />
    </div>
  );
};
export default ReactCardSlider;
