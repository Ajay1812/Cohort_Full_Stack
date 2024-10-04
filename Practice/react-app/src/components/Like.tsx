import { useState } from "react";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";

interface Props {
  onClick: () => void
}

const Like = ({ onClick }: Props) => {
  const [status, setStatus] = useState(false)
  const toggle = () => {
    setStatus(!status)
    onClick()
  }
  if (status) return <FcLike size={30} onClick={toggle} />
  return <FaRegHeart size={30} onClick={toggle} />
}

export default Like
