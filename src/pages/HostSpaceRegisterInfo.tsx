import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const HostSpaceRegisterInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedAddress = location.state?.selectedAddress || '';

  const [capacity, setCapacity] = useState(3);
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  const [guideInput, setGuideInput] = useState('');
  const [guides, setGuides] = useState([]);

  const [cautionInput, setCautionInput] = useState('');
  const [cautions, setCautions] = useState([]);

  const [refundInput, setRefundInput] = useState('');
  const [refunds, setRefunds] = useState([]);

  const purposeList = ['단체 모임', '요리 연습', '바리스타 실습', '홈파티'];

  return (
    <div className="min-h-screen bg-white px-4 pt-6 pb-[100px] relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate("/hostspaceregister")} className="p-1">
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-center flex-1">공간 등록</h1>
      </div>

      <h2 className="text-xl font-bold mt-8">공간 정보를</h2>
      <h2 className="text-xl font-bold mb-8">입력해주세요.</h2>

      <div className="space-y-6">
        {/* 사진 업로드 */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">공간 사진</label>
          <div className="w-full h-[5rem] bg-[#F2F3F6] rounded-lg flex items-center justify-center text-sm text-gray-500">
            📷 0/10
          </div>
        </div>

        {/* 공간명 */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">공간명</label>
          <input className="w-full h-[3rem] bg-[#F2F3F6] rounded-lg px-4" placeholder="공간명을 입력해주세요" />
        </div>

        {/* 사용 용도 드롭다운 */}
        <div className="space-y-1 relative">
          <label className="text-sm font-medium text-gray-700">사용 용도</label>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full h-[3rem] bg-[#F2F3F6] rounded-lg px-4 text-left"
          >
            {selectedPurpose || '사용 용도를 선택해주세요'}
          </button>
          {isDropdownOpen && (
            <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow text-sm">
              {purposeList.map(p => (
                <li
                  key={p}
                  onClick={() => {
                    setSelectedPurpose(p);
                    setIsDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 수용 인원 */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">수용 인원</label>
          <div className="flex items-center gap-4">
            <button onClick={() => setCapacity(Math.max(1, capacity - 1))} className="w-10 h-10 rounded-full bg-[#F2F3F6] text-2xl font-bold">–</button>
            <span className="text-lg">{capacity}명</span>
            <button onClick={() => setCapacity(capacity + 1)} className="w-10 h-10 rounded-full bg-[#F2F3F6] text-2xl font-bold">+</button>
          </div>
        </div>

        {/* 주소 */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">주소</label>
          <div className="flex gap-2">
            <input value={selectedAddress} readOnly className="flex-1 h-[3rem] bg-[#F2F3F6] rounded-lg px-4" placeholder="주소를 입력해주세요" />
            <button onClick={() => navigate('/host/register/address')} className="bg-black text-white rounded-lg px-4 text-sm h-[3rem]">주소 검색</button>
          </div>
        </div>

        {/* 공간 태그 */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">공간 태그</label>
          <div className="flex gap-2">
            <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} className="flex-1 h-[3rem] bg-[#F2F3F6] rounded-lg px-4" placeholder="태그를 입력해주세요" />
            <button onClick={() => tagInput && setTags([...tags, tagInput]) & setTagInput('')} className="bg-[#F2F3F6] text-gray-700 rounded-lg px-4 text-sm">추가</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <div key={idx} className="flex items-center bg-[#E5E7EB] rounded-full px-3 py-1 text-sm">
                {tag}
                <button onClick={() => setTags(tags.filter((_, i) => i !== idx))} className="ml-2">✕</button>
              </div>
            ))}
          </div>
        </div>

        {/* 안내 항목 필드 재사용: 공간 안내, 주의 사항, 환불 정책 */}
        {[['공간 안내', guideInput, setGuideInput, guides, setGuides],
          ['주의 사항', cautionInput, setCautionInput, cautions, setCautions],
          ['환불 정책', refundInput, setRefundInput, refunds, setRefunds]].map(([label, input, setInput, list, setList], i) => (
          <div className="space-y-1" key={i}>
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div className="flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 h-[3rem] bg-[#F2F3F6] rounded-lg px-4" placeholder={`ex) ${label} 예시 입력`} />
              <button onClick={() => input && setList([...list, input]) & setInput('')} className="bg-[#F2F3F6] text-gray-700 rounded-lg px-4 text-sm">안내 추가</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {list.map((text, idx) => (
                <div key={idx} className="flex items-center bg-[#E5E7EB] rounded-full px-3 py-1 text-sm">
                  {text}
                  <button onClick={() => setList(list.filter((_, i) => i !== idx))} className="ml-2">✕</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 작성 완료 버튼 */}
      <div className="fixed bottom-4 left-0 w-full px-4">
        <button onClick={() => alert("작성 완료")}
          className="w-full py-4 bg-black text-white rounded-xl font-semibold text-base">
          작성 완료
        </button>
      </div>
    </div>
  );
};

export default HostSpaceRegisterInfo;
