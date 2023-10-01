import { ReactNode } from "react";

const DashBordLayout = ({children}: {children: ReactNode}) => {
    return (
        <section>
            <nav>test</nav>
            {children}
        </section>
    )
}

export default DashBordLayout;