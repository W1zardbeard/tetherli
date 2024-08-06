import Logo from "../Logo";
import NavLink from "./NavLink";
// import CTAe from "./ctaExample";
import CTA from "../CTA";

export default function Navbar(){
    return(
        <div className="navbar">
            <Logo 
                large={true}
                width={146}
            />

            {/* <CTAe 
                type={false}
                text={"Link"}
            /> */}
            <div className="navLinksCont">
                <NavLink 
                    active={true}
                    text={"Links"}
                    imgSrc={"src/assets/icon-links-header.svg"}
                />

                <NavLink 
                    active={true}
                    text={"Profile Details"}
                    imgSrc={"src/assets/icon-profile-details-header.svg"}
                />
            </div>
            <CTA
                text={"Preview"}
                style={"secondary"}
            />
        </div>
    )
}