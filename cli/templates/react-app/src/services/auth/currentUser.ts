import API from "@/api/api";
import type { User } from "@/types/auth"


const CURRENT_USER  = async (token : string) :  Promise<User | null> =>  {

    const response = await API.get(`/user`,
        {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        }
    );

    return response.data
    
}


export default CURRENT_USER