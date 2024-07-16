import "./index.css"

const Sidebar = () => {
    return (
        <div className="sidebar-cont">
            <h1 className="sidebar-head">Hi, Welcome to Syoft<span className="title"></span></h1>
            <h3>Your Crendentials:</h3>
            <div className="info">
                <p className="sidebar-para">
                    Email: <span className="cred"> skr@gmail.com</span>
                </p>
                <p>Password: <span className="cred">3086</span></p>


            </div>

        </div>
    )


}


export default Sidebar