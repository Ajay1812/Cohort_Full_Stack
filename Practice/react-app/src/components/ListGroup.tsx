import { useState } from "react";
import { CiViewList } from "react-icons/ci";

interface Props {
  items: string[]
  heading: string
  onSelectItem: (item: string) => void
}
function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  return (
    <>
      <h1 style={{ margin: '10px' }}><CiViewList color="brown" />{heading}</h1>
      {/* {items.length === 0 ? <p>No item found </p> : null} */}
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group" style={{ border: "2px solid black", width: "400px", padding: "10px", margin: "10px" }}>
        {items.map((item, index) => (
          <li
            key={item}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item)
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
