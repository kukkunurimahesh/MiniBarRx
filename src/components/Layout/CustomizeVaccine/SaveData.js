import axios from "axios";

const apiUrl = 'http://192.168.2.220/minibarRx-Demo/mbrxApi/saveMbrxData.php';

export const saveMbrxData = (orderData) => {
	return (dispatch) => {
		return axios.post(apiUrl,orderData).then(response => {
			console.log("Came to save mbrx data");
			console.log(response)
			dispatch(createPostSuccess(orderData,response.data))
		}).catch(error => {
			throw(error);
		})
	}
}

export const createPostSuccess = (orderData,resData) => {
	return {
		type : 'SAVE_SUCC',
		payload : {
			order_data : orderData,
			resp_data : resData
		}
	}
};