const GradientBlack = () => (
    <>
        <div className="fixed -top-20 w-screen h-1/3">
            <div className="h-full bg-opacity-70 bg-gradient-to-b from-black to-transparent"></div>
        </div>
        <div className="fixed -bottom-20 w-screen h-1/3">
            <div className="h-full bg-opacity-70 bg-gradient-to-b from-transparent to-black"></div>
        </div>
    </>
)

export default GradientBlack