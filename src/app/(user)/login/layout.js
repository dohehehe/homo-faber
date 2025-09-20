import FindPasswordContainer from '@/container/FindPasswordContainer';

export default function RootLayout({ children }) {
  return (
    <>
      <FindPasswordContainer />
      {children}
    </>
  );
}