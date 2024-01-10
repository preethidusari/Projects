import Link from "next/link"

interface NavBarLinkProps {
    children: React.ReactNode,
    route: string,
    className: string | undefined
}

const NavbarLink = ({children, route, className} : NavBarLinkProps) => {
    return (
        <Link className={className} href={route}>
            {children}
        </Link>
    )
}
export default NavbarLink