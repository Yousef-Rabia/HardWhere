const express= require('express');
const router =express.Router();
const {
  addNewEmployee,
  getCartProducts,
  decProductQtyinCart,
  incProductQtyinCart,
  deleteProductFromCart,
  getProductData,
  addToCart,
  getOffersData,
  addCustomer,
  check_GetDataUser,
  addOrder,
  getShippingCompData,
  getlabtops,
  getmobiles,
  getheadphones,
  getscreens,
  getaccessories,
  removeFromFavorites,
  addToFavorites,
  getFavorites,
  addSupplier,
  addShipping,
  addStorage,
  getEmployees,
  daleteEmpoyee,
  getDepartments,
  getAllProducts,
  getAllStorages,
  getAllSuppliers,
  addProduct,
  deleteProduct,
  updateProduct,
  filterBySupplier,
  filterByOffer,
  filterByPrice,
  searchProduct,
} = require("../controller/Controllers");


router.route("/Cart").get(getCartProducts);
router.route("/Cart/del/:id").delete(deleteProductFromCart);
router.route("/Cart/decQty/:id").patch(decProductQtyinCart);  
router.route("/Cart/incQty/:id").patch(incProductQtyinCart);  
router.route('/product/:id').get(getProductData);
router.route("/product/addtocart").post(addToCart);
router.route('/getOffers').get(getOffersData);
router.route("/signup").post(addCustomer);
router.route("/check_GetDataUser").get(check_GetDataUser);
router.route('/addtoOrders').post(addOrder);
router.route('/shippingCompany_Data').get(getShippingCompData);
router.route("/labtops").get(getlabtops);
router.route("/mobiles").get(getmobiles);
router.route("/headphones").get(getheadphones);
router.route("/screens").get(getscreens);
router.route("/accessories").get(getaccessories);
router.route("/addToFavorite").get(addToFavorites);
router.route("/removeFromFavorite").get(removeFromFavorites);
router.route("/getFavorite").get(getFavorites);
router.route("/addSupplier").post(addSupplier);
router.route("/addShipping").post(addShipping);
router.route("/addStorage").post(addStorage);
router.route("/getEmployees").get(getEmployees);
router.route("/deleteEmployee").delete(daleteEmpoyee);
router.route("/getDepartments").get(getDepartments);
router.route("/addNewEmployee").post(addNewEmployee);


//admin
router.route("/getAllProducts").get(getAllProducts);
router.route("/getAllStorages").get(getAllStorages);
router.route("/getAllSuppliers").get(getAllSuppliers);
router.route("/addProduct").post(addProduct);
router.route("/deleteProduct").delete(deleteProduct);
router.route("/deleteProduct").delete(deleteProduct);
router.route("/updateProduct").patch(updateProduct);

//filtering
router.route("/filterBySupplier").get(filterBySupplier);
router.route("/filterByOffer").get(filterByOffer);
router.route("/filterByPrice").get(filterByPrice);
router.route("/searchProduct").get(searchProduct);

module.exports=router;
