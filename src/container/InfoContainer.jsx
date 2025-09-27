import { useEffect } from 'react';
import * as S from '@/styles/info/infoContainer.sytle';
import Timeline from '@/components/info/Timeline';
import Supporter from '@/components/info/Supporter';
import Link from 'next/link';

function InfoContainer({ onLoadComplete }) {
  useEffect(() => {
    if (onLoadComplete) {
      onLoadComplete();
    }
  }, [onLoadComplete]);

  return (
    <S.InfoWrapper>
      <S.InfoPageName>소개</S.InfoPageName>



      <S.InfoPageContent>
        <S.Infoh1>산림동의 만드는 사람들: 호모 파베르 HOMO FABER</S.Infoh1>
        <S.Infoh3><b>호모 파베르(Homo Faber)</b>는 “도구를 만드는 인간” 또는 “기술적 인간”을 뜻하는 라틴어로 철학자 앙리 베르그송이 인간을 정의하는 개념으로 제시했으며, 그는 인간의 본질을 도구를 만들고 사용하는 능력에서 찾는다.</S.Infoh3>

        <S.Infoh2>청계천·을지로 산림동의 기억과 역사,<br /> 만드는 것이 좋은 사람들의 이야기</S.Infoh2>

        <S.InfoArticle>
          <S.InfoSubTitle>만드는 것을 좋아하는 사람들</S.InfoSubTitle>
          <S.InfoPara>흔히 청계천·을지로라 부르는 산림동에 수십 년간 쇠를 다루고, 기계를 만들어온 사람들이 있다. 이들은 만들고 개발하는 것을 사랑하는 사람들이며, 우리나라 제조업과 기계 개발의 뿌리와 같은 존재들이다. 이들에게 청계천의 의미를 물었더니 “고향”, “나의 전부”, “놀이터”라고 말했다. 산림동은 청계천 지역 소공장 지대에서 금속제조업 밀도가 가장 높은 지역으로 60년 이상의 역사를 자랑하며, 이 지역 제조업 장인들의 평균 업력은 45년이 넘는다. 무엇보다 산림동의 기술자들은 만드는 것을 좋아한다. 동료들과 이야기 나누며, 모르는 것은 물어보고, 일손이 부족하면 서로 거들어주고, 괜스레 참견하는 가족이다.</S.InfoPara>
          <S.InfoPara>하지만 무책임한 재개발 탓에 이들의 삶의 터전과 숙련된 기술이 급격히 사라지면서, 이들의 추억도 함께 사라지고 있다. 책의 주인공들이 40–50년간 일해온 산림동은 2025년 9월 경 철거를 앞두고 있으며, 2025년 8월 기준 약 200명 중 이주 단지에 입주하게 된 17개의 공장을 제외한 다수 공장들은 다른 지역으로 이전하거나 폐업했다. 리슨투더시티와 청계천을지로보존연대는 단순히 변화를 관찰하는 것을 넘어, 그 변화 속에서 이 사람들과 기술을 지키기 위해 상인들과 함께 목소리를 내고 이들의 가치를 연구해 왔으며, 이번 책을 통해 잘못된 도시 계획이 앗아가는 가치를 질문한다. 또한, 을지로 산림동에서 평생을 바쳐 ‘만들어온’ 사람들의 이야기를 담아내고, 동시에 그들이 흩어진 후에도 계속해서 고객들과 연결될 수 있도록 책과 기술자와 소비자를 이어주는 홈페이지를 제작하는 데 목적이 있다. </S.InfoPara>
          <S.InfoPara>「산림동의 만드는 사람들: 호모 파베르 HOMO FABER」는 청계천·을지로 제조업 생태계를 중심으로 한국 산업 발전의 산증인이자, 10대부터 60–80대까지 손으로 기술을 익혀온 산림동 제조업 기술자 38명의 인터뷰를 담고 있다. 또한 제조업 현장 용어, 재개발 역사 및 투쟁 연혁, 지역 변천사를 담았다. 좁은 골목 사이로 들어선 공장들, 그 안에서 일하는 사람들의 모습을 담은 사진들이 수록되어 있으며, 각 제조 분야별 기술의 특성과 작업이 구체적으로 설명되어 있다. 수십 년간 축적된 제조업 종사자들의 기술과 노하우로 이루어진 청계천 산업 생태계는 한국 산업 발전의 가장 단단한 밑바탕이 되었다. </S.InfoPara>

          <S.InfoSubTitle>산림동상공인연합회의 투쟁 </S.InfoSubTitle>
          <S.InfoPara>그러나 2018년 세운 3-1, 4, 5구역(입정동)을 시작으로 산림동 5-1, 3구역에서 진행되고 있는 재개발은 이들의 삶의 터전을 파괴하고 산업 생태계를 와해하고 있다. </S.InfoPara>
          <S.InfoPara>
            산림동의 기술자들과 상인들은 부당한 재개발 절차에 대응하기 위하여 2019년 3월 14일 산림동상공인연합회를 조직한다. 상공인연합회는 청계천을지로보존연대, 3구역 및 수표의 상인들, 한국산업용재협회와의 수많은 회의를 통하여 청계천 산업 생태계 보존을 위한 방안을 논의했다. 상공인연합회는 영구임대 상가를 쟁취하기 위해 행진, 집회, 기자회견뿐만 아니라, 상인들을 보호하기 위한 강제퇴거 방지를 위한 협약서를 준비해 왔다. 뿐만 아니라 중구청 주제 하에 구청, 시행사, 상공인연합회, 보존연대가 사전협의체를 진행하여 합리적 대안을 만들어갔다.</S.InfoPara>
          <S.InfoPara>
            산림동 투쟁의 가장 큰 결실 중 하나는 산림동상공인연합회가 우리나라 최초로 〈도시정비형 재개발사업 강제명도·퇴거 방지를 위한 협약〉을 중구, 시행사와 맺었다는 사실이다(중구청, 2024). 재개발 지역에서는 시행사가 사업시행인가 전후로 임대인에게 보상비를 더 줄 테니 세입자를 미리 내쫓아 달라고 요청하는 사례가 빈번하게 발생하며 대부분의 세입자들은 무대책으로 쫓겨나는 경우가 대부분이다. 이를 방지하기 위해 세운 5-3구역에서 〈강제퇴거 방지 협약서〉를 작성하였고 상인들 보호에 큰 힘이 되었다. 3년 이상 중구, 시행사, 세입자, 청계천을지로보존연대가 함께 논의하여 만들어진 풀뿌리 도시 계획의 결실이라 할 수 있다. </S.InfoPara>
          <S.InfoPara>
            또한 산림동상공인연합회는 지난한 투쟁 끝에 2020년 3월 4일 약 300평 부지의 영구 임대 상가를 서울시로부터 약속받았다. 서울시가 5-1, 3구역을 제외한 나머지 지역은 개발을 해제하고 도심 산업 재생을 하기로 계획을 발표해 우리는 산업 생태계를 지킬 수 있는 희망이 생겼다(서울특별시, 2020).</S.InfoPara>
          <S.InfoPara>
            그런데 박원순 시장이 사망한 이후 오세훈 시장이 취임하면서 그 전임시장의 계획을 무마해 버렸다. 시민들과 상인들의 요청에 의해 시행사, 중구청, 서울시가 논의하여 도심문화산업센터 건립 예정이었으나, 오세훈시장이 세운상가를 철거하고 그 자리에 공원을 만들겠다는 계획을 발표하면서 영구임대상가가 축소되고 고층 빌딩 뒤쪽으로 이동하게 되었다. 상공인연합회와 보존연대는 끊임없이 오세훈 시장과 면담을 추진했으나 단 한 번도 만나지 못했고, 일방적으로 건물 계획이 축소되면서 애써 투쟁한 산림동상공인연합회 회원들의 상당수가 다른 곳으로 이주하게 되었다. 그러나 이것이 끝이 아니다. 보존연대는 다시금 이 약속이 지켜질 수 있도록 서울시에 강력히 요구하고 있으며 5구역을 금속제조의 중심지로 만들고자 한다.</S.InfoPara>

          <S.InfoSubTitle>청계천은 나의 고향</S.InfoSubTitle>
          <S.InfoPara>
            대다수 기술자들은 40년 넘게 청계천에서 생활해 왔다. 옆집에 숟가락이 몇 개 있는지 다 알 정도로 가까운 동료들이 겨우 빌딩 하나 때문에 흩어져야 한다. 재개발은 이들의 공장뿐만 아니라 이들의 추억과 친구들도 앗아가고 있다. 산림동에서 청년기 꼬마(견습생) 시절을 거쳐, 결혼도 하고, 함께 아이를 기르고, 첫째 둘째 시집, 장가가는 것도 함께 지켜본 사이는 동료나 친구라는 말로도 부족하다. 이 책은 손으로 기술을 익혀온 사람들의 경험과 지혜를 통해 대기업 중심의 산업사에서 소외되는 소규모 제조업의 역할과 가치를 발견한다. 이는 예술적 가치를 지닌 아트북일 뿐만 아니라 민속학적 가치가 있는 자료가 될 것이다.</S.InfoPara>
          <S.InfoPara>
            청계천을지로보존연대를 믿고 함께 연대해 주신 산림동의 기술자들, 한대식 회장님 및 임원들, 회원님들께 진심으로 존경의 말씀을 올린다. 비록 어려운 상황에서도 상인들의 이야기를 들어주고 협약식을 현실화하는데 공헌한 안병석 국장님, 임해원 주무관님께도 감사의 말씀을 드린다.</S.InfoPara>
          <S.InfoParaLink>
            <Link href="https://www.ohmynews.com/NWS_Web/iRoom/articles/news_list.aspx?MEM_CD=00772030" target="_blank">*산림동과 관련된 기고문은 <span>이곳</span>에서 더 읽어보실 수 있습니다</Link>
          </S.InfoParaLink>
        </S.InfoArticle>

        <S.Infoh2>청계천·을지로의 재개발 투쟁사</S.Infoh2>
        <Timeline />
        <S.Infoh2 style={{ textAlign: 'center' }}>후원자</S.Infoh2>
        <Supporter />


        <S.Infoh2 style={{ textAlign: 'center' }}>참여자</S.Infoh2>

        <S.InfoCreditsTable>
          <tbody>
            <S.InfoCreditsTableTr>
              <S.InfoCreditsTableTh><b style={{ fontWeight: '900' }}>기획·제작</b></S.InfoCreditsTableTh>
              <S.InfoCreditsTableTd><b style={{ fontWeight: '900' }}><Link href="https://listentothecity.org/" target="_blank">리슨투더시티 Listen to the City</Link></b></S.InfoCreditsTableTd>
            </S.InfoCreditsTableTr>
            <S.InfoCreditsTableTr>
              <S.InfoCreditsTableTh>글</S.InfoCreditsTableTh>
              <S.InfoCreditsTableTd>박은선</S.InfoCreditsTableTd>
            </S.InfoCreditsTableTr>
            <S.InfoCreditsTableTr>
              <S.InfoCreditsTableTh>인터뷰</S.InfoCreditsTableTh>
              <S.InfoCreditsTableTd>박은선, 최혁규, 안근철</S.InfoCreditsTableTd>
            </S.InfoCreditsTableTr>
            <S.InfoCreditsTableTr>
              <S.InfoCreditsTableTh>녹취</S.InfoCreditsTableTh>
              <S.InfoCreditsTableTd>조예진, 한승아, 김다빈, 김보경, 곽도희, 박은선, 안영웅, 정다혜, 추민아, 황재현</S.InfoCreditsTableTd>
            </S.InfoCreditsTableTr>
            <S.InfoCreditsTableTr>
              <S.InfoCreditsTableTh>편집</S.InfoCreditsTableTh>
              <S.InfoCreditsTableTd>조예진, 한승아</S.InfoCreditsTableTd>
            </S.InfoCreditsTableTr>
            <S.InfoCreditsTableTr>
              <S.InfoCreditsTableTh>교정·교열</S.InfoCreditsTableTh>
              <S.InfoCreditsTableTd>조예진, 한승아, 김다빈, 김보경, 김은재, 김지한, 곽도희, 박은선, 안영웅, 이민규, 정다혜, 정재영, 황재현</S.InfoCreditsTableTd>
            </S.InfoCreditsTableTr>
            <S.InfoCreditsTableTr>
              <S.InfoCreditsTableTh>사진 촬영</S.InfoCreditsTableTh>
              <S.InfoCreditsTableTd>박은선, 최혁규, 안영웅, 조예진, 이혜연</S.InfoCreditsTableTd>
            </S.InfoCreditsTableTr>
            <S.InfoCreditsTableTr>
              <S.InfoCreditsTableTh>사진 편집</S.InfoCreditsTableTh>
              <S.InfoCreditsTableTd>안영웅, 이민규</S.InfoCreditsTableTd>
            </S.InfoCreditsTableTr>
            <S.InfoCreditsTableTr>
              <S.InfoCreditsTableTh>영상 촬영</S.InfoCreditsTableTh>
              <S.InfoCreditsTableTd>정다혜, Liron, 엄선호, 조서영, 닐스</S.InfoCreditsTableTd>
            </S.InfoCreditsTableTr>
            <S.InfoCreditsTableTr>
              <S.InfoCreditsTableTh>지도 제작</S.InfoCreditsTableTh>
              <S.InfoCreditsTableTd>김은재, 박은선</S.InfoCreditsTableTd>
            </S.InfoCreditsTableTr>
            <S.InfoCreditsTableTr>
              <S.InfoCreditsTableTh>디자인·개발</S.InfoCreditsTableTh>
              <S.InfoCreditsTableTd>곽도희</S.InfoCreditsTableTd>
            </S.InfoCreditsTableTr>
            <S.InfoCreditsTableTr>
              <S.InfoCreditsTableTh>개발 도움</S.InfoCreditsTableTh>
              <S.InfoCreditsTableTd>김나라</S.InfoCreditsTableTd>
            </S.InfoCreditsTableTr>
            <S.InfoCreditsTableTr>
              <S.InfoCreditsTableTh>자료 관리</S.InfoCreditsTableTh>
              <S.InfoCreditsTableTd>박은선, 조예진, 정재영</S.InfoCreditsTableTd>
            </S.InfoCreditsTableTr>
          </tbody>
        </S.InfoCreditsTable>

      </S.InfoPageContent>
    </S.InfoWrapper >);
}

export default InfoContainer;