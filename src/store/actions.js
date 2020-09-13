import { ADD_COUNT, ADD_TO_CART } from './mutation-types.js'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //payload 新添加的商品
      //1.查找之前数组中是否有该商品
      let product = context.state.cartList.find(item => item.iid === payload.iid)
      //2.判断product
      if (product) {
        context.commit(ADD_COUNT, product);
        resolve("当前的数量加1");
      } else{
        payload.count = 1;
        context.commit(ADD_TO_CART, payload)
        resolve("添加了新的商品")
      }
    })
  }
}