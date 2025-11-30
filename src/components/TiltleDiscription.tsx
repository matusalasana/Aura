
interface Props{
    text: string;
}

function TiltleDiscription({text}:Props) {
  return (
    <div className="text-gray-600 text-lg text-center max-sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%]">{text}</div>
  )
}

export default TiltleDiscription