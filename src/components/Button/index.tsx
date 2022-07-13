
interface Props{
    value: string
    type?: "button" | "submit" | "reset" | undefined
    onClick?: () => any | undefined | boolean
    className?: string
}

export default function Button ({value, type, onClick, className = 'lock w-full bg-violet-900 mt-5 py-2 rounded-2xl hover:bg-violet-800 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2'}: Props){
    return (
        <button type={type} onClick={onClick} className={className}>{value}</button>
    )
}