import { Link } from 'react-router-dom';

const navBar = () => {
    return (
        <nav style={{ display: 'flex', gap: '12px', padding: '12px', borderBottom: '1px solid #ccc' }}>
            <Link to='/'>Home</Link>
            <Link to='/users'>Users</Link>
            <Link to='/count'>Counter</Link>
            <Link to='/data'>Data</Link>
            <Link to='/navigate'>Navigate</Link>
        </nav>
    )
}

export default navBar;
