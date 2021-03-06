import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as actions from './action';
import { StyledWrapper } from '../../globalStyles/common';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Message from '../../components/Message';
import * as s from './commonStyle';
import ConfirmComp from '../../components/Modal/confirm';
import { getCategory } from '../../utils/api';
import { i18nTxt, auth, commonPropTypes, getStatus, downLink, i18n } from '../../utils/index';
import { BOUNTY_STATUS_ENUM } from '../../constants';

const Wrapper = styled(StyledWrapper)`
  padding: 40px;
  h1 {
    font-size: 32px;
    margin: 0;
    margin-bottom: 35px;
  }
  .subject {
    font-weight: 500;
  }
  .bounty-title {
    margin-top: 12px;
  }
  .category-wrap {
    display: flex;
  }
  .category-wrap-select {
    flex: 1;
  }
  .category-wrap-select:first-child {
    margin-right: 12px;
  }
  .input-field {
    margin-bottom: 0px;
  }
  .materialize-textarea {
    height: 100px;
    margin-top: 12px;
    margin-bottom: 0;
  }
  .status-tips {
    margin-bottom: 40px;
  }
`;

function fmtLabel(item) {
  return {
    ...item,
    label: i18nTxt(item.name),
    value: item.id,
  };
}

class EditBounty extends Component {
  constructor(...args) {
    super(...args);
    const { history, clearEdit, pageType, getBounty, getCategory: getc } = this.props;
    if (!auth.loggedIn()) {
      history.push('/signin');
      return;
    }

    getc();

    if (history.action === 'PUSH') {
      clearEdit();
    }
    if (pageType === 'edit') {
      getBounty();
      document.title = i18nTxt('Edit Bounty');
    } else {
      document.title = i18nTxt('Create A New Bounty');
    }
  }

