import React from 'react';
import type { Screen } from '../types';
import { HandIcon, ArrowRightIcon, TrendingUpIcon, ClockIcon, StarIcon } from '../constants';

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


interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">안녕하세요 👋</h1>
            <p className="text-gray-600">오늘도 소통의 시간입니다</p>
          </div>
          <div className="w-12 h-12 bg-[#192a4d] rounded-full flex items-center justify-center">
            <HandIcon className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Stats Card */}
        <Card className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0 shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm mb-1">오늘의 통역</p>
              <p className="text-4xl font-bold">24회</p>
            </div>
            <Badge className="bg-white/20 text-white border-0">
              <TrendingUpIcon className="w-3 h-3 mr-1" />
              +12%
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
            <div>
              <p className="text-blue-100 text-xs">이번 주</p>
              <p className="text-xl font-semibold">156회</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs">총 통역 시간</p>
              <p className="text-xl font-semibold">4.2시간</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">빠른 시작</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate("translate")}
            className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-95 text-left"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <HandIcon className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-1">수어 → 음성</p>
            <p className="text-xs text-gray-500">실시간 통역 시작</p>
          </button>

          <button
            onClick={() => onNavigate("translate")}
            className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-95 text-left"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
              <span className="text-2xl">🎤</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-1">음성 → 수어</p>
            <p className="text-xs text-gray-500">음성 입력 시작</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">최근 활동</h2>
          <button className="text-sm text-blue-600 font-semibold flex items-center gap-1">
            전체보기
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <HandIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 font-medium mb-1">수어 → 음성 통역</p>
                <p className="text-xs text-gray-500 truncate">
                  "안녕하세요. 만나서 반갑습니다."
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <ClockIcon className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">2분 전</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🎤</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 font-medium mb-1">음성 → 수어 통역</p>
                <p className="text-xs text-gray-500 truncate">
                  "도움이 필요하신가요?"
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <ClockIcon className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">15분 전</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <StarIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 font-medium mb-1">수어 학습 완료</p>
                <p className="text-xs text-gray-500 truncate">
                  일상 대화 - 인사하기 (5/5)
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <ClockIcon className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">1시간 전</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Tips */}
      <div className="px-6 pb-8">
        <Card className="p-5 bg-gradient-to-br from-orange-50 to-pink-50 border-orange-200">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <p className="font-semibold text-gray-800 mb-2">오늘의 팁</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                조명이 밝은 곳에서 수어를 하면 인식률이 더 높아집니다!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default HomeScreen;