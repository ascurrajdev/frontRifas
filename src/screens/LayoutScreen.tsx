import React, { useEffect, useState } from 'react';
import {
  CreditCardOutlined,
  CopyOutlined,
  PieChartOutlined,
  TeamOutlined,
  ProfileOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { userStore } from '../store/userStore';

const { Content, Footer, Sider, Header } = Layout;

type MenuItem = Required<MenuProps>['items'][number];


function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

type MenuItemSelected = {
    key: React.Key,
    keyPath: string[]
}
type MenuKey = {
    url: string,
    key: React.Key
}
export const LayoutScreen: React.FC = () => {
  const userName = userStore()?.user?.name
  const items: MenuItem[] = [
    getItem('Inicio', JSON.stringify({url:'/',key:'inicio'}), <PieChartOutlined />),
    getItem('Clientes', JSON.stringify({url:'/clients',key:'clientes'}) , <TeamOutlined />),
    getItem('Rifas', JSON.stringify({url:'/raffles',key:'rifas'}), <CopyOutlined />),
    getItem('Movimientos', JSON.stringify({url:'/transactions',key:'movimientos'}), <CreditCardOutlined />),
    getItem(userName,JSON.stringify({url:'/profile',key:'perfil'}),<UserOutlined />,[
      getItem("Ver Perfil",JSON.stringify({url:'/profile',key:'view-perfil'})),
      getItem("Cerrar Sesion",JSON.stringify({url:'/logout',key:'logout'}), <LogoutOutlined />),
    ])
  ];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [current, setCurrent] = useState<string[]>([])
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setCurrent(items.filter((value) => {
      let currentData = JSON.parse(value?.key?.toString() || "")
      return currentData?.url == location.pathname
    }).map(value => value?.key?.toString() || ""));
  },[location]);
  const onSelectMenu = (item: MenuItemSelected) => {
    let pathInfo: MenuKey = JSON.parse(item.keyPath[0]);
    navigate(pathInfo.url)
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} selectedKeys={current} mode="inline" items={items} onSelect={onSelectMenu} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[{title:'Inicio'},{title:'Rifas'}]}></Breadcrumb>
          <div style={{padding: 24, height: '100%', background: colorBgContainer}}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Desarrollado por <a href="https://www.ascurrajdev.co">ascurrajdev</a></Footer>
      </Layout>
    </Layout>
  );
};