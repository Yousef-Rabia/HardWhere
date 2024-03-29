import ReactCardSlider from "react-card-slider-component";
import sliderClick from "react-card-slider-component";
import Slider from "../../Slider/Slider";
import { useEffect } from "react";
import "./CategorySlider.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategorySlider = (probs) => {
  const [slides, setSlides] = useState([]);
  const his=useNavigate();
  console.log(probs.category.name);

  const getCategories = async () => {
    try {
      const Res = await fetch(
        `http://localhost:1444/api/v1/${probs.category.name}`
      );
      const { data } = await Res.json();
      console.log(data);
      if (data)
      setSlides(data.slice(0, 8));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, [his]);

  return (
    <div className="CategoryMain">
      <h2 className="CategoryName">
        {" "}
        <span>{probs.category.name}</span>
      </h2>
      <Slider slides={slides} CategoryName={probs.category.name} />
    </div>
  );
};
export default CategorySlider;
