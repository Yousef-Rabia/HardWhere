const express = require("express");
const router = express.Router();
const {
  addOrder_fluter,
  getStorages,
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
  getAllSuppliers,
  addProduct,
  deleteProduct,
  updateProduct,
  filterBySupplier,
  filterByOffer,
  filterByPrice,
  searchProduct,
  deleteShippingCompany,
  deleteFromStorages,
  updateEmployee,
  updateStorage,
  updateShipping,
  updateSupplier,
  updateUserData,
  getCustomer,
  getProductWithId,
  getStorageWithId,
  getOrders,
  addLaptop,
  addMobile,
  addAccessory,
  addHeadphone,
  addScreen,
  getLastInserted,
  updateFeedback,
  deleteFeedback,
  addFeedback,
} = require("../controller/Controllers");

//customer
router.route("/Cart").get(getCartProducts);
router.route("/Cart/del/:id").delete(deleteProductFromCart);
router.route("/Cart/decQty/:id").patch(decProductQtyinCart);
router.route("/Cart/incQty/:id").patch(incProductQtyinCart);
router.route("/product/:id").get(getProductData);
router.route("/product/addtocart").post(addToCart);
router.route("/getOffers").get(getOffersData);
router.route("/signup").post(addCustomer);
router.route("/check_GetDataUser").get(check_GetDataUser);
router.route("/addtoOrders").post(addOrder);
router.route("/shippingCompany_Data").get(getShippingCompData);
router.route("/labtops").get(getlabtops);
router.route("/mobiles").get(getmobiles);
router.route("/headphones").get(getheadphones);
router.route("/screens").get(getscreens);
router.route("/accessories").get(getaccessories);
router.route("/addToFavorite").post(addToFavorites);
router.route("/removeFromFavorite").get(removeFromFavorites);
router.route("/getFavorite").get(getFavorites);
router.route("/getCustomer").get(getCustomer);
router.route("/addOrder_fluter").post(addOrder_fluter);
router.route("/getOrders").get(getOrders);
router.route("/addFeedback").post(addFeedback);
router.route("/updateFeedback").patch(updateFeedback);
router.route("/deleteFeedback").delete(deleteFeedback);


//manager
router.route("/addSupplier").post(addSupplier);
router.route("/addShipping").post(addShipping);
router.route("/addStorage").post(addStorage);
router.route("/getEmployees").get(getEmployees);
router.route("/deleteEmployee").delete(daleteEmpoyee);
router.route("/getDepartments").get(getDepartments);
router.route("/addNewEmployee").post(addNewEmployee);
router.route("/deleteShippingCompany").delete(deleteShippingCompany);
router.route("/getStorages").get(getStorages);
router.route("/deleteFromStorages").delete(deleteFromStorages);
router.route("/updateEmployee").patch(updateEmployee);
router.route("/updateStorage").patch(updateStorage);
router.route("/updateShipping").patch(updateShipping);
router.route("/updateSupplier").patch(updateSupplier);

//admin
router.route("/getAllProducts").get(getAllProducts);
router.route("/getAllSuppliers").get(getAllSuppliers);
router.route("/addProduct").post(addProduct);
router.route("/deleteProduct").delete(deleteProduct);
router.route("/updateProduct").patch(updateProduct);

//filtering
router.route("/filterBySupplier/:su_id").get(filterBySupplier);
router.route("/filterByOffer").get(filterByOffer);
router.route("/filterByPrice/:min_price/:max_price").get(filterByPrice);
router.route("/searchProduct/:search_text").get(searchProduct);

//General user
router.route("/updateUserData").patch(updateUserData);

//helper apis
router.route("/getProductWithId").get(getProductWithId);
router.route("/getStorageWithId").get(getStorageWithId);

//Categories
router.route("/addLaptop").post(addLaptop);
router.route("/addMobile").post(addMobile);
router.route("/addScreen").post(addScreen);
router.route("/addAccessory").post(addAccessory);
router.route("/addHeadphone").post(addHeadphone);
router.route("/getLastInserted").get(getLastInserted);
module.exports = router;
