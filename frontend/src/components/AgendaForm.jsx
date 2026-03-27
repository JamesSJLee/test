import React, { useState } from 'react';

const AgendaForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    description: '',
    priority: 'Normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      const response = await fetch('http://localhost:8000/api/agendas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status: 'Pending',
          time_ago: 'Just now'
        })
      });
      
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onBack(); // Return to dashboard
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to submit agenda:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-primary text-5xl animate-bounce">check_circle</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">안건 등록 요청 완료!</h2>
        <p className="text-slate-500">잠시 후 대시보드로 이동합니다...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-24 pb-12 px-6 animate-in slide-in-from-bottom-8 duration-700">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-8 group"
      >
        <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
        <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
      </button>

      <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-10 relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100%] transition-all"></div>
        
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">신규 안건 등록</h1>
          <p className="text-slate-500 font-medium">경영집행위원회의 의결이 필요한 새로운 안건을 등록해 주세요.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black ml-1">안건 제목</label>
              <input 
                type="text" 
                required
                placeholder="예: 2025 상반기 글로벌 마케팅 예산"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black ml-1">상정 부서</label>
              <select 
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-slate-700 appearance-none"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
              >
                <option value="">부서 선택</option>
                <option value="전략기획">전략기획본부</option>
                <option value="재무관리">재무관리실</option>
                <option value="브랜드마케팅">브랜드마케팅팀</option>
                <option value="글로벌전략">글로벌전략팀</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black ml-1">안건 상세 설명</label>
            <textarea 
              rows="5"
              required
              placeholder="안건의 목적과 주요 검토 사항을 입력해 주세요."
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-slate-600 placeholder:text-slate-300 resize-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black ml-1">첨부 파일</label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center group hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-3xl text-slate-300 mb-2 group-hover:text-primary transition-colors">cloud_upload</span>
              <p className="text-sm font-bold text-slate-500 group-hover:text-slate-700">클릭하거나 파일을 이곳에 끌어다 놓으세요</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">PDF, DOCX, PPTX (MAX. 20MB)</p>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black tracking-tight hover:bg-primary hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)] disabled:bg-slate-300 disabled:shadow-none transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  등록 중...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">send</span>
                  안건 등록하기
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgendaForm;
