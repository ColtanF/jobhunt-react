import React, { useState } from "react";
import { Menu } from "semantic-ui-react";

const Categories = ({ categories, filter }) => {
  const [activeBtn, setActiveBtn] = useState("all");
  return (
    <Menu secondary>
      {categories.map((cat, index) => {
        return (
          <Menu.Item
            name={cat}
            active={activeBtn === cat}
            key={index}
            onClick={() => {
              filter(cat);
              setActiveBtn(cat);
            }}
          />
        );
      })}
    </Menu>
  );
};

export default Categories;
