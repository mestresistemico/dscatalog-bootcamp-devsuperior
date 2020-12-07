import react from 'react';
import './styles.scss';

const Navbar = () => (
    <nav className="admin-nav-container">
        <ul>
            <li>
                <a href="link" className="admin-nav-item">Meus Produtos</a>
            </li>
            <li>
                <a href="link" className="admin-nav-item active">Minhas Categorias</a>
            </li>
            <li>
                <a href="link" className="admin-nav-item">Meus Usuários</a>
            </li>
        </ul>

    </nav>
);

export default Navbar;