  render() {
    const { categoryL1List, editState, updateEdit, categoryMap, pageType, doSubmit, uploadFile, history } = this.props;

    let statusDiv;
    if (editState.status === BOUNTY_STATUS_ENUM.REVIEWING) {
      statusDiv = (
        <div className="status-tips">
          <Message type="message-notice-light">
            {i18nTxt('bounty is')} {getStatus(editState.status)}
          </Message>
        </div>
      );
    } else if (editState.status === BOUNTY_STATUS_ENUM.PENDING) {
      statusDiv = editState.redoMessage && (
        <div className="status-tips">
          <Message type="message-important">{editState.redoMessage}</Message>
        </div>
      );
    } else if (editState.status === BOUNTY_STATUS_ENUM.FINISHED) {
      statusDiv = (
        <div className="status-tips">
          <Message type="message-success">
            {i18nTxt('bounty has')} {getStatus(editState.status)}
          </Message>
        </div>
      );
    } else if (editState.status === BOUNTY_STATUS_ENUM.EXPIRED) {
      statusDiv = (
        <div className="status-tips">
          <Message type="message-important">
            {i18nTxt('bounty has')} {getStatus(editState.status)}
          </Message>
        </div>
      );
    } else if (editState.status) {
      statusDiv = (
        <div className="status-tips">
          <Message type="message-notice">
            {i18nTxt('bounty is')} {getStatus(editState.status)}
          </Message>
        </div>
      );
    }

    return (
      <Wrapper>
        <h1>{pageType === 'create' ? i18nTxt('Create New Bounty') : i18nTxt('Edit Bounty')} </h1>
        {statusDiv}
        <div className="subject">{i18nTxt('Subject')}:</div>
        <div>
          <Input
            {...{
              className: 'bounty-title',
              errMsg: i18nTxt(editState.titleErrMsg),
              id: 'bounty-title',
              value: editState.title,
              label: i18nTxt('Title'),
              placeHolder: '',
              onChange: e => {
                updateEdit({
                  title: e.target.value,
                  titleErrMsg: '',
                });
              },
            }}
          />
        </div>
        <div className="category-wrap">
          <div className="category-wrap-select">
            <Select
              {...{
                label: i18nTxt('Category'),
                onSelect: v => {
                  updateEdit({
                    categoryL1Id: v.value,
                    l1ErrMsg: '',
                  });
                },
                options: categoryL1List.map(fmtLabel),
                selected: {
                  value: editState.categoryL1Id,
                },
                errMsg: i18nTxt(editState.l1ErrMsg),
              }}
            />
          </div>
          <div className="category-wrap-select">
            <Select
              {...{
                label: i18nTxt('Subcategory'),
                onSelect: v => {
                  updateEdit({
                    categoryL2Id: v.value,
                    l2ErrMsg: '',
                  });
                },
                options: (categoryMap[editState.categoryL1Id] || []).map(fmtLabel),
                selected: {
                  value: editState.categoryL2Id,
                },
                errMsg: i18nTxt(editState.l2ErrMsg),
              }}
            />
          </div>
        </div>

        <textarea
          value={editState.description}
          className={`materialize-textarea ${editState.descriptionErrMsg ? 'invalid' : ''}`}
          placeholder={i18nTxt(
            'Please describe the item you would like to create/improve, expected results, timeline, acceptance criterias, etc. To make the approval process easier, please clearly describe your Bounty'
          )}
          onChange={e => {
            updateEdit({
              description: e.target.value,
              descriptionErrMsg: '',
            });
          }}
        />
        {editState.descriptionErrMsg && <span className="helper-text" data-error={i18nTxt(editState.descriptionErrMsg)}></span>}

        <div className="clearfix">
          <div style={{ float: 'left', marginBottom: 20 }}>
            <s.AttachmentDiv>
              {editState.attachmentList.map(v => {
                const removeFile = () => {
                  const attachmentListCopy = editState.attachmentList.slice();
                  const curIndex = attachmentListCopy.indexOf(v);
                  attachmentListCopy.splice(curIndex, 1);
                  updateEdit({
                    attachmentList: attachmentListCopy,
                  });
                };
                return (
                  <div className="attachment-line">
                    {downLink(v.url, v.title)}
                    <button className="material-icons dp48" onClick={removeFile} type="button">
                      cancel
                    </button>
                  </div>
                );
              })}
              <label className="add-attachment" htmlFor="bounty-add-attachment">
                <i className="material-icons">add</i>
                <span>{i18nTxt('Attachments')}</span>
                <input id="bounty-add-attachment" type="file" onChange={uploadFile} />
              </label>
            </s.AttachmentDiv>
          </div>

          <div style={{ float: 'right' }}>
            <s.ExampleDiv
              role="button"
              onClick={() => {
                updateEdit({
                  descExampleShow: true,
                });
              }}
            >
              <i className="example" />
              <span>{i18nTxt('Bounty Example')}</span>
            </s.ExampleDiv>
          </div>
        </div>

        <div className="subject">{i18nTxt('Private message')}:</div>

        <textarea
          className={`materialize-textarea ${editState.privateMessageErr ? 'invalid' : ''}`}
          placeholder={i18nTxt('Describe bounty rewards, distribution and other private messages solely to conflux team (Optional)…')}
          value={editState.privateMessage}
          onChange={e => {
            updateEdit({
              privateMessage: e.target.value,
              privateMessageErr: '',
            });
          }}
        />
        {editState.privateMessageErr && <span className="helper-text" data-error={i18nTxt(editState.privateMessageErr)}></span>}

        <div className="clearfix">
          <div style={{ float: 'right' }}>
            <s.ExampleDiv
              onClick={() => {
                updateEdit({
                  privateMsgExampleShow: true,
                });
              }}
            >
              <i className="example" />
              <span>{i18nTxt('Private Message Example')}</span>
            </s.ExampleDiv>
          </div>
        </div>

        <div className="subject">{i18nTxt('Conflux team can reach to you via')}:</div>

        <Input
          {...{
            errMsg: editState.contactMessageErr,
            id: 'bounty-contact',
            value: editState.contactMessage,
            label: i18nTxt('Your preferred social network'),
            placeHolder: '',
            onChange: e => {
              updateEdit({
                contactMessage: e.target.value,
                contactMessageErr: '',
              });
            },
          }}
        />

        <s.SubmitDiv>
          <label>
            <input
              onChange={() => {
                updateEdit({
                  agreeLicence: !editState.agreeLicence,
                  agreeLicenceErr: '',
                });
              }}
              type="checkbox"
              className="filled-in"
              checked={editState.agreeLicence}
            />
            <span>
              {i18nTxt('I accept bounty')}

              <a target="/terms" href="/terms" style={{ marginLeft: 5, marginRight: 5 }}>
                {i18nTxt('Terms')}
              </a>
              {i18nTxt('and')}
              <a target="/policy" href="/policy" style={{ marginLeft: 5, marginRight: 5 }}>
                {i18nTxt('Policy')}
              </a>
              {i18nTxt('of Conflux Bounty')}
            </span>
          </label>
          <button
            onClick={() => {
              doSubmit({ pageType, history });
            }}
            className="btn waves-effect waves-light primary"
            type="button"
          >
            {i18nTxt('SUBMIT')}
          </button>
        </s.SubmitDiv>

        {editState.agreeLicenceErr && <span className="helper-text form-err-msg">{i18nTxt(editState.agreeLicenceErr)}</span>}

        <ConfirmComp
          confirmBtns={
            <button
              className="agree"
              type="button"
              onClick={() => {
                updateEdit({
                  descExampleShow: false,
                });
              }}
            >
              {i18nTxt('GOTCHA')}
            </button>
          }
          show={editState.descExampleShow}
          content={i18n('bounty.faq')}
          title={i18nTxt('Bounty Example')}
          wrapStyle={{
            width: '400px',
          }}
        />
        <ConfirmComp
          confirmBtns={
            <button
              className="agree"
              type="button"
              onClick={() => {
                updateEdit({
                  privateMsgExampleShow: false,
                });
              }}
            >
              {i18nTxt('GOTCHA')}
            </button>
          }
          show={editState.privateMsgExampleShow}
          content={i18n('bounty.faq.private')}
          title={i18nTxt('Private Message Example')}
          wrapStyle={{
            width: '400px',
          }}
        />
      </Wrapper>
    );
  }
}

const categoryType = {
  id: PropTypes.string,
  name: PropTypes.string,
};

EditBounty.propTypes = {
  getCategory: PropTypes.func.isRequired,
  updateEdit: PropTypes.func.isRequired,
  pageType: PropTypes.string.isRequired,
  categoryL1List: PropTypes.arrayOf(categoryType).isRequired,
  categoryMap: PropTypes.objectOf({
    id: PropTypes.arrayOf(categoryType),
  }).isRequired,
  editState: PropTypes.objectOf({
    title: PropTypes.string,
  }).isRequired,
  doSubmit: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  clearEdit: PropTypes.func.isRequired,
  getBounty: PropTypes.func.isRequired,
  history: commonPropTypes.history.isRequired,
};

function mapStateToProps(state) {
  return {
    categoryL1List: state.common.categoryL1List,
    categoryMap: state.common.categoryMap,
    editState: state.bounty.editBounty,
  };
}

export default connect(
  mapStateToProps,
  {
    ...actions,
    getCategory,
  }
)(EditBounty);
