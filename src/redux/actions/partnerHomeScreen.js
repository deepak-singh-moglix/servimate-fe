import axios from 'axios'
import { local_url, prod_url } from '../../config/constant'


const loader = (data) => {
    return {
        type: "SET_LOADER",
        payload: data
    }
}

export const setBanners = (data) => {
    return {
        type: "PARTNER_SET_BANNERS",
        payload: data
    }
}

//ADD BANNER
export const addBanners = (_data, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Post",
                url: prod_url + "partner/api/v1/homeScreen/banner",
                data: _data
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "PARTNER_SET_BANNER",
                    payload: data.response
                })
                cb()
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("ADD BANNER ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//GET BANNERS
export const getBanners = () => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Get",
                url: prod_url + "partner/api/v1/homeScreen/banner",
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch(setBanners(data.response))
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("GET ABANDONED CART ", err.response.data)
            alert(err.response.data.message)
        }
    }
}

//PARTNER DELETE BANNER
export const partnerDeleteBanner = (id, cb) => {
    return async (dispatch) => {
        try {
            dispatch(loader(true))
            const { data } = await axios({
                method: "Delete",
                url: prod_url + `partner/api/v1/homeScreen/banner/${id}`,
            })
            dispatch(loader(false))
            if (data.success) {
                dispatch({
                    type: "PARTNER_DELETE_BANNER",
                    payload: data.response
                })
                cb()
            } else {
                alert(data.message)
            }
        }
        catch (err) {
            dispatch(loader(false))
            console.log("PARTNER DELETE BANNER ", err.response.data)
            alert(err.response.data.message)
        }
    }
}
