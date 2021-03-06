import * as React from 'react';
import { toJS } from 'mobx';
import { Modal } from 'antd';

import styled from '@/styles';
import { API } from '@/service';
import { UploadPro } from '@/components/common';
import { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface';

interface IUploadProps extends IClassName {
  uploads: Array<UploadFile | ArticleStore.UploadedFile | string>;
  token: string;
  changeArticle: ArticleStore.IChangeArticle;
  removeUploadFile: ArticleStore.IRemoveUploadFile;
}

class Upload extends React.Component<IUploadProps> {
  public onChangeUpload = (fileInfo: UploadChangeParam) => {
    this.props.changeArticle({ uploads: fileInfo.fileList });
  };

  public onRemoveUpload: any = (file: UploadFile) =>
    new Promise((resolve, reject) => {
      Modal.confirm({
        title: 'Warning',
        content: '是否删除上传？',
        okText: 'ok',
        okType: 'danger',
        cancelText: 'no',
        onOk: () => {
          if (file.response) {
            resolve(this.props.removeUploadFile(file.response.data._id));
          } else {
            resolve(this.props.removeUploadFile((file as any)._id));
          }
        },
        onCancel: () => {
          reject(false);
        }
      });
    });

  public render() {
    const { className, token, uploads } = this.props;

    return (
      <div className={className}>
        <UploadPro
          token={token}
          action={`${API}/upload/article`}
          isUrl={true}
          uploads={toJS<any[]>(uploads)}
          onChange={this.onChangeUpload}
          onRemove={this.onRemoveUpload}
        />
      </div>
    );
  }
}

export default styled(Upload)`
  padding: 6px;
`;
