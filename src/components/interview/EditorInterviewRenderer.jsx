'use client';

import styled from '@emotion/styled';
import { memo } from 'react';
import theme from '@/styles/Theme';

const EditorArticle = styled.article`
  display: flex;
  flex-direction: column;
  margin-left: 28px;
  margin-bottom: 200px;

  ${theme.media.tablet} {
    margin: 0 14px;
    margin-bottom: 100px;
  }
`
const EditorPara = styled.p`
  font-family: var(--font-noto);
  font-weight: 400;
  font-size: 1.42rem;
  line-height: 1.91;
  letter-spacing: 0.01rem;
  word-break: keep-all;
  margin-left: 11dvw;
  text-indent: 80px;
  position: relative;

  ${theme.media.tablet} {
    font-size: 1.25rem;
    line-height: 1.95;
    margin-left: 45px;
    text-indent: -40px;
  }

  & b {
    display: block;
    font-family: var(--font-gothic);
    font-weight: 700;
    font-size: 1.35rem;
    line-height: 1.72;
    letter-spacing: 0.03rem;
    margin-bottom: 35px;
    margin-top: 200px;
    margin-left: -11dvw;
    margin-right: 2dvw;
    text-indent: 0px;

    ${theme.media.tablet} {
        font-size: 1.17rem;
        line-height: 1.9;
        margin-bottom: 10px;
        margin-top: 150px;
        text-indent: 0;
        margin-left: -42px;
        margin-right: 0;
    }
  }

  & .sticker{
    cursor: pointer;
    position: relative;
    z-index: 99;
    color: red;
    font-weight: 900;
    margin-top: -20px;
    top: -3px;

    &:hover ~ i{
      display: inline;
      width: 100%;
      height: 100%;
      position: sticky;
    }
  }

  & i {
    position: relative;
    width: 0px;
    height: 0px;
    margin: unset;
    margin-left: -12px;
    margin-top: 2px;
    font-size: 1rem;
    padding: 17px 0px 19px 18px;
    z-index: 10;
    display: none;
    text-indent: 0;
    transition: all .4s;

    &:hover{
    position: sticky;
      display: inline;
      width: 100%;
      height: 100%;
    }

    &::before{
      content: '(';
    }
    &::after{
      content: ')';
    }
  }

  & mark {
    background: none;
    position: relative;
    text-decoration: unset;
  }
`

const EditorImgWrapper = styled.div`
  width: calc(100% - 11dvw - 5px);
  max-height: 500px;
  margin-left: auto;
  margin-top: 40px;
`

const EditorImg = styled.img`
  width: 100%;
  // max-height: auto
  object-fit: contain;
  padding-left: 12dvw;
  object-position: top right;
  margin-top: 40px;
`
const EditorImgCaption = styled.div`
  font-family: var(--font-gothic);
  margin-top: 6px;
  text-align: right;
  opacity: 0.5;

  ${theme.media.tablet} {
    font-size: 0.9rem;
  }
`

function EditorInterviewRender({ item }) {

  return (
    <>
      <EditorArticle>
        {item.map((block, idx) => (
          <div key={idx}>
            {block.type === 'paragraph' ? (
              <>
                <EditorPara dangerouslySetInnerHTML={{ __html: block.data.text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\n/g, '<br />').replace(/\*/g, '<span class="sticker">*</span>') }} />
              </>
            ) : (
              ''
            )}
            {block.type === 'image' ? (
              <>
                <EditorImg src={block.data.file.url} alt={block.data.caption ? block.data.caption : 'Image'} />
                {block.data.caption ? (
                  <EditorImgCaption
                    dangerouslySetInnerHTML={{
                      __html: block.data.caption.replace(/\n/g, '<br />'),
                    }}
                  />
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </div >
        )
        )
        }
      </EditorArticle >
    </>
  )
}

export default memo(EditorInterviewRender);
