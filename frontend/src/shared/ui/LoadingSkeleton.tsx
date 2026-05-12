interface Props {
  amount?: number;
  height?: string;
  style?: string;
}

const LoadingSkeleton = ({
  amount = 1,
  style = "flex flex-wrap gap-5 w-full",
  height = "h-20",
}: Props) => {
  return (
    <div className={style}>
      {Array.from({ length: amount }).map((_, i) => (
        <div
          key={i}
          className={`skeleton w-full ${height}`}
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton;