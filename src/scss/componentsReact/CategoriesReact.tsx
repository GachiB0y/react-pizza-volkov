import React from 'react';

type CategoriesProps = { value: number; onChangeCat: (i: number) => void };
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые', 'Женя'];

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCat }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((catName, indexvalue) => (
          <li
            key={indexvalue}
            onClick={() => onChangeCat(indexvalue)}
            className={value === indexvalue ? 'active' : ''}>
            {catName}
          </li>
        ))}
      </ul>
    </div>
  );
});
