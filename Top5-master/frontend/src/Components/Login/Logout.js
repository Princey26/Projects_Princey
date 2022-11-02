import { useState } from "react";
import {Redirect} from "react-router-dom";
export default function Logout(){
    // const [time , setTime] = useState(false);
    return(
        <>
            {sessionStorage.clear()}
            {/* {window.location.reload()} */}
            <Redirect to="/login" />

        </>
    )
}

// export {time};
