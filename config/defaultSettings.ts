import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#52C41A',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '开发者民工乐园',
  pwa: false,
  logo: 'https://avatars.githubusercontent.com/u/113654954?v=4',
  iconfontUrl: '',
};

export default Settings;
