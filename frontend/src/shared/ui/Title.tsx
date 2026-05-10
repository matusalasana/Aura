interface Props {
  txt1: string;
  txt2: string;
}

const Title = ({ txt1, txt2 }: Props) => {
  return (
    <div className="group flex flex-wrap items-center gap-x-3 gap-y-1 py-4">
      {/* Primary Text: High Contrast & Refined Weight */}
      <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
        {txt1}
      </h1>

      {/* Secondary Text: Gradient & Animation */}
      <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-3xl font-black tracking-tight text-transparent transition-all duration-300 group-hover:from-blue-500 group-hover:to-indigo-400 sm:text-5xl lg:text-6xl">
        {txt2}
      </span>
      
      {/* Optional Decorative Underline */}
      <div className="h-1.5 w-12 rounded-full bg-blue-500 transition-all duration-500 group-hover:w-24" />
    </div>
  );
};

export default Title;
