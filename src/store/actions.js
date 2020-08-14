import { ADD_COUNT, ADD_TO_CART } from './mutation-types.js'

export default {
  addCart(context, payload) {
    //payload 新添加的商品
    //1.查找之前数组中是否有该商品
    let product = context.state.cartList.find(item => item.iid === payload.iid)
    //2.判断product
    if (product) {
      context.commit(ADD_COUNT, product)
    } else{
      payload.count = 1;
      context.commit(ADD_TO_CART, payload)
    }
  }
}