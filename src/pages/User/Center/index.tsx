import React, {useEffect, useRef, useState} from 'react';
import {getLoginUserUsingGet, updateUserUsingPost} from "@/services/yuapi-backend/userController";
import {Avatar, Button, Col, Descriptions,  Divider, message, Row} from "antd";
import UpdateUserInfo from "@/pages/User/Center/components/UpdateModal";
import {ActionType, ProColumns} from "@ant-design/pro-components";

const Center: React.FC = () => {
    const [loginUser, setLoginUser] = useState<API.UserVO>();
    const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const getUser = async () => {
        try {
            const res = await getLoginUserUsingGet();
            if (res.code !== 0) {
                message.error("获取用户失败！");
                return;
            }
            setLoginUser(res.data);
        } catch (error) {
            message.error("获取用户失败！");
        }
    }
    useEffect(() => {
        getUser();
    }, []);
    const columns: ProColumns<API.UserVO>[] = [
        {
            title: '用户名',
            dataIndex: 'userName',
            valueType: 'text',
            formItemProps: {
                rules: [{
                    required: true,
                }]
            }
        },
        {
            title: '性别',
            dataIndex: 'gender',
            valueType: 'text',
        },
        {
            title: '密码',
            dataIndex: 'userPassword',
            valueType: 'password',
        },
        {
            title: '确认密码',
            dataIndex: 'sureUserPassword',
            valueType: 'password',
        }]
    const handleUpdate = async (fields:API.UserVO) => {
        if (!loginUser) {
            return;
        }
        const hide = message.loading('修改中');
        try {
            await updateUserUsingPost({
                id: loginUser.id,
                ...fields
            });
            hide();
            message.success('操作成功');
            return true;
        } catch (error: any) {
            hide();
            message.error('操作失败，' + error.message);
            return false;
        }
    };
    return (
        <>
            <UpdateUserInfo
                onSubmit={async (value) => {
                    const success = await handleUpdate(value);
                    if (success) {
                        handleUpdateModalVisible(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
                onCancel={() => {
                    handleUpdateModalVisible(false);
                }}
                visible={updateModalVisible}
                values={loginUser || {}}
                columns={columns}/>
            <Row>
                <Col span={12}/>
                <Avatar size={128} src={loginUser?.userAvatar}/>
                <Divider/>
            </Row>
            <Row>
                <Descriptions title="个人信息" column={2}>
                    <Descriptions.Item label="用户名">{loginUser?.userName}</Descriptions.Item>
                    <Descriptions.Item label="性别">{loginUser?.gender===0?'女':'男'}</Descriptions.Item>
                    <Descriptions.Item label="公钥">{loginUser?.accessKey}</Descriptions.Item>
                    <Descriptions.Item label="私钥">{loginUser?.secretKey}</Descriptions.Item>
                </Descriptions>
            </Row>
            <Row>
                <Button onClick={()=>{
                    handleUpdateModalVisible(true);
                }}>修改个人信息</Button>
            </Row>
        </>
    );
};
export default Center;
