import api from "../../api"

async function getOrder(order_id:string, authorization:string) {
    return await api.get("/order/detail/" + order_id, {
        headers: {
        Authorization: authorization
    }})
    .then((result) => {
        return result.data
    })
    .catch((error) => {
        return console.log(error);
        
    })
}

export default {getOrder}