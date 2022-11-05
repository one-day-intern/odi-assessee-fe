import React, { useRef, useState } from "react";
import styles from "./Searchbar.module.css";
import SearchIcon from "@components/shared/svg/SearchIcon";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Searchbar: React.FC<React.PropsWithChildren<Props>> = ({
  setFilter,
  filter,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  return (
    <div
      data-testid="SearchEmailContainer"
      className={`${styles.search} ${focused ? styles.focused : ""}`}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <SearchIcon color="grey" />
      <input
        data-testid="SearchEmail"
        ref={inputRef}
        type="text"
        placeholder="Search your inbox"
        value={filter}
        onChange={(e) => setFilter(e.currentTarget.value.trim())}
      />
      <AnimatePresence>
        {filter !== "" && (
          <motion.button
            data-testid="ClearSearch"
            style={{ position: "absolute" }}
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            whileTap={{ scale: 1.2 }}
            onClick={() => {
              setFilter("");
              inputRef?.current?.focus();
            }}
            className={`${styles.clear}`}
          >
            &times;
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Searchbar;
