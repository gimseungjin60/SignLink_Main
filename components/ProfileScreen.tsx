import React from 'react';
import { 
  ProfileIcon,
  SettingsIcon, 
  BellIcon, 
  HelpCircleIcon, 
  DocumentTextIcon, 
  ShieldIcon, 
  LogOutIcon,
  ChevronRightIcon,
  AwardIcon,
  TrendingUpIcon,
  ClockIcon
} from '../constants';

const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${className}`}>
        {children}
    </div>
);

const Badge: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
        {children}
    </span>
);

const Button: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <button className={`font-semibold rounded-md transition-colors ${className}`}>
        {children}
    </button>
);

const ProfileScreen = () => {
  const menuItems = [
    {
      icon: SettingsIcon,
      label: "설정",
      description: "앱 설정 및 환경설정",
      color: "bg-gray-100 text-gray-600"
    },
    {
      icon: BellIcon,
      label: "알림",
      description: "알림 설정 관리",
      color: "bg-blue-100 text-blue-600",
      badge: "3"
    },
    {
      icon: HelpCircleIcon,
      label: "도움말",
      description: "사용 가이드 및 FAQ",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: DocumentTextIcon,
      label: "이용 약관",
      description: "서비스 이용약관",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: ShieldIcon,
      label: "개인정보 처리방침",
      description: "개인정보 보호정책",
      color: "bg-orange-100 text-orange-600"
    },
  ];

  const stats = [
    {
      icon: TrendingUpIcon,
      label: "통역 횟수",
      value: "1,247",
    },
    {
      icon: ClockIcon,
      label: "총 시간",
      value: "32.5시간",
    },
    {
      icon: AwardIcon,
      label: "획득 배지",
      value: "12개",
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
      {/* Profile Header */}
      <div className="px-6 pt-8 pb-6">
        <Card className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/30 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
                alt="프로필"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">김수화</h2>
              <p className="text-blue-100 text-sm mb-2">signlink@example.com</p>
              <Badge className="bg-white/20 text-white border-0">
                프리미엄 회원
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-5 h-5 mx-auto mb-1" />
                  <p className="text-lg font-semibold mb-1">{stat.value}</p>
                  <p className="text-xs text-blue-100">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <div className="px-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">최근 획득 배지</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6">
          <Card className="p-4 flex-shrink-0 w-32 text-center">
            <div className="text-4xl mb-2">🏆</div>
            <p className="text-xs text-gray-600 font-medium">수어 마스터</p>
          </Card>
          <Card className="p-4 flex-shrink-0 w-32 text-center">
            <div className="text-4xl mb-2">⭐</div>
            <p className="text-xs text-gray-600 font-medium">100일 연속</p>
          </Card>
          <Card className="p-4 flex-shrink-0 w-32 text-center">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-xs text-gray-600 font-medium">완벽한 하루</p>
          </Card>
          <Card className="p-4 flex-shrink-0 w-32 text-center">
            <div className="text-4xl mb-2">💎</div>
            <p className="text-xs text-gray-600 font-medium">전문가</p>
          </Card>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">설정 및 정보</h2>
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={index} 
                className="p-4 hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      {item.badge && (
                        <Badge className="bg-red-500 text-white border-0 h-5 w-5 p-0 flex items-center justify-center text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* App Info */}
      <div className="px-6 pb-8">
        <Card className="p-5 bg-gray-50 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">앱 버전</p>
              <p className="text-lg font-semibold text-gray-800">SignLink v1.0.0</p>
            </div>
            <div className="w-12 h-12 bg-[#192a4d] rounded-xl flex items-center justify-center">
              <ProfileIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            최신 버전입니다 ✓
          </p>
          <Button className="w-full bg-white border border-gray-300 text-gray-700 py-2 hover:bg-gray-100">
            업데이트 확인
          </Button>
        </Card>
      </div>

      {/* Logout */}
      <div className="px-6 pb-8">
        <Button 
          className="w-full text-red-600 border border-red-200 hover:bg-red-50 hover:text-red-700 py-2 flex items-center justify-center gap-2"
        >
          <LogOutIcon className="w-5 h-5" />
          로그아웃
        </Button>
      </div>

      {/* Footer Info */}
      <div className="px-6 pb-12 text-center">
        <p className="text-xs text-gray-400 mb-2">
          © 2025 SignLink. All rights reserved.
        </p>
        <p className="text-xs text-gray-400">
          AI 기반 실시간 수어 통역 플랫폼
        </p>
      </div>
    </div>
  );
}

export default ProfileScreen;