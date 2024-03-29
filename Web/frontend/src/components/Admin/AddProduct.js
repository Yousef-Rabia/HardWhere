import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './AddProduct.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import validator from 'validator'
import Autocomplete from '@mui/material/Autocomplete';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputColor from 'react-input-color';
import { flexbox } from '@mui/system';
import useFetch from "../useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AddProduct = () => {
  const { state } = useLocation();
  const Navigate = useNavigate()
  const [URLcolor, setURLcolor] = React.useState('primary'); ;
  const [Idcolor, setIdcolor] = React.useState('primary'); ;
  const [color, setColor] = React.useState('#000000');
  const [Img, setImg] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [count, setCount] = React.useState('');
  const [category, setCat] = React.useState('');
  const [tempCat, setTCat] = React.useState('');
  const [CPU, setCPU] = React.useState('');
  const [GPU, setGPU] = React.useState('');
  const [RAM, setRAM] = React.useState('');
  const [Freq, setFreq] = React.useState('');
  const [ScreenType, setScType] = React.useState('');
  const [isSmart, setisSmart] = React.useState('');
  const [Reso, setReso] = React.useState('');
  const [AcType, setAcType] = React.useState('');
  const [Screen, setScreen] = React.useState('');
  const [name, setName] = React.useState('');
  const [selected_storage, set_selected_storage] = React.useState(null);
  const [selected_supplier, set_selected_supplier] = React.useState(null);
  const categories = [{ label: 'Laptops' }, { label: 'Mobiles' }, { label: 'Headphones' }, { label: 'Screens' }, { label: 'Accessories' }]
  const [pid, setPid] = React.useState(null);

  const handleCatChange = (e, v) => {
    setCat(v.label);
    setTCat(v.label)
   
  }
  const handleCPUChange = (e, v) => {
    setCPU(e.target.value);
  }
  const handleGPUChange = (e, v) => {
    setGPU(e.target.value);
  }
  const handleRAMChange = (event, v) => {
    event.target.value < 1
      ? (event.target.value = 1)
      :  setRAM(event.target.value);
  }
  const handleFreqChange = (event, v) => {
    event.target.value < 1
      ? (event.target.value = 1)
      : setFreq(event.target.value);

  }
  const handleResoChange = (e, v) => {
    setReso(e.target.value);
  }
  const handleTypeChange = (e, v) => {
    
    setScType(v.label);
  }
  const handleisSmartChange = (e, v) => {
    setisSmart(v.label);
  }
  const handleAcTypeChange = (e, v) => {
    setAcType(e.target.value);

  }
  const handleScreenChange = (event, v) => {
    event.target.value < 1
      ? (event.target.value = 1)
      : setScreen(event.target.value);
  }

  const handleImgChange = (event) => {
    if (validator.isURL(event.target.value)) {
      setURLcolor("primary")
    } else {
      setURLcolor("error")
    }
    setImg(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleCountChange = (event) =>
    event.target.value < 1
      ? (event.target.value = 1)
      : setCount(event.target.value)

  const handleSupplierChange = (event, val) => {
    set_selected_supplier(val);
  };
  const handleStorageChange = (event, val) => {
    set_selected_storage(val);
  };

  const handlePriceChange = (event) =>
    event.target.value < 1
      ? (event.target.value = 1)
      : setPrice(event.target.value);


    const Storages = [];
    const { data: stoData } = useFetch(
      "http://localhost:1444/api/v1/getStorages"
    );
    for (const sto of stoData) {
      Storages.push({
        label: sto.st_address,
        stid: sto.stid,
        currently_used: sto.currently_used,
        max_capacity: sto.max_capacity
      });
    };

  const Suppliers = [];
  const { data: supData } = useFetch(
    "http://localhost:1444/api/v1/getAllSuppliers"
  );
  for (const sup of supData) {
    Suppliers.push({
      label: sup.su_name,
      suid: sup.suid,
    });
  };

  const isLab = () => {
    return category == 'Laptops'
  }
  const isLabMob = () => {
    return category == 'Laptops' || category == 'Mobiles'
  }
  const ishead = () => {
    return category == 'Headphones'
  }
  const isscrenn = () => {
    return category == 'Screens'
  }
  const isAc = () => {
    return category == 'Accessories'
  }

 
    const getLast = async (e) => {
        try {
          const dataRes = await fetch(`http://localhost:1444/api/v1/getlastinserted`);
          const { data } = await dataRes.json();
          setPid(data[0]["LAST_INSERT_ID()"])
        } catch (error) {
          console.log(error);
        }
    } 
  useEffect(() => {
    if (pid==0)
    {
      getLast();
      return
    }
    
    const PostReq = async () => {
      //after adding the product we add its details to the according table
      console.log(pid)
      console.log(tempCat)
      if (tempCat == "Laptops") {
        const res2 = await fetch(`http://localhost:1444/api/v1/addlaptop`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pid: pid,
            gpu: GPU,
            ram: RAM,
            processor: CPU,
            screen: Screen,
          }),
        });
      }
      else if (tempCat == "Mobiles") {
        const res2 = await fetch(`http://localhost:1444/api/v1/addmobile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pid: pid,
            ram: RAM,
            processor: CPU,
            screen: Screen,
          }),
        });
      }

      else if (tempCat == "Screens") {
        const res2 = await fetch(`http://localhost:1444/api/v1/addscreen`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pid: pid,
            type: ScreenType,
            resolution: Reso,
            is_smart: isSmart
          }),
        });
      }

      else if (tempCat == "Headphones") {
        const res2 = await fetch(`http://localhost:1444/api/v1/addheadphone`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pid: pid,
            frequency: Freq,
          }),
        });
      }

      else if (tempCat == "Accessories") {
        console.log(pid)
        console.log(AcType)
        const res2 = await fetch(`http://localhost:1444/api/v1/addaccessory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pid: pid,
            type: AcType,
          }),
        });
      }
    }
    PostReq();
},[pid,Navigate])
  const handleSubmit = async (e) => {
    const res = await fetch(`http://localhost:1444/api/v1/addproduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name:name,
        price:price,
        color:color,
        count:count,
        selected_storage:selected_storage,
        su_id:selected_supplier.suid,
        img_link:Img
      }),
    });
   
 
  const { status } = await res.json();
  console.log(res)
  if (status === true) {
    getLast();

      selected_storage.currently_used = parseInt(selected_storage.currently_used) + parseInt(count)
      setURLcolor('primary')
      setIdcolor('primary')
      setColor('#000000')
      setImg('')
      setPrice('')
      setCount('')
      setCat('')
      setName('')
      set_selected_storage(null)
      set_selected_supplier(null)
      document.querySelector(".successD").classList.add("active");
      setTimeout(() => {
        document.querySelector(".successD").classList.remove("active");
      }, 3000);

    } else {
      document.querySelector(".FailD").classList.add("active");
      setTimeout(() => {
        document.querySelector(".FailD").classList.remove("active");
      }, 3000);
    }
    setTimeout(() => {
      Navigate(0)
    }, 3000);
  };


  return (
    <div className="New">
      <h3><span>Add New Product</span></h3>
      <form className='formAdd' onSubmit={(e) => {
        handleSubmit(e)
        e.preventDefault();
      }}>
        <TextField
          required
          fullWidth={false}
          id="outlined-required"
          value={name}
          onChange={handleNameChange}
          label="Product Name"

        />

        <Autocomplete
          disablePortal
          required
          clearOnEscape
          value={category}
          onChange={handleCatChange}
          id="combo-box-demo"
          options={categories}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Cateogry" />}
        />
        {isLabMob() &&
          <TextField
            required
            fullWidth={false}
            id="outlined-required"
            value={CPU}
            onChange={handleCPUChange}
            label="CPU"
          />}
        {isLabMob() &&
          <TextField
            required={true}
            id="outlined-number"
            label="RAM"
            type="number"
            value={RAM}
            onChange={handleRAMChange}
            InputLabelProps={{
              shrink: true,
              min: 0,
            }}
          />}
        {isLab() &&
          <TextField
            required
            fullWidth={false}
            id="outlined-required"
            value={GPU}
            onChange={handleGPUChange}
            label="GPU"
          />}
        {isLabMob() &&
          <TextField
            required={true}
            id="outlined-number"
            label="Screen Size"
            type="number"
            value={Screen}
            onChange={handleScreenChange}
            InputLabelProps={{
              shrink: true,
              min: 0,
            }}
          />
          }

        {ishead() &&
          <TextField
            required={true}
            id="outlined-number"
            label="Frequency"
            type="number"
            value={Freq}
            onChange={handleFreqChange}
            InputLabelProps={{
              shrink: true,
              min: 0,
            }}
          />
        }
        {isscrenn() &&
          <>
            <Autocomplete
              disablePortal
              required
              clearOnEscape
              value={ScreenType}
              onChange={handleTypeChange}
              id="combo-box-demo"
              options={[{ label: 'LED' }, { label: 'LCD' }, { label: 'OLED' }, { label: 'AMOLED' }]}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Type" />}
            />
            <TextField
              required
              fullWidth={false}
              id="outlined-required"
              value={Reso}
              onChange={handleResoChange}
              label="Resolution"
            />
            <Autocomplete
              disablePortal
              required
              clearOnEscape
              value={isSmart}
              onChange={handleisSmartChange}
              id="combo-box-demo"
              options={[{ label: 'YES' }, { label: 'NO' }]}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Is Smart?" />}
            />
          </>
        }
        {isAc() &&
          <>
            <TextField
              required
              fullWidth={false}
              id="outlined-required"
              value={AcType}
              onChange={handleAcTypeChange}
              label="Type"
            />
          </>
        }

        <Autocomplete
          disablePortal
          required
          value={selected_supplier}
          onChange={handleSupplierChange}
          id="combo-box-demo"
          options={Suppliers}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Supplier" />}
        />

        <Autocomplete
          disablePortal
          required
          value={selected_storage}
          onChange={handleStorageChange}
          id="combo-box-demo"
          options={Storages}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Storage" />}
        />
        <TextField
          required={true}
          id="outlined-number"
          label="Count"
          type="number"
          onChange={handleCountChange}
          InputLabelProps={{
            shrink: true,
            min: 0,
          }}
        />
        <FormControl>
          <TextField
            id="outlined-multiline-static"
            label="Image Link"
            multiline
            required={true}
            error={URLcolor == 'error'}
            rows={4}
            value={Img}
            onChange={handleImgChange}
          />
          {URLcolor == "error" && <span style={{ color: 'red', fontSize: 12, padding: 5 }}>*Invalid URL</span>}
        </FormControl>
        <FormControl>
          <InputLabel required={true} htmlFor="outlined-adornment-amount">Price</InputLabel>
          <OutlinedInput
            required={true}
            type="number"
            id="outlined-adornment-amount"
            value={price}
            onChange={handlePriceChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />

        </FormControl>
        <div className='colorpicker'>
          <label htmlFor="">Choose Color </label>
          <input className='colorp' type="color" value={color}
            onChange={(e) => { console.log(e.target.value); setColor(e.target.value) }}></input>
        </div>

        <button className='addP' type='submit' > Add Product</button>
        <div className='successD' style={{ color: 'green' }}>
          Product Added!
        </div>
        <div className='FailD' style={{ color: 'red' }}>
          Fail Addition!
        </div>
      </form>

    </div>


  );
}

export default AddProduct;