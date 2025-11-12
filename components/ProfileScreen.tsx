import React from 'react';
import {
  ProfileIcon,
  TrendingUpIcon,
  ClockIcon,
  AwardIcon,
  ChevronRightIcon,
  SettingsIcon,
  HelpCircleIcon,
  LogOutIcon,
} from '../constants';

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${className}`}>{children}</div>
);

const ProfileScreen = () => {
  const stats = [
    { icon: TrendingUpIcon, label: '누적 통역', value: '1,247회', helper: '이번 달 +38회' },
    { icon: ClockIcon, label: '총 시간', value: '32.5시간', helper: '주 평균 2시간' },
    { icon: AwardIcon, label: '전문 배지', value: '12개', helper: '최근 1개 추가' },
  ];

  const milestones = [
    {
      title: '서울시민청 무장애 상담 센터 도입',
      date: '2024. 11',
      description: '현장 상담 부스에 SignLink를 접목해 청각장애 고객 CS 시간을 45% 단축.',
    },
    {
      title: '공항 특수 상황 대응 시나리오 구축',
      date: '2024. 06',
      description: '승객 안내 스크립트를 수어 영상으로 변환해 비상 안내 정확도를 높였습니다.',
    },
    {
      title: '교육청 원격 수업 실험',
      date: '2024. 03',
      description: '원격 수업 플랫폼에 실시간 수어 오버레이를 적용해 300여 명이 참여.',
    },
  ];

  const resources = [
    { title: 'SignLink 운영 매뉴얼', detail: '내부 팀 온보딩용 PDF', cta: '다운로드' },
    { title: '콘텐츠 제작 가이드', detail: '수어 영상 촬영 체크리스트', cta: '보기' },
    { title: '지원 티켓', detail: '프리미엄 전담 컨설턴트 연결', cta: '요청하기' },
  ];

  const quickActions = [
    { label: '팀 설정 관리', icon: SettingsIcon },
    { label: '지원 센터', icon: HelpCircleIcon },
    { label: '로그아웃', icon: LogOutIcon },
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#f5f6fa]">
      <section className="bg-[#192a4d] text-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/30">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                alt="프로필"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-blue-200 uppercase tracking-[0.35rem] text-xs mb-2">SignLink Partner</p>
              <h1 className="text-4xl font-bold mb-3">김수화</h1>
              <p className="text-white/70 text-base leading-relaxed mb-5">
                공공기관·교육 현장을 중심으로 수어 접근성을 설계하고 있습니다. SignLink와 함께 현장의 소통 장벽을
                낮추는 프로젝트를 진행 중입니다.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-2.5 rounded-full bg-white text-[#192a4d] font-semibold hover:bg-blue-50 transition-colors">
                  포트폴리오 열람
                </button>
                <button className="px-6 py-2.5 rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors">
                  맞춤 상담 예약
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-12 mt-6 lg:mt-10 relative z-10">
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm font-semibold text-[#192a4d] uppercase">Overview</p>
                  <h2 className="text-2xl font-bold text-gray-900">활동 스냅샷</h2>
                </div>
                <span className="text-sm text-gray-500">업데이트 2시간 전</span>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="rounded-2xl border border-gray-100 p-4">
                      <Icon className="w-5 h-5 text-[#192a4d] mb-3" />
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-emerald-600 font-medium mt-1">{stat.helper}</p>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm font-semibold text-[#192a4d] uppercase">Milestones</p>
                  <h2 className="text-2xl font-bold text-gray-900">주요 프로젝트</h2>
                </div>
                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800">
                  상세 보기
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
              <ol className="space-y-5">
                {milestones.map((milestone) => (
                  <li key={milestone.title} className="border-l-2 border-gray-200 pl-4">
                    <p className="text-xs uppercase text-gray-400 mb-1">{milestone.date}</p>
                    <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </li>
                ))}
              </ol>
            </Card>

            <Card className="p-8 bg-gray-50 border-gray-200">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-[#192a4d] uppercase">Insight</p>
                  <h2 className="text-xl font-bold text-gray-900">팀 공유 메모</h2>
                </div>
                <button className="px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-white">
                  메모 추가
                </button>
              </div>
              <div className="space-y-4">
                <article className="p-4 rounded-2xl bg-white shadow-sm">
                  <p className="text-xs text-gray-400 mb-1">오늘</p>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">현장 장비 세팅 체크리스트 정리</h3>
                  <p className="text-sm text-gray-600">
                    조명, 카메라 각도, 배경 대비를 표준화하면 인식률이 7% 개선된다는 내부 리포트를 공유했습니다.
                  </p>
                </article>
                <article className="p-4 rounded-2xl bg-white shadow-sm">
                  <p className="text-xs text-gray-400 mb-1">이번 주</p>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">청각장애 고객 여정 맵 업데이트</h3>
                  <p className="text-sm text-gray-600">온라인 접속 이후 상담 연결까지 걸리는 시간을 3단계로 단순화했습니다.</p>
                </article>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">리소스 & 다운로드</h3>
                <span className="text-xs text-gray-400">업데이트: 금일</span>
              </div>
              <ul className="space-y-4">
                {resources.map((resource) => (
                  <li key={resource.title} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{resource.title}</p>
                      <p className="text-xs text-gray-500">{resource.detail}</p>
                    </div>
                    <button className="text-sm font-semibold text-[#192a4d]">{resource.cta}</button>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 작업</h3>
              <div className="space-y-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.label}
                      className="w-full flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:border-[#192a4d] hover:text-[#192a4d]"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        {action.label}
                      </div>
                      <ChevronRightIcon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 bg-[#192a4d] text-white border-[#192a4d]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <ProfileIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3rem] text-blue-200">Concierge</p>
                  <h3 className="text-xl font-bold">전담 케어 매니저</h3>
                </div>
              </div>
              <p className="text-sm text-white/80 mb-4">
                프로젝트 상황에 맞는 통역사 매칭과 현장 교육을 요청할 수 있습니다. 메시지를 남겨주시면 1영업일 내 회신
                드립니다.
              </p>
              <button className="w-full rounded-full bg-white text-[#192a4d] py-2.5 font-semibold hover:bg-blue-50">
                컨시어지에게 메시지 보내기
              </button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileScreen;
