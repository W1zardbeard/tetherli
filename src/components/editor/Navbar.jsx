import Logo from "../Logo";
import NavLink from "./NavLink";

export default function Navbar(){
    return(
        <div className="navbar">
            <Logo 
                large={true}
                width={146}
            />
            <NavLink 
                active={true}
            />
        </div>
    )
}