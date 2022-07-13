
interface Props{
    value: string
    type?: "button" | "submit" | "reset" | undefined
    onClick?: () => any | undefined | boolean
    className?: string
}

export default function Button ({value, type, onClick, className = 'bg-blue-400 hover:bg-violet-600 px-1.5 rounded mx-px'}: Props){
    return (
        <button type={type} onClick={onClick} className={className}>{value}</button>
    )
}