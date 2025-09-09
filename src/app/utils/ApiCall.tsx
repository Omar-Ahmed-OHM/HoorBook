import axios from 'axios'
export const ApiCall = async (url: string, method: string = 'GET', data: any = null, headers: Record<string, string> = {}) => {
    try {
        const respoonse=await axios({
            url,
            method,
            data,
            headers
        });
        return respoonse;
    }
        catch(err){
            console.log(err);
            throw err;
        }
}