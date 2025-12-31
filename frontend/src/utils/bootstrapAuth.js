import axios from "axios";

export const bootstrapAuth = async ({
    refreshUrl,
    setToken,
    setEntity,
    setReady,
}) => {
    try {
        const response = await axios.post(refreshUrl, {} , {withCredentials : true})

        setToken(response.data.data.accessToken)
        setEntity(response.data.data.user || response.data.data.captain)
    } catch (error) {
        // not logged in → do nothing
        setToken(null)
        setEntity(null)
    }finally {
        setReady(true)
    }
}