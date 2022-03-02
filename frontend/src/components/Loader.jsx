import React, {useState} from 'react'
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";

const override = css`
  display: block;
  margin: 0 auto;
`;

const Loader = () => {

    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#9333ea");
    
    return (
        <div className='w-100 flex items-center justify-center h-[100vh]'>
            <PropagateLoader color="#9333ea" loading={loading} css={override} size={30} />
        </div>
    )
}

export default Loader