
interface Props{
    text1:string;
    text2:string;
}

function Title({text1,text2}:Props) {
  return (
    <div className="flex gap-2 justify-center items-center mb-3 max-sm:text-xl max-md:text-2xl max-lg:text-3xl max-xl:text-4xl max-2xl:text-5xl 2xl:text-6xl leading-relaxed font-bold">
        {text1} <span className="text-blue-600">{text2}</span>
        <p className="w-8 md:w-11 h-0.5 bg-[#414141]"></p>
    </div>
  )
}

export default Title