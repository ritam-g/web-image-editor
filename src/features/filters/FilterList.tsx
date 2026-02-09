import type { Filters, FilterType } from "../../types/editor";

interface FilterListProps {
  filters: Filters;
  onFilterChange: (name: FilterType, value: number) => void;
}

export function FilterList({ filters, onFilterChange }: FilterListProps) {
  return (
    <div className="right">
      <h2>Filters</h2>
      <div className="filters">
        {Object.entries(filters).map(([name, config]) => (
          <div key={name} className="filter">
            <p>{name}</p>
            <input
              type="range"
              min={config.min}
              max={config.max}
              value={config.value}
              onChange={(e) => onFilterChange(name as FilterType, Number(e.target.value))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
