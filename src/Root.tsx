import { Outlet, Link } from 'react-router-dom';

const Root = () => {
    const linkUrl = [{
        idx: 0,
        label: '틱택톡',
        url: 'tictactoe'
    }]

    return (
        <div>
            <header>
                <ul>
                    {linkUrl.map((item) => {
                        return <li key={item.idx}><Link to={item.url}>{item.label}</Link></li>
                    })}
                </ul>
            </header>
            <Outlet />
        </div>
    )
}

export default Root;