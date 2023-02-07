import Link from "next/link";
import {NavStyles, NavItems, SearchBar, SearchBox, SearchIcon} from "../styles/NavStyles";
import User from "./User";
import {AiOutlineSearch} from "react-icons/ai";

export default function Nav() {
  return (
    <NavStyles>
      <Link href="/">Paana.</Link>
        <NavItems>
            <SearchBox>
                <SearchBar placeholder={'"The Alchemist"'} type={'text'}></SearchBar>
                    <SearchIcon>
                        <AiOutlineSearch color={'white'}/>
                    </SearchIcon>
            </SearchBox>
        <User />
      </NavItems>
    </NavStyles>
  );
}
