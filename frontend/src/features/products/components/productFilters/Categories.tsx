import { useCategories } from "../../../home/hooks/useCategories";

interface Props {
  categoriesFilters: string[];
  setCategories: (category: string) => void;
}

const Categories = ({
  categoriesFilters,
  setCategories,
}: Props) => {
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useCategories();

  const handleCategoryChange = (category: string) => {
    setCategories(category);
  };

  if (isError) {
    return <p>Failed to load categories</p>;
  }

  return (
    <div className="space-y-4 text-xs">
      <h3 className="font-bold uppercase tracking-widest">
        Categories
      </h3>

      <div className="space-y-3">
        {categories.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              disabled={isLoading}
              type="checkbox"
              checked={categoriesFilters.includes(item.id)}
              onChange={() =>
                handleCategoryChange(item.id)
              }
            />

            <span>{item.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Categories;