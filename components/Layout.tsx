import Header from "./Header"
import { MenuIcon, XIcon } from "./icons/InterfaceIcons"
import Sidebar from "./Sidebar"
import { useState } from "react"
import { PropsWithChildren } from "react"


export const Layout: React.FC<PropsWithChildren> = ({children}) => {

    const [isSidebarOpen, toggle] = useState<boolean>(false);

    const toggleSiderbar = () => toggle(!isSidebarOpen)


    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <div className="lg:hidden fixed top-4 left-4 z-30">
                <button onClick={toggleSiderbar} className="p-2 bg-primary-600 text-white rounded-md">
                    {isSidebarOpen ? <XIcon /> : <MenuIcon />}
                </button>
            </div>

            <Sidebar isOpen={isSidebarOpen} setIsOpen={toggle} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}