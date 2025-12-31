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
        // ✅ EXPECTED when not logged in
        if (error.response?.status !== 401) {
            console.error("Unexpected auth error:", error);
        }
        setToken(null)
        setEntity(null)
    }finally {
        setReady(true)
    }
}