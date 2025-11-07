import "../css/Loader.css"

function Loader() {
    return (
        <div className="loading">
            <div className="movie-reel-loader">
                <div className="reel-rim"></div>
                <div className="reel-center"></div>
                <div className="reel-spokes">
                    <div className="reel-hole h1"></div>
                    <div className="reel-hole h2"></div>
                    <div className="reel-hole h3"></div>
                    <div className="reel-hole h4"></div>
                </div>
            </div>
            Loading movies...
        </div>
    )
}

export default Loader