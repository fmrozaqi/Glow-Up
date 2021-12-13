type Props = {
    handleClick: (e?: any) => void,
    children: JSX.Element,
};

const ButtonCenter = ({handleClick, children }: Props) => {
    return (
        <button
            onClick={handleClick}
            className="
            w-16 h-16 bg-white 
            shadow-lg backdrop-blur

            before:w-16 before:bg-white
            before:rounded-[50%/10%]
            before:top-[-10%] before:bottom-[-10%]
            before:fixed before:left-0 before:z-[-1]

            after:h-16 after:bg-white
            after:rounded-[10%/50%]
            after:left-[-10%] after:right-[-10%]
            after:fixed after:top-0 after:z-[-1]
        "
        >
            { children }
        </button>
    )
}

export default ButtonCenter