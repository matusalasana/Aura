
const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-baseline space-x-1">
        <h1 className="
          text-3xl font-black tracking-tighter
          text-gray-900 dark:text-white
        ">
          Aura
        </h1>

        {/* Simple accent dot */}
        <span className="
          h-2 w-2 rounded-full
          bg-purple-600
        " />
      </div>
    </div>
  );
};

export default Logo;