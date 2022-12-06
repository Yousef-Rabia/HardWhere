import { useParams } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './product.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { ThemeProvider, createTheme, } from '@mui/material/styles'
import { useState } from "react";

const Btntheme = createTheme({
    typography: {
        fontFamily: "comfortaa"
    }
    ,
    palette: {

        primary: {
            main: "#efef18"
        },
        secondary: {
            main: "#251c57"
        }
    },
    shape: {

        borderRadius: 50
    }
})
const Product = () => {
    const { id } = useParams();
    const proName = "Product " + id;
    const price = 99.99
    const count = 6
    const qtyarr = [];
    const data = [
        {
            userId: '02b',
            comId: '017',
            fullName: 'Lily',
            userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
            text: 'I think you have a point🤔',
            avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
            replies: []
        }
    ]
    const inStock = count ? true : false;
    const colors = ["black", "red", 'blue', 'yellow']
    const [qty, setQty] = useState(1);
    for (let i = 1; i <= count; i++) {
        qtyarr.push(i);
    }
    return (
        <div className="propage">
            <div className="product">
                <div className="productimage">
                    <img src="https://www.bestshop.com.py/img/1000x1000/products/13749/13749.jpg" alt={"product " + id} />
                </div>
                <div className="productinfo">
                    <h2 className="proHead">{proName}</h2>
                    <Stack spacing={1}>
                        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                    </Stack>
                    <p className="proDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum praesentium, accusantium aperiam fugit autem atque dolorem nulla qui incidunt ut quos accusamus sapiente commodi, a corrupti, expedita architecto tempore reiciendis.</p>
                    {
                        inStock && (
                            <div>
                                <p className="available"><span> {count} available </span> in stock</p>
                                <div className="colors">
                                    {colors.map(color => (<div onClick={(e) => {
                                        let cols = Array.from(document.getElementsByClassName("color"));
                                        cols.forEach((col) => { col.classList.remove("selected"); });
                                        e.target.classList.add("selected");
                                    }} className={color + " color"} style={{ width: 25, height: 25, backgroundColor: color }} key={color}></div>))}
                                </div>
                                <div className="price"> {price}$</div>
                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                    <InputLabel id="demo-select-small">Qty</InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={qty}
                                        label="qty"
                                        onChange={(e) => { setQty(e.target.value); }
                                        }
                                    >
                                        {qtyarr.map((num) => (<MenuItem value={num}>{num}</MenuItem>))}

                                    </Select>
                                </FormControl>
                                <ThemeProvider theme={Btntheme}>
                                    <Link to="/Cart" className="Link">
                                        <Button variant="contained"
                                            color="primary"

                                            sx={{
                                                display: "flex",
                                                minWidth: 190,
                                                color: "#251c57",
                                                fontWeight: "bold",
                                                margin: 2
                                            }} endIcon={<AddShoppingCartIcon />}>
                                            Add to Cart
                                        </Button>
                                    </Link>
                                </ThemeProvider>
                            </div>
                        )
                    }
                    {
                        !inStock && (<p className="notAvailable">Out Of Stock</p>)
                    }
                </div>
            </div>
            <h2 style={{paddingLeft:17}}>Reviews</h2>
            <CommentSection
                titleStyle={{ content: "Reviews"}}
                currentUser={{
                    currentUserId: '01a',
                    currentUserImg:
                        'https://ui-avatars.com/api/name=Mahmoud&background=random',
                    currentUserProfile:
                        'https://www.linkedin.com/in/riya-negi-8879631a9/',
                    currentUserFullName: 'Mahmoud Sobhy'
                }}
                logIn={{
                    loginLink: 'http://localhost:3001/',
                    signupLink: 'http://localhost:3001/'
                }}
                commentData={data}
                onSubmitAction={(data) => console.log('check submit, ', data)}
                currentData={(data) => {
                    console.log('curent data', data)
                }}
            />
        </div>
    );
}

export default Product;