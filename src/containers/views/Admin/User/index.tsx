import * as React from 'react';
import { Input, Form, Table, Button, Avatar, Modal } from 'antd';
import { API } from '@/service';
import { Upload } from '@/components/common';
import { PermissionMap } from '@/constants/map';
import { ComponentExtends } from '@/utils/extends';
import { observer } from 'mobx-react';
import { FormItemLayout } from '@/constants';

const FormItem = Form.Item;

interface IUserProps extends IClassName {
  userInfoForm: UserStore.IUserInfoForm;
  token: string;
  changeUserInfo: UserStore.IChangeUserInfo;
  userList: UserStore.IUserInfo[];
  getUserList: () => void;
}

@observer
class User extends ComponentExtends<IUserProps> {
  public onChangeAvatar = (url: string) => {
    this.props.changeUserInfo({ avatar: url });
  };

  public onChangeUser = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.changeUserInfo({ [key]: e.target.value });
  };

  public onDelete = (row: UserStore.IUserInfo) => async () => {
    Modal.confirm({
      title: 'Warning',
      content: 'Bla bla ...',
      okText: 'ok',
      okType: 'danger',
      cancelText: 'no',
      onOk: async () => {
        const res = await this.userApi$$.removeUser({ _id: row._id });
        if (res.code === 0) {
          this.$message.success(res.msg);
          this.props.getUserList();
        } else {
          this.$message.error(res.msg);
        }
      }
    });
  };

  public render() {
    const { userInfoForm, token, userList } = this.props;

    const columns = [
      {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text: any, record: any, index: any) => <Avatar shape="square" icon="user" src={text} />
      },
      {
        title: 'Name',
        dataIndex: 'username',
        key: 'name'
      },
      {
        title: 'Permission',
        dataIndex: 'permission',
        key: 'permission',
        render: (text: any, record: any, index: any) => PermissionMap.get(text)
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text: any, record: any, index: any) => {
          if (text.permission === 0 || userInfoForm.permission < text.permission) {
            return <span>-</span>;
          } else {
            return (
              <Button type="danger" onClick={this.onDelete(text)}>
                Delete
              </Button>
            );
          }
        }
      }
    ];
    return (
      <div>
        <div>
          <h6>User</h6>
          <Form>
            <FormItem {...FormItemLayout} label="Avatar">
              <Upload
                action={`${API}/upload`}
                token={token}
                onChange={this.onChangeAvatar}
                imgURL={userInfoForm.avatar}
              />
            </FormItem>
            <FormItem {...FormItemLayout} label="Username">
              <Input placeholder="" defaultValue={userInfoForm.username} onChange={this.onChangeUser('username')} />
            </FormItem>
            <FormItem {...FormItemLayout} label="Old Password">
              <Input type="password" placeholder="" onChange={this.onChangeUser('oldPassword')} />
            </FormItem>
            <FormItem {...FormItemLayout} label="New Password">
              <Input type="password" placeholder="" onChange={this.onChangeUser('newPassword')} />
            </FormItem>
          </Form>
        </div>
        <div className="userline" />

        <div className="userlist">
          <Table columns={columns} dataSource={userList} pagination={false} />
        </div>
      </div>
    );
  }
}

export default User;