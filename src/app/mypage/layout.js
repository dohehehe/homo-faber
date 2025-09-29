import MypageEditContainer from '@/container/MypageEditContainer';
import MypageFnqDeatilContainer from '@/container/MypageFnqDeatilContainer';

export default function MyPageLayout({ children }) {
  return <>
    <MypageEditContainer />
    <MypageFnqDeatilContainer />
    {children}
  </>
}