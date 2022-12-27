import 'package:get/get.dart';

abstract class ProductController extends GetxController {
  void incCount();
  void decCount();
}

class ProductControllerImp extends ProductController {
 // late ItemsModel itemsModel;
int count=1;


  intialData() {
    //itemsModel = Get.arguments['itemsmodel'];
  }


  @override
  void onInit() {
    intialData();
    super.onInit();
  }

  @override
  void decCount() {
    count++;
    update();
  }

  @override
  void incCount() {
    if(count>1) {
      count--;
    }
    update();
  }
}