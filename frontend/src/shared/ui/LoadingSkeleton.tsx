interface Props {
  amount?: number;
  height?: string;
  itemStyle?: string;
  containerStyle?: string;
}

const LoadingSkeleton = ({
  amount = 1,
  height = "h-20",
  itemStyle = "",
  containerStyle = "",
}: Props) => {
  return (
    <div className={`w-full ${containerStyle}`}>
      {Array.from({ length: amount }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-gray-300 rounded ${height} ${itemStyle}`}
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton;