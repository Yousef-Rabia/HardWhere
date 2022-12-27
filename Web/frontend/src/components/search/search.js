import * as React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Slider/Slider.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import "../ProductsPage/ProductsPage.css";
import Rating from "@mui/material/Rating";
import './searchresults.css'
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack";
import { useLocation } from "react-router-dom";

function valuetext(value) {
  return `${value}$`;
}


  
const ProductsPage = () => {
  const { state } = useLocation();
  console.log("user", state);
  const [filterby, setfilterby] = React.useState(null);
  const [priceRange, setRange] = React.useState([0, 100000]);
  const [supplierfilter, setSupp] = React.useState(null);
  const [suppliers, setsuppps] = React.useState([]);
  const { searchVal: parm } = useParams();
  const his = useNavigate();
  const [products, setProducts] = useState([]);


  const handleFilterSuppChange = (e, val) => {
    
  }
  const handleRangeChange = (event, newValue) => {
    setRange(newValue);
    console.log(newValue);
  };
  const handleFavouriteClick = (e) => {
    e.target.style.color = '#faaf00'
  }
  useEffect(() => {getSupps()},[])
  const getSupps = async () => {
    try {
      const dataRes = await fetch(`http://localhost:1444/api/v1/getAllSuppliers`);
      const { data } = await dataRes.json();
      setsuppps(data);
      console.log("supps", suppliers);
    } catch (error) {
      console.log(error);
    }
  }
  // 
  useEffect(() => {
   
    const getProducts = async () => {
      
      if (filterby == null) {
        console.log('in')
        try {
          const dataRes = await fetch(`http://localhost:1444/api/v1/searchproduct/${parm}`);
          const { data } = await dataRes.json();
          console.log("products", data);
          setProducts(data);
        } catch (error) {
          console.log(error);
        }
      }

      else {
        switch (filterby) {

          case 'price': {
            
            try {
              const dataRes = await fetch(`http://localhost:1444/api/v1/filterByPrice/${priceRange[0]}/&{priceRange[1]}`);
              const { data } = await dataRes.json();
              console.log("products", data);
              setProducts(data);
            } catch (error) {
              console.log(error);
            }
            break;
          }

          case 'supplier': {
            if (supplierfilter!=null)
            try {         
              const dataRes = await fetch(`http://localhost:1444/api/v1/filterBySupplier?su_id=${supplierfilter}`);
              const { data } = await dataRes.json();
              console.log("products", data);
              setProducts(data);
            } catch (error) {
              console.log(error);
            }
            break;
          }

          case 'offer': {
            try {
              const dataRes = await fetch(`http://localhost:1444/api/v1/filterByoffer`);
              const { data } = await dataRes.json();
              console.log("products", data);
              setProducts(data);
            } catch (error) {
              console.log(error);
            }
            break;
          }
          default: break;
        }

      };
    }
    getProducts();
  }, [parm, his, filterby,priceRange,supplierfilter]);

  const handleFiltersChange = (e, value) => {
    setfilterby(value);
  }
  return (
    <div className="proPage">
      <h3>
        {" "}
        <span>{parm}</span>
      </h3>
      <div className="wholePage">
        <div className="filterSide">

          <Paper elevation={3} sx={{ maxHeight: '100%', minWidth: '250px', display: 'flex', flexDirection: 'column', padding: '15px', marginTop: '10px', marginBottom: '10px' }}>
            <h4 style={{ textAlign: 'center', marginBottom: '10px', borderRadius: '10px', borderBottom: '2px solid  rgb(221, 224, 16) ' }}>Filters</h4>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="Suppliers_group"
                onChange={handleFiltersChange}
              >
                <FormControlLabel value="offer" control={<Radio size='small' />} label="Offers" />

                <FormControlLabel value='supplier' control={<Radio size='small' />} label='Suppliers' />

                <Autocomplete
                  id="combo-box-demo"
                  options={suppliers}
                  value={supplierfilter}
                  onInputChange={handleFilterSuppChange}
                  disabled={filterby !== 'supplier'}
                  getOptionLabel={(option) => option.su_name ? option.su_name : ""}
                  sx={{ width: 300, padding: '5px 20px 10px 20px' }}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} id={option.suid} key={option.suid}>
          
                        {option.su_name}
                      </li>
                    );
                  }}
                  renderInput={(params,indx) => <TextField  {...params} label="Supplier" />}
                />

                <FormControlLabel value='price' control={<Radio size='small' />} label='Price' />
                <Slider
                  getAriaLabel={() => 'Price range'}
                  value={priceRange}
                  onChange={handleRangeChange}
                  sx={{ maxWidth: '180px', margin: 'auto' }}
                  valueLabelDisplay="auto"
                  disabled={filterby != 'price'}
                  min={0}
                  max={100000}
                  step={100}
                  getAriaValueText={valuetext}
                />
              </RadioGroup>
            </FormControl>

          </Paper>
        </div>
        <div className="showproducts">
          {products.map((product, index) => (
            <div
              className="slider-card"
              key={index}

            >
              <div
                className="slider-card-image"
                onClick={(e) => {
                  his(`/product/${product.pid}`, { state: state });
                }}
                style={{
                  backgroundImage: `url(${product.img_link})`,
                  backgroundSize: "cover",
                }}
              ></div>
              <p onClick={(e) => {
                his(`/product/${product.pid}`, { state: state });
              }} className="slider-card-title">{product.product_name}</p>
              <Rating
                className="slider_rating"
                name="half-rating-read"
                defaultValue={product.p_value}
                precision={0.5}
                size="small"
                readOnly
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {<FavoriteIcon color='disabled' onClick={handleFavouriteClick} />}
                <p className="slider-card-price">{product.price}$</p>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
