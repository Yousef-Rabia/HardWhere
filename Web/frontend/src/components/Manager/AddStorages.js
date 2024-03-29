import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import validator from "validator";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

const AddStorage = () => {
  const [err, seterr] = React.useState(true);
  const [Address, setAddress] = React.useState("");
  const [MaxCapacity, setCapacity] = React.useState(1);
  const handleAddressChange = (e) => {
    seterr(false);
    setAddress(e.target.value);
    if (e.target.value === "") seterr(true);
  };
  const handleCapacityChange = (event) => {
    event.target.value < 1
      ? (event.target.value = 1)
      : setCapacity(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:1444/api/v1/addStorage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: Address,
        max_capacity: MaxCapacity,
      }),
    });
    const { status } = await res.json();
    if (status === true) {
      setCapacity("");
      setAddress("");
      document.querySelector(".addedSuccessfully").classList.add("active");
      setTimeout(() => {
        document.querySelector(".addedSuccessfully").classList.remove("active");
      }, 3000);
    } else {
      document.querySelector(".tryagain").classList.add("active");
      setTimeout(() => {
        document.querySelector(".tryagain").classList.remove("active");
      }, 3000);
    }
  };
  return (
    <div className="addA">
      <h3>
        <span>Add Storage</span>
      </h3>
      <form
        action=""
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          gap: "15px",
          
        }}
        
        className="AddSupp"
      >
        <TextField
          id="outlined-basic"
          onChange={handleAddressChange}
          sx={{ width: "300px" }}
          required
          label="Address"
          variant="outlined"
          value={Address}
        />
        <FormControl>
          <InputLabel required={true} htmlFor="outlined-adornment-amount">
            Maximum Capacity
          </InputLabel>
          <OutlinedInput
            required={true}
            type="number"
            id="outlined-adornment-amount"
            value={MaxCapacity}
            onChange={handleCapacityChange}
            label="Maximum Capacity"
          />
        </FormControl>

        <button
          className="addP"
          disabled={err}
          type="submit"
          onClick={handleSubmit}
        >
          {" "}
          Add Storage
        </button>
        <div className="addedSuccessfully">Supplier Added Successfully</div>
        <div className="tryagain">Supplier Added Successfully</div>
      </form>
    </div>
  );
};

export default AddStorage;
