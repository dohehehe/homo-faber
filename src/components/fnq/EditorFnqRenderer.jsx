'use client';

import styled from '@emotion/styled';
import { memo } from 'react';
import theme from '@/styles/Theme';

const EditorArticle = styled.article`
  display: flex;
  flex-direction: column;
  // margin-left: 18px;  
  // max-width: 700px;
  max-width: 900px;
  justify-content: flex-start;
  padding-bottom: 100px;
  margin-top: 30px;
  border-top: dotted 2px rgb(209, 209, 209);
  padding: 30px 10px;

  ${theme.media.mobile} {
    margin: 30px 5px;
    margin-bottom: 100px;
    padding: 30px 5px;
  }
`
const EditorPara = styled.p`
  font-family: var(--font-gothic);
  font-weight: 400;
  font-size: 1.24rem;
  line-height: 1.88;
  letter-spacing: 0.01rem;
  word-break: keep-all;
  position: relative;
  margin-bottom: 10px;

  ${theme.media.mobile} {
    font-size: 1.2rem;
    line-height: 2;
  }

  & b {
    font-weight: 600;
    }
  }
`

const EditorImgWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
  width: 100%;
`

const EditorImg = styled.img`
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
`
const EditorImgCaption = styled.div`
  font-family: var(--font-gothic);
  margin-top: 6px;

  ${theme.media.mobile} {
    font-size: 0.9rem;
  }
`

function EditorInterviewRender({ item }) {

  return (
    <>
      <EditorArticle>
        {item?.map((block, idx) => (
          <div key={idx}>
            {block.type === 'paragraph' ? (
              <>
                <EditorPara dangerouslySetInnerHTML={{ __html: block.data.text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\n/g, '<br />').replace(/\*/g, '<span class="sticker">*</span>') }} />
              </>
            ) : (
              ''
            )}
            {block.type === 'image' ? (
              <EditorImgWrapper>
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
              </EditorImgWrapper>
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
