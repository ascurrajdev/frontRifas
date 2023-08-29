import React, { useEffect, useState } from 'react';
import {
  CreditCardOutlined,
  CopyOutlined,
  PieChartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Content, Footer, Sider } = Layout;

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

const items: MenuItem[] = [
  getItem('Inicio', JSON.stringify({url:'/',key:'inicio'}), <PieChartOutlined />),
  getItem('Clientes', JSON.stringify({url:'/clients',key:'clientes'}) , <TeamOutlined />),
  getItem('Rifas', JSON.stringify({url:'/raffles',key:'rifas'}), <CopyOutlined />),
  getItem('Movimientos', JSON.stringify({url:'/transactions',key:'movimientos'}), <CreditCardOutlined />),
];
type MenuItemSelected = {
    key: React.Key,
    keyPath: string[]
}
type MenuKey = {
    url: string,
    key: React.Key
}
export const LayoutScreen: React.FC = () => {
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
      <Layout style={{
        background: colorBgContainer
      }}>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Inicio</Breadcrumb.Item>
          </Breadcrumb>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Desarrollado por <a href="https://www.ascurrajdev.co">ascurrajdev</a></Footer>
      </Layout>
    </Layout>
  );
};