import React, { useEffect, useState } from 'react';
import {
  CreditCardOutlined,
  CopyOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import type { BreadcrumbProps, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { userStore } from '../store/userStore';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';

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
type BreadcrumbPropsCustom = {
  title: string,
  href?: string
}
export const LayoutScreen: React.FC = () => {
  const userName = userStore()?.user?.name
  const logout = userStore((state) => state.logout)
  const items: MenuItem[] = [
    getItem('Inicio', JSON.stringify({url:'/',label:'Inicio',key:'inicio'}), <PieChartOutlined />),
    getItem('Clientes', JSON.stringify({url:'/clients',label:'Clientes',key:'clientes'}) , <TeamOutlined />),
    getItem('Rifas', JSON.stringify({url:'/raffles',key:'rifas',label:'Rifas'}), <CopyOutlined />),
    getItem('Movimientos', JSON.stringify({url:'/transactions',key:'movimientos',label:'Movimientos'}), <CreditCardOutlined />),
    getItem(userName,JSON.stringify({url:'/profile',key:'perfil',label:'Perfil'}),<UserOutlined />,[
      // getItem("Ver Perfil",JSON.stringify({url:'/profile',key:'view-perfil'})),
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
  const [breadcrumbItems,setBreadcrumbItems] = useState<BreadcrumbPropsCustom[]>();
  useEffect(() => {
    setCurrent(items.filter((value) => {
      let currentData = JSON.parse(value?.key?.toString() || "")
      return currentData?.url == location.pathname
    }).map(value => value?.key?.toString() || ""));
  },[location]);
  const onSelectMenu = async (item: MenuItemSelected) => {
    let pathInfo: MenuKey = JSON.parse(item.keyPath[0]);
    if(pathInfo.key == 'logout'){
      await logout()
    }else{
      navigate(pathInfo.url)
    }
  }
  useEffect(() => {
    if(location.pathname == "/"){
      setBreadcrumbItems([{
        title:'Home',
        href:"/"
      }])
    }else{
      setBreadcrumbItems(location.pathname.split("/").slice(1).map((path: string,index: number, values: string[]) => ({
        title: path[0].toUpperCase() + path.slice(1).toLowerCase(),
        href: "/" + values.slice(0,index+1).join("/")
      })))
    }
  },[location.pathname])
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} selectedKeys={current} mode="inline" items={items} onSelect={onSelectMenu} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems} />
          <div style={{padding: 24, height: '100%', background: colorBgContainer}}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Desarrollado por <a href="https://www.ascurrajdev.co">ascurrajdev</a></Footer>
      </Layout>
    </Layout>
  );
};