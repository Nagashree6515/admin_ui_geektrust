import { useState, useEffect, useCallback } from "react"
import { useSnackbar } from "notistack"
import axios from "axios"
import {API_DATA} from "../Components/constants"
/**
 * 
 * @param {string} url  - API  endpoint to be connect to backend or api endpoint
 * @returns {array} data - array of the response received from the backend or api endpoint
 */

const useFetch = () => {

    // state to set the data to be returned
    const [data, setData] = useState([])
    // snackbar from notistack
    const { enqueueSnackbar } = useSnackbar()

    /**
     * Displays the snackbar
     * @param {string} msg - the message to be displayed
     * @param {string} variant - sets the color of the snackbar
     */


    const showSnackBar = (msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
            snackbarprops: 'data-role="alert"'

        })
    }

    /**
     * Function to fetch data from backend / api endpoint using axios
     * @returns {null}
     */

    const fetchData = useCallback(() => {
        try {
            axios.get(API_DATA)
                .then((data) => {
                    setData(data.data)
                })
                .catch((err) => {
                    showSnackBar('Network Error', 'error')
                })
        } catch (err) {
            showSnackBar('Something went wrong', 'error')
        }
    },[API_DATA])

    //use effect

    useEffect(() => {
        fetchData(API_DATA)
    }, [API_DATA, fetchData])


    return [data]
}


export default useFetch