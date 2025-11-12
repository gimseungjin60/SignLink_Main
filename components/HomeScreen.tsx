import React from 'react';
import type { Screen } from '../types';
import { HandIcon, ArrowRightIcon } from '../constants';

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${className}`}>
    {children}
  </div>
);

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const highlightStats = [
    { label: '오늘의 통역', value: '24회', trend: '+12%' },
    { label: '이번 주', value: '156회', trend: '5건 ↑' },
    { label: '총 통역 시간', value: '4.2시간', trend: '안정적' },
  ];

  const quickLinks = [
    {
      title: '수어 → 음성',
      description: 'AI가 손동작을 인식해 즉시 음성으로 변환합니다.',
      accent: 'bg-blue-50 text-blue-700',
      action: () => onNavigate('translate'),
      icon: (
        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
          <HandIcon className="w-6 h-6 text-blue-700" />
        </div>
      ),
    },
    {
      title: '음성 → 수어',
      description: '짧은 음성 입력으로 사람 친화적인 수어 가이드를 확인하세요.',
      accent: 'bg-purple-50 text-purple-700',
      action: () => onNavigate('translate'),
      icon: (
        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
          🎤
        </div>
      ),
    },
    {
      title: '상담 예약',
      description: '전문 통역사와 1:1 온라인 세션을 예약해보세요.',
      accent: 'bg-emerald-50 text-emerald-700',
      action: () => undefined,
      icon: (
        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl">
          📅
        </div>
      ),
    },
  ];

  const stories = [
    {
      title: '“공공기관 민원접수, SignLink 덕분에 빠르게 처리했어요.”',
      description: '실시간 통역과 텍스트 저장 기능으로 민원 과정을 매끄럽게 마칠 수 있었다는 인터뷰.',
      time: '2시간 전',
      tone: 'bg-blue-50',
    },
    {
      title: '교실 속 수어 도우미',
      description: '교사가 수업 중 갑자기 필요한 단어를 빠르게 수어로 전달하며 학습 몰입도를 높인 사례.',
      time: '어제',
      tone: 'bg-purple-50',
    },
    {
      title: '고객센터 자동화 시나리오',
      description: '콜센터에 수어 설명 영상을 삽입해 고객 만족도가 21% 향상된 기업 사례.',
      time: '이번 주',
      tone: 'bg-rose-50',
    },
  ];

  const resources = [
    { title: '도입 가이드', description: 'SignLink를 조직에 적용하는 단계별 안내서', cta: 'PDF 보기' },
    { title: '연동 API', description: '고객 시스템과의 연동 예제와 SDK', cta: '개발자 문서' },
    { title: '교육 웨비나', description: '다음 달 진행 예정인 실시간 웨비나 일정', cta: '신청하기' },
  ];

  return (
    <div className="h-full overflow-y-auto bg-white">
      <section className="bg-[#192a4d] text-white">
        <div className="max-w-5xl mx-auto px-6 py-12 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.3rem] text-blue-200 mb-4">SignLink Experience</p>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
              손끝에서 시작되는
              <br />
              새로운 소통 플랫폼
            </h1>
            <p className="text-white/80 text-base leading-relaxed mb-8">
              SignLink는 수어와 음성, 텍스트를 자연스럽게 넘나드는 AI 통역 서비스입니다. 누구나 웹에서 바로 접속해
              필요한 순간에 통역을 시작해보세요.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('translate')}
                className="px-6 py-3 rounded-full bg-white text-[#192a4d] font-semibold hover:bg-blue-50 transition-colors"
              >
                통역 시작하기
              </button>
              <button className="px-6 py-3 rounded-full border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors">
                데모 영상 보기
              </button>
            </div>
          </div>
          <Card className="bg-white/5 border-white/20 shadow-xl">
            <div className="p-6 space-y-6 text-gray-900 bg-white rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">오늘의 통역</p>
                  <p className="text-3xl font-bold text-gray-900">24회</p>
                </div>
                <div className="text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">+12%</div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                <div>
                  <p className="text-xs text-gray-500">이번 주</p>
                  <p className="text-xl font-semibold text-gray-900">156회</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">총 통역 시간</p>
                  <p className="text-xl font-semibold text-gray-900">4.2시간</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-semibold text-gray-900 mb-1">1:1 맞춤형 컨시어지</p>
                <p className="text-sm text-gray-600">통역부터 교육까지 필요한 모든 순간을 상담사가 동행합니다.</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {highlightStats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <span className="text-sm text-emerald-600 font-semibold">{stat.trend}</span>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm font-semibold text-[#192a4d] uppercase">사용 시나리오</p>
                <h2 className="text-2xl font-bold text-gray-900">SignLink를 활용하는 방법</h2>
              </div>
              <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800">
                전체 보기
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5">
              {quickLinks.map((link) => (
                <div
                  key={link.title}
                  className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between p-4 rounded-2xl border border-gray-100 hover:border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    {link.icon}
                    <div>
                      <p className="text-base font-semibold text-gray-900">{link.title}</p>
                      <p className="text-sm text-gray-500">{link.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={link.action}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${link.accent}`}
                  >
                    바로가기
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 bg-gray-50 border-gray-200">
            <p className="text-sm font-semibold text-[#192a4d] uppercase mb-2">최신 소식</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">필드 리포트</h2>
            <div className="space-y-4">
              {stories.map((story) => (
                <article key={story.title} className={`p-4 rounded-2xl ${story.tone}`}>
                  <p className="text-sm text-gray-500 mb-1">{story.time}</p>
                  <h3 className="font-semibold text-gray-900 mb-1">{story.title}</h3>
                  <p className="text-sm text-gray-600">{story.description}</p>
                </article>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div className="grid gap-6 md:grid-cols-3">
          {resources.map((resource) => (
            <Card key={resource.title} className="p-6 hover:shadow-lg transition-shadow">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">리소스</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
              <button className="text-sm font-semibold text-[#192a4d] flex items-center gap-2">
                {resource.cta}
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-[#192a4d] text-white">
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3rem] text-blue-200">Ready to start?</p>
            <h2 className="text-3xl font-bold mb-2">SignLink와 함께 소통 워크플로우를 재정의하세요.</h2>
            <p className="text-white/70 text-sm">무료 체험으로 팀 전체가 사용할 수 있는 수어 지원 인프라를 구축해보세요.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onNavigate('translate')}
              className="px-6 py-3 rounded-full bg-white text-[#192a4d] font-semibold hover:bg-blue-50 transition-colors"
            >
              무료 체험
            </button>
            <button className="px-6 py-3 rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors">
              문의하기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
