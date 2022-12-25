import Reactm from "react";
import MoonLoader from 'react-spinners/MoonLoader'

const Loader = ({ loading }) => {

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <MoonLoader
                color="#219be5"
                size={50}
                loading={loading}
            />
        </div>
    )
}

export default Loader