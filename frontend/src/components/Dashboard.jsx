import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [agendas, setAgendas] = useState([]);
  const [status, setStatus] = useState({ elapsed_time: '00:00', current_agenda_id: 0, attendance_count: 0 });

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [agendaRes, statusRes] = await Promise.all([
        axios.get('http://localhost:8000/api/agendas'),
        axios.get('http://localhost:8000/api/status')
      ]);
      setAgendas(agendaRes.data);
      setStatus(statusRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateStatus = async (agendaId, newStatus) => {
    try {
      await axios.post(`http://localhost:8000/api/agendas/${agendaId}/status?status=${newStatus}`);
      fetchData(); // Refresh data
      alert(`${newStatus} 처리가 완료되었습니다.`);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <main className="ml-64 pt-24 p-12 min-h-screen bg-surface">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight font-headline text-on-surface mb-2">Executive Dashboard</h1>
          <p className="text-on-surface-variant">제 24-08차 정기 경영집행위원회 진행 현황</p>
        </div>
        <button className="bg-primary text-on-primary rounded-md px-6 py-3 transition-all hover:bg-primary-dim active:scale-95 flex items-center gap-2">
          <span className="material-symbols-outlined">add</span>
          <span className="font-semibold">수시회의 모집</span>
        </button>
      </header>

      {/* Bento Grid Layout - Perfectly Symmetrical */}
      <div className="grid grid-cols-12 gap-8 items-stretch">
        
        {/* Row 1, Left: 01 Pre-Meeting */}
        <section className="col-span-12 lg:col-span-6 flex flex-col h-full">
          <div className="h-10 flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-outline">01 Pre-Meeting</h3>
            <span className="px-2 py-0.5 rounded bg-surface-container-high text-[10px] font-bold text-primary">PREPARATION</span>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-sm ring-1 ring-black/[0.03] flex-1 flex flex-col justify-between">
            {agendas.filter(a => a.id === 1).map(agenda => (
              <div key={agenda.id} className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-8">
                  <div className="p-4 bg-primary-container rounded-lg text-primary shadow-sm">
                    <span className="material-symbols-outlined text-2xl">upload_file</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-on-surface leading-tight">{agenda.title}</h4>
                    <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">{agenda.description}</p>
                  </div>
                </div>
                <div className="p-6 bg-surface-container-low rounded-md border-l-4 border-primary mt-auto shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-primary tracking-wide">Auto-open Session</span>
                    <span className="material-symbols-outlined text-base text-primary">schedule</span>
                  </div>
                  <p className="text-sm text-on-surface font-medium italic">회의 세션 14:00 자동 활성화 예정</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Row 1, Right: 02 Review Phase */}
        <section className="col-span-12 lg:col-span-6 flex flex-col h-full">
          <div className="h-10 flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-outline">02 Review Phase</h3>
            <div className="flex items-center gap-2 text-error font-bold text-sm bg-error/5 px-3 py-1 rounded-full ring-1 ring-error/20">
              <span className="material-symbols-outlined text-sm">timer</span>
              <span>12h 45m left</span>
            </div>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-sm ring-1 ring-black/[0.03] flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-lg font-bold text-on-surface">Pre-comments</h4>
              <span className="px-3 py-1 bg-surface-container text-[10px] font-bold rounded-full text-on-surface-variant uppercase tracking-wider">Reviewing (8/12)</span>
            </div>
            <div className="flex-1 space-y-5">
              {agendas.filter(a => a.id === 2).map(agenda => (
                <div key={agenda.id} className="p-5 bg-surface-container-low rounded-md flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden ring-4 ring-white shadow-sm">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfAxdThlyr6Z6Dcb3uqbhso37eHycw5am4l12AX1pMGlYXwKynvGSbaxjM-eCD0A529xD5BXK04xE9Lfrl8PmfnyOPnWjtiTUJLab4IEol6e4aOpsTjIUo8QQpagEgU8amyON_PkNn7CrD7-lqI0KLgJtyLy2FOIYhmb2T_i7V3NdfJKTg7vIiKdAEybXtEClfeS6cmHdWDm3Ab4dq9h9EER9v-nnUtWxfXcsPV3wVchpMh7WpynIoGakKgoVrGXA1-iicXxVp7X-c" 
                        alt="Reviewer" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-base font-bold text-on-surface">{agenda.reviewer || '전략기획본부장'}</p>
                      <p className="text-xs text-on-surface-variant mt-1">안건 2번에 대한 예산 재검토 의견 제출</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-outline font-bold uppercase ml-4 opacity-70">10m ago</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 items-center pt-8 mt-8 border-t-2 border-surface-container border-dashed">
              <span className="text-[10px] font-black uppercase text-outline tracking-widest">Coordination</span>
              <div className="flex gap-3 flex-1">
                <button className="flex-1 py-3 border-2 border-outline-variant/20 text-xs font-bold rounded-md hover:bg-surface-container hover:border-primary/20 transition-all active:scale-[0.98]">Relocate</button>
                <button className="flex-1 py-3 border-2 border-outline-variant/20 text-xs font-bold rounded-md hover:bg-surface-container hover:border-primary/20 transition-all active:scale-[0.98]">Revision</button>
              </div>
            </div>
          </div>
        </section>

        {/* Row 2, Left: 03 Active Meeting */}
        <section className="col-span-12 lg:col-span-6 flex flex-col h-full">
          <div className="h-10 flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-outline">03 Active Meeting</h3>
            <div className="bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-black tracking-widest animate-pulse shadow-lg shadow-primary/20">LIVE</div>
          </div>
          <div className="bg-white rounded-lg p-10 shadow-sm ring-1 ring-black/[0.03] border-t-4 border-primary flex-1 flex flex-col">
            <div className="text-center mb-10">
              <span className="text-[10px] uppercase tracking-widest text-outline font-bold block mb-3">Elapsed Time</span>
              <div className="text-6xl font-black tracking-tighter text-on-surface font-headline leading-none">{status.elapsed_time}</div>
              <p className="text-sm text-primary font-bold mt-6 italic">" {agendas.find(a => a.id === status.current_agenda_id)?.title || '안건 로딩 중...'} "</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-10">
              <button 
                onClick={() => updateStatus(status.current_agenda_id, 'Approved')}
                className="flex flex-col items-center justify-center py-6 rounded-xl bg-surface-container-low hover:bg-primary/5 transition-all border-2 border-transparent hover:border-primary/30 group shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-primary text-3xl mb-3 group-hover:scale-110 transition-transform">check_circle</span>
                <span className="text-xs font-black">승인</span>
              </button>
              <button 
                onClick={() => updateStatus(status.current_agenda_id, 'Conditional')}
                className="flex flex-col items-center justify-center py-6 rounded-xl bg-surface-container-low hover:bg-primary/5 transition-all border-2 border-transparent hover:border-primary/30 group shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-primary text-3xl mb-3 group-hover:scale-110 transition-transform">rule</span>
                <span className="text-xs font-black whitespace-nowrap">조건부 승인</span>
              </button>
              <button 
                onClick={() => updateStatus(status.current_agenda_id, 'Pending')}
                className="flex flex-col items-center justify-center py-6 rounded-xl bg-surface-container-low hover:bg-primary/5 transition-all border-2 border-transparent hover:border-primary/30 group shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-primary text-3xl mb-3 group-hover:scale-110 transition-transform">forum</span>
                <span className="text-xs font-black">재토론</span>
              </button>
            </div>

            <div className="bg-surface-container-low p-8 rounded-xl mt-auto shadow-inner border border-outline-variant/5">
              <div className="flex justify-between items-center mb-6">
                <h5 className="text-xs font-black uppercase tracking-widest text-outline">Attendance & Minutes</h5>
                <span className="text-[10px] text-primary font-black animate-pulse flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  RECORDING
                </span>
              </div>
              <div className="flex -space-x-3 mb-6">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJsuCBxb3wORUv3Yj2Suut-TRO7hZ-jY2mlLJaEIy2GsETZMSmMgXXcdvLt67HGFvBSNPK_ENZsxgwwiVgCAg_ORaoxL2wbKy74Wn2Td4yOyk9IDRu_pNWLhRLEjc_EvBcATQxKSeOQXOOA6SV6RPqINDz0xtYJ0ZqMzNDsza_pIyv_3Ws98_Lo-ZzZ1h0lqZKV8PNwU_3XqtoEvUA-bFFyJV1pL-Bl07tsWzYivkSD87Ql9NPQwdSwajz5RPeI2QrQlnRbldn5Jug" alt="Attnd" className="w-10 h-10 rounded-full ring-4 ring-white shadow-md" />
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi5t0xbMvT2RD-7JateVORtpPsHVmcWGY3GAlPRiRVSEldgQbILoTAHSG4iPcOVK_3Rj28_fh8MzZTIoWSr5rCptNmb3a9nZHVTC80mjAJfuyVz6qF650l2SufFD6HQSTHXtMirTBqIkxMUx0WRaLXMxCeEsgcYgn6OIEiZLXeFKk3CI0dc0OVVTHJbFsD7-bqtVBjIxrK9Lpg-l3_F4embGgMgC8lblkZRfgldnewn7_evDQbtqnjaJ1YeHBdR1gdaFkFf8pzqUKj" alt="Attnd" className="w-10 h-10 rounded-full ring-4 ring-white shadow-md" />
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQvjGHckF39SbHggH1TZWY4Rc9ByvJKbsxyD-HzNm7V4kMqJtehwAVG3HU7wHMIhDyRrnhejYaWSK2Bhi5IL5z0n2Yac5-rJmyeAhjI1_LM_hR7hqpA5aSQjPFYA4vEqU5GdhoClhsO-kSTNxetwplUXNqJVIBXo1_dMb3ZemzcVP0_4V-TLHbEhYc5jzB3oU5RiUvegXTIzDf72GR-27flNR_AFff_8hqokFAcZlbHdn65gDE7hSndiSDVWqNCdBLPlDuwxbaFrHU" alt="Attnd" className="w-10 h-10 rounded-full ring-4 ring-white shadow-md" />
                <div className="w-10 h-10 rounded-full bg-primary-container text-primary text-xs flex items-center justify-center font-black ring-4 ring-white shadow-md">+8</div>
              </div>
              <div className="h-28 bg-white/60 backdrop-blur-sm rounded-lg p-5 text-sm text-on-surface-variant font-medium italic overflow-y-auto border border-outline-variant/10 leading-relaxed shadow-sm">
                (14:12) 위원장: 글로벌 시장 진출의 핵심은 로컬 파트너십 선정 기준의 명확화에 있습니다. 이에 따른 세부 가이드라인 보강이 필요해 보입니다.
              </div>
            </div>
          </div>
        </section>

        {/* Row 2, Right: 04 Post-Meeting & CEO Report */}
        <section className="col-span-12 lg:col-span-6 flex flex-col h-full">
          <div className="h-10 flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-outline">04 Post-Meeting</h3>
          </div>
          <div className="flex-1 flex flex-col space-y-8">
            <div className="bg-white rounded-lg p-10 shadow-sm ring-1 ring-black/[0.03] flex-1 flex flex-col">
              <h4 className="text-lg font-bold text-on-surface mb-8">Task Progress</h4>
              <div className="space-y-10 flex-1">
                <div>
                  <div className="flex justify-between text-xs mb-4">
                    <span className="font-black text-primary uppercase tracking-widest">Rate of Completion</span>
                    <span className="font-black text-primary text-lg">75%</span>
                  </div>
                  <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-primary shadow-lg shadow-primary/30" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <ul className="space-y-6">
                  <li className="flex items-center gap-4 text-base">
                    <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
                    <span className="font-bold text-on-surface">재무팀 예산 조정안 작성</span>
                  </li>
                  <li className="flex items-center gap-4 text-base">
                    <span className="material-symbols-outlined text-outline text-2xl opacity-40">radio_button_unchecked</span>
                    <span className="font-medium text-on-surface-variant">글로벌 지사 가이드라인 배포</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-primary-dim rounded-2xl p-10 text-on-primary shadow-2xl ring-1 ring-white/20 transform hover:translate-y-[-4px] transition-transform">
              <div className="flex items-center gap-5 mb-6">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                  <span className="material-symbols-outlined text-4xl text-white">analytics</span>
                </div>
                <div>
                  <h4 className="font-black text-xl tracking-tight leading-tight">CEO Summary</h4>
                  <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">Generated by AI</p>
                </div>
              </div>
              <p className="text-base text-on-primary/70 mb-10 leading-relaxed font-medium">회의 종료 즉시 핵심 요약 리포트가 생성되었습니다. 최종 승인 후 전사에 공유 가능합니다.</p>
              <button 
                onClick={() => alert('리포트 다운로드를 시작합니다.')}
                className="w-full bg-white text-primary font-black py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white/90 transition-all transform active:scale-95 shadow-xl hover:shadow-primary/50"
              >
                <span className="material-symbols-outlined text-2xl">download</span>
                Download AI Report
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
