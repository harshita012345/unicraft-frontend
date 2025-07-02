import type { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
    <div className="layout-root">
        <header className="layout-header">
            <h2>Unicraft Company Directory</h2>
        </header>
        <main className="layout-main">{children}</main>
        <footer className="layout-footer">
            <small>&copy; 2025 Unicraft</small>
        </footer>
    </div>
);

export default Layout;