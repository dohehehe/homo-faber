'use client';

import styled from '@emotion/styled';
import { memo } from 'react';
import theme from '@/styles/Theme';

const EditorArticle = styled.article`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`
const EditorPara = styled.p`
  font-family: var(--font-noto);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.7;
  letter-spacing: -0.01em;
  word-break: keep-all;
  margin: 0 0 16px;
  position: relative;

  & b {
    display: block;
    font-family: var(--font-gothic);
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.6;
    letter-spacing: -0.01em;
    margin-bottom: 12px;
    margin-top: 28px;
    text-indent: 0px;
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
  width: 100%;
  margin-top: 16px;
`

const EditorImg = styled.img`
  width: 100%;
  object-fit: contain;
  object-position: center;
  margin-top: 16px;
  border-radius: 4px;
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
