import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
const Footer: React.FC = () => {
  const defaultMessage = '我的世界将被摧毁';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '要不要访问我的GitHub？',
          title: '要不要访问我的GitHub？',
          href: 'https://github.com/ricoguo0228',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ricoguo0228',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
