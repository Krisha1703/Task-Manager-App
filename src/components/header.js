/*Header component*/

import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header className="flex justify-between items-center my-4">
            <span className="text-4xl font-bold">Task Manager</span>
            <Link href={"/"}>
                <Image src={"/user.png"} width={60} height={60} alt="user"/>
            </Link>
        </header>
    );
}

export default Header;