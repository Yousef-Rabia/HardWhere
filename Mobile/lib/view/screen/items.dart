import 'package:conditional_builder_null_safety/conditional_builder_null_safety.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:get/get.dart';
import 'package:hexcolor/hexcolor.dart';

import '../../controller/items_controller.dart';
import '../../core/constans/color.dart';

class Items extends StatelessWidget {
  const Items({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    ItemsControllerImp ItemsController = Get.put(ItemsControllerImp());

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: () {
            Get.back();

          },
          icon: const Icon(Icons.arrow_back_ios_new_outlined,color: Colors.black,),

        ),
        title: Row(
          children: [
             Container(
               height: 40,
               child: Padding(
                padding:  EdgeInsets.symmetric(horizontal: 8.0),
                child: Image(image: AssetImage('assets/images/logo.png')),
            ),
             ) ,
            const Text('HardWhere'),
          ],
        ),

      ),
      body:  GetBuilder<ItemsControllerImp>(builder: (GetxController controller) =>ConditionalBuilder(
        condition: ItemsController.selectedCat!=null&&ItemsController.lists.isNotEmpty&&ItemsController.lists[ItemsController.selectedCat!].isNotEmpty,
        builder: (BuildContext context) {
          return ListView(
            children: [
              SizedBox(height: 40,
                child: ListView.separated(
                  separatorBuilder: (context, index) =>
                  const SizedBox(width: 10),
                  itemCount: ItemsController.categoriesName.length,
                  scrollDirection: Axis.horizontal,
                  itemBuilder: (context, index) {
                    return InkWell(
                      onTap: (){
                        ItemsController.changeCat(index, "0");
                      },
                      child: GetBuilder<ItemsControllerImp>(builder: (GetxController controller) =>Container(
                        decoration: (ItemsController.selectedCat== index)! ? const BoxDecoration(
                          border: Border(
                            bottom: BorderSide(width: 3,color: AppColor.primaryColor),
                          ),
                        ):null,
                        child: Padding(
                          padding: const EdgeInsets.all(5.0),
                          child: Text(
                              ItemsController.categoriesName[index],
                              style: TextStyle(
                                  fontSize: 20, color: HexColor("444444"),
                                  fontWeight: FontWeight.bold)
                          ),
                        ),
                      ),),
                    );
                  },
                ),),
              GetBuilder<ItemsControllerImp>(builder: (controller) {
                return GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount:controller.length[controller.selectedCat!]??0,
                    gridDelegate:
                    const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2, childAspectRatio: 0.7),
                    itemBuilder: (BuildContext context, index) {
                      return InkWell(
                          onTap: (){
                            controller.goToProduct(controller.lists[controller.selectedCat!][index]["pid"]);
                          },
                          child: Card(
                            child: Padding(
                              padding: const EdgeInsets.all(10),
                              child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Hero(
                                      tag: "${controller.lists[controller.selectedCat!][index]["pid"]}",
                                      child: Image(
                                        image:
                                        NetworkImage(controller.lists[controller.selectedCat!][index]["img_link"]),
                                        height: 100,
                                        fit: BoxFit.fill,
                                      ),
                                    ),
                                    SizedBox(height: 10) ,
                                    Text(controller.lists[controller.selectedCat!][index]["product_name"],//itemsModel.itemsName!,
                                        style: TextStyle(
                                            color:Colors.black,
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold)),
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text("Rating ${controller.lists[controller.selectedCat!][index]["p_value"]} ", textAlign: TextAlign.center),
                                                                                   RatingBarIndicator(

                                                                                        rating: double.parse(controller.lists[controller.selectedCat!][index]["p_value"]),

                                                                                        itemBuilder: (context, index) => const Icon(

                                                                                          Icons.star,

                                                                                          color: Colors.amber,

                                                                                        ),

                                                                                        itemCount: 5,

                                                                                        itemSize: 15.0,

                                                                                        direction: Axis.horizontal,

                                                                                      ),
                                      ],
                                    ),
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text("${controller.lists[controller.selectedCat!][index]["price"]}\$",//"${itemsModel.itemsPrice} \$",
                                            style: TextStyle(
                                                color: AppColor.primaryColor,
                                                fontSize: 16,
                                                fontWeight: FontWeight.bold,
                                                fontFamily: "sans")),
                                        // IconButton(
                                        //     onPressed: () {},
                                        //     icon: Icon(
                                        //       CupertinoIcons.heart_fill,
                                        //       color: Colors.red,
                                        //     ))
                                      ],
                                    )
                                  ]),
                            ),
                          ));

                    });
              },),

            ],
          );
        },
        fallback: (BuildContext context) {
          return const Center(
            child: CircularProgressIndicator(),
          );
        },
      ),
    )
    );
  }
}



