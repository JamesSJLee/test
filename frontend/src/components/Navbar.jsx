import React, { useState } from 'react';

const Navbar = ({ setView }) => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);

  const meetingMenus = [
    { title: '진행 중인 회의', icon: 'live_tv', desc: '현재 활성화된 세션 바로가기', action: () => setView('dashboard') },
    { title: '새 회의 예약', icon: 'add_task', desc: '신규 안건 및 일정 등록', action: () => setView('agenda-form') },
    { title: '지난 회의 기록', icon: 'calendar_month', desc: '의결 완료된 지난 회의 목록', action: () => {} },
    { title: '참석 현황판', icon: 'groups', desc: '위원별 참석률 및 연간 통계', action: () => {} },
  ];

  const reportMenus = [
    { title: 'AI 핵심 요약', icon: 'analytics', desc: '회의 전체 내용을 AI가 분석한 결론' },
    { title: '안건별 이행 현황', icon: 'list_alt', desc: '결정된 사항들의 실시간 처리 상태' },
    { title: '회의록 아카이브', icon: 'history', desc: '과거 경영집행위원회 기록 조회' },
    { title: '경영 인사이트', icon: 'lightbulb', desc: '데이터 기반 전략 의사결정 보조' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/10 shadow-[0_20px_50px_rgba(43,52,55,0.05)] flex justify-between items-center px-12 py-4">
      <div className="flex items-center gap-8">
        <span 
          onClick={() => setView('dashboard')}
          className="text-xl font-bold text-slate-700 tracking-tight font-headline cursor-pointer hover:text-primary transition-colors"
        >
          경영집행위원회
        </span>
        <div className="hidden md:flex gap-8 items-center">
          <a onClick={() => setView('dashboard')} className="text-slate-900 border-b-2 border-slate-500 pb-1 font-semibold tracking-tight text-sm cursor-pointer" href="#">Home</a>
          
          {/* Meetings Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsMeetingOpen(true)}
            onMouseLeave={() => setIsMeetingOpen(false)}
          >
            <button className="flex items-center gap-1 text-slate-500 hover:text-slate-700 transition-colors font-semibold tracking-tight text-sm focus:outline-none">
              Meetings
              <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isMeetingOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            <div className={`absolute top-full -left-4 w-72 pt-4 transition-all duration-300 transform ${isMeetingOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
              <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden ring-1 ring-black/5">
                <div className="p-2 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black px-3 py-1 text-primary">Live Sessions</span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping mr-4"></span>
                </div>
                <div className="p-2">
                  {meetingMenus.map((menu, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => {
                        menu.action();
                        setIsMeetingOpen(false);
                      }}
                      className="w-full text-left flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-all group/item"
                    >
                      <div className="p-2 bg-slate-50 rounded-md group-hover/item:bg-white group-hover/item:text-primary transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-lg">{menu.icon}</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 group-hover/item:text-primary">{menu.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{menu.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <a className="text-slate-500 hover:text-slate-700 transition-colors font-semibold tracking-tight text-sm" href="#">Tasks</a>
          
          {/* Reports Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsReportOpen(true)}
            onMouseLeave={() => setIsReportOpen(false)}
          >
            <button className="flex items-center gap-1 text-slate-500 hover:text-slate-700 transition-colors font-semibold tracking-tight text-sm focus:outline-none">
              Reports
              <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isReportOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            <div className={`absolute top-full -left-4 w-72 pt-4 transition-all duration-300 transform ${isReportOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
              <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden ring-1 ring-black/5">
                <div className="p-2 border-b border-slate-50 bg-slate-50/50">
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black px-3 py-1 text-primary">Detail Analysis</span>
                </div>
                <div className="p-2">
                  {reportMenus.map((menu, idx) => (
                    <a key={idx} href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-all group/item">
                      <div className="p-2 bg-slate-50 rounded-md group-hover/item:bg-white group-hover/item:text-primary transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-lg">{menu.icon}</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 group-hover/item:text-primary">{menu.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{menu.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 bg-slate-100/50 px-4 py-2 rounded-full border border-slate-200/20 hover:border-primary/30 transition-all cursor-pointer group">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black group-hover:text-primary transition-colors">Role</span>
          <span className="text-xs font-bold text-slate-700">대표님</span>
          <span className="material-symbols-outlined text-sm text-slate-400">expand_more</span>
        </div>
        <button className="material-symbols-outlined text-slate-400 hover:text-slate-900 transition-colors p-2 hover:bg-slate-50 rounded-full">notifications</button>
        <button className="material-symbols-outlined text-slate-600 hover:text-slate-900 transition-colors p-2 hover:bg-slate-50 rounded-full bg-slate-100">account_circle</button>
      </div>
    </nav>
  );
};

export default Navbar;
