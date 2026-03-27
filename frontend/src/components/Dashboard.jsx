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

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Step 1: Pre-Meeting */}
        <section className="col-span-12 lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-outline">01 Pre-Meeting</h3>
            <span className="px-2 py-0.5 rounded bg-surface-container-high text-[10px] font-bold text-primary">PREPARATION</span>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm ring-1 ring-black/[0.03] space-y-6">
            {agendas.filter(a => a.id === 1).map(agenda => (
              <div key={agenda.id} className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-container rounded-lg text-primary">
                    <span className="material-symbols-outlined">upload_file</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">{agenda.title}</h4>
                    <p className="text-xs text-on-surface-variant mt-1">{agenda.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-surface-container-low rounded-md border-l-4 border-primary">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-primary">Auto-open Session</span>
                    <span className="material-symbols-outlined text-sm text-primary">schedule</span>
                  </div>
                  <p className="text-sm text-on-surface">회의 세션 14:00 자동 활성화 예정</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Step 2: Review Phase */}
        <section className="col-span-12 lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-outline">02 Review Phase</h3>
            <div className="flex items-center gap-2 text-error font-bold text-sm">
              <span className="material-symbols-outlined text-sm">timer</span>
              <span>Deadline: 12h 45m</span>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm ring-1 ring-black/[0.03]">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-on-surface">Pre-comments (사전 코멘트)</h4>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-surface-container text-xs rounded-full text-on-surface-variant">Reviewing (8/12)</span>
              </div>
            </div>
            {agendas.filter(a => a.id === 2).map(agenda => (
              <div key={agenda.id} className="space-y-4">
                <div className="p-4 bg-surface-container-low rounded-md flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfAxdThlyr6Z6Dcb3uqbhso37eHycw5am4l12AX1pMGlYXwKynvGSbaxjM-eCD0A529xD5BXK04xE9Lfrl8PmfnyOPnWjtiTUJLab4IEol6e4aOpsTjIUo8QQpagEgU8amyON_PkNn7CrD7-lqI0KLgJtyLy2FOIYhmb2T_i7V3NdfJKTg7vIiKdAEybXtEClfeS6cmHdWDm3Ab4dq9h9EER9v-nnUtWxfXcsPV3wVchpMh7WpynIoGakKgoVrGXA1-iicXxVp7X-c" 
                        alt="Reviewer" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{agenda.reviewer || '전략기획본부장'}</p>
                      <p className="text-xs text-on-surface-variant">안건 2번에 대한 예산 재검토 의견 제출</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-outline">{agenda.time_ago}</span>
                </div>
                <div className="flex gap-4 items-center pt-4 border-t border-outline-variant/10">
                  <span className="text-xs font-bold text-on-surface-variant">Coordination:</span>
                  <div className="flex gap-2">
                    <button className="px-4 py-1.5 border border-outline-variant/30 text-xs rounded-md hover:bg-surface-container transition-colors">Relocate Agenda</button>
                    <button className="px-4 py-1.5 border border-outline-variant/30 text-xs rounded-md hover:bg-surface-container transition-colors">Request Revision</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Step 3: Active Meeting */}
        <section className="col-span-12 lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-outline">03 Active Meeting</h3>
            <div className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-bold animate-pulse">LIVE</div>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-sm ring-1 ring-black/[0.03] border-t-4 border-primary">
            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-widest text-outline block mb-2">Elapsed Time</span>
              <div className="text-5xl font-extrabold tracking-tighter text-on-surface font-headline">{status.elapsed_time}</div>
              <p className="text-sm text-on-surface-variant mt-4">Current: {agendas.find(a => a.id === status.current_agenda_id)?.title || '안건 로딩 중...'}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <button 
                onClick={() => updateStatus(status.current_agenda_id, 'Approved')}
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-surface-container-low hover:bg-primary/10 transition-all border border-transparent hover:border-primary group"
              >
                <span className="material-symbols-outlined text-primary mb-2">check_circle</span>
                <span className="text-sm font-bold">승인</span>
              </button>
              <button 
                onClick={() => updateStatus(status.current_agenda_id, 'Conditional')}
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-surface-container-low hover:bg-primary/10 transition-all border border-transparent hover:border-primary group"
              >
                <span className="material-symbols-outlined text-primary mb-2">rule</span>
                <span className="text-sm font-bold">조건부 승인</span>
              </button>
              <button 
                onClick={() => updateStatus(status.current_agenda_id, 'Pending')}
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-surface-container-low hover:bg-primary/10 transition-all border border-transparent hover:border-primary group"
              >
                <span className="material-symbols-outlined text-primary mb-2">forum</span>
                <span className="text-sm font-bold">재토론</span>
              </button>
            </div>
            <div className="bg-surface-container-low p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-sm font-bold">Attendance & Minutes</h5>
                <span className="text-xs text-primary font-bold">Recording...</span>
              </div>
              <div className="flex -space-x-2 mb-4">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJsuCBxb3wORUv3Yj2Suut-TRO7hZ-jY2mlLJaEIy2GsETZMSmMgXXcdvLt67HGFvBSNPK_ENZsxgwwiVgCAg_ORaoxL2wbKy74Wn2Td4yOyk9IDRu_pNWLhRLEjc_EvBcATQxKSeOQXOOA6SV6RPqINDz0xtYJ0ZqMzNDsza_pIyv_3Ws98_Lo-ZzZ1h0lqZKV8PNwU_3XqtoEvUA-bFFyJV1pL-Bl07tsWzYivkSD87Ql9NPQwdSwajz5RPeI2QrQlnRbldn5Jug" alt="Attnd" className="w-8 h-8 rounded-full ring-2 ring-white" />
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi5t0xbMvT2RD-7JateVORtpPsHVmcWGY3GAlPRiRVSEldgQbILoTAHSG4iPcOVK_3Rj28_fh8MzZTIoWSr5rCptNmb3a9nZHVTC80mjAJfuyVz6qF650l2SufFD6HQSTHXtMirTBqIkxMUx0WRaLXMxCeEsgcYgn6OIEiZLXeFKk3CI0dc0OVVTHJbFsD7-bqtVBjIxrK9Lpg-l3_F4embGgMgC8lblkZRfgldnewn7_evDQbtqnjaJ1YeHBdR1gdaFkFf8pzqUKj" alt="Attnd" className="w-8 h-8 rounded-full ring-2 ring-white" />
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQvjGHckF39SbHggH1TZWY4Rc9ByvJKbsxyD-HzNm7V4kMqJtehwAVG3HU7wHMIhDyRrnhejYaWSK2Bhi5IL5z0n2Yac5-rJmyeAhjI1_LM_hR7hqpA5aSQjPFYA4vEqU5GdhoClhsO-kSTNxetwplUXNqJVIBXo1_dMb3ZemzcVP0_4V-TLHbEhYc5jzB3oU5RiUvegXTIzDf72GR-27flNR_AFff_8hqokFAcZlbHdn65gDE7hSndiSDVWqNCdBLPlDuwxbaFrHU" alt="Attnd" className="w-8 h-8 rounded-full ring-2 ring-white" />
                <div className="w-8 h-8 rounded-full bg-primary-container text-primary text-[10px] flex items-center justify-center font-bold ring-2 ring-white">+8</div>
              </div>
              <div className="h-24 bg-white/50 rounded p-3 text-xs text-on-surface-variant italic overflow-y-auto">
                (14:12) 위원장: 글로벌 시장 진출의 핵심은 로컬 파트너십 선정 기준의 명확화에 있습니다. 이에 따른 세부 가이드라인 보강이 필요해 보입니다.
              </div>
            </div>
          </div>
        </section>

        {/* Step 4: Post-Meeting */}
        <section className="col-span-12 lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-outline">04 Post-Meeting</h3>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm ring-1 ring-black/[0.03]">
              <h4 className="font-bold text-on-surface mb-6">Task Progress</h4>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-medium">의결사항 이행률</span>
                    <span className="font-bold">75%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-xs">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    <span>재무팀 예산 조정안 작성</span>
                  </li>
                  <li className="flex items-center gap-3 text-xs">
                    <span className="material-symbols-outlined text-outline text-sm">radio_button_unchecked</span>
                    <span className="text-on-surface-variant">글로벌 지사 가이드라인 배포</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-primary-dim rounded-lg p-6 text-on-primary shadow-lg">
              <h4 className="font-bold mb-4">CEO Summary Report</h4>
              <p className="text-xs text-on-primary/80 mb-6 leading-relaxed">회의 종료 즉시 AI 기반의 핵심 요약 리포트가 생성되었습니다. 최종 승인 후 전사에 공유 가능합니다.</p>
              <button 
                onClick={() => alert('리포트 다운로드를 시작합니다.')}
                className="w-full bg-white text-primary font-bold py-3 rounded-md flex items-center justify-center gap-2 hover:bg-primary-container transition-colors"
              >
                <span className="material-symbols-outlined">download</span>
                Download Report
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
