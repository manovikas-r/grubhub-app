import { GET_OWNER, UPDATE_OWNER } from "./types";
import backendServer from "../webConfig"
import axios from "axios";

export const getOwner = () => dispatch => {
    axios.get(`${backendServer}/grubhub/profile/restaurant/${localStorage.getItem("user_id")}`)
        .then(response => response.data[0])
        .then(owner => dispatch({
            type: GET_OWNER,
            payload: owner
        }))
        .catch(error => {
            console.log(error);
        });
}

export const updateOwner = (ownerProfileData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/grubhub/profile/restaurant`, ownerProfileData)
        .then(response => response.data)
        .then(data => {
            if (data === 'RESTAURANT_UPDATED') {
                localStorage.setItem("name", ownerProfileData.name);
                alert("Profile Updated Successfully!");
            }
            return dispatch({
                type: UPDATE_OWNER,
                payload: data
            })
        })
        .catch(error => {
            console.log(error);
        });
}