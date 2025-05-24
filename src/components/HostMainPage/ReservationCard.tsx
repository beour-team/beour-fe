const HostReserveList = () => {
  return (
    <div className="bg-white rounded-2xl p-6 w-full flex flex-col space-y-3">
      {/* 1. 이름 + 상태 버튼 */}
      <div className="flex items-start justify-between">
        <span className="text-2xl font-bold text-gray-900">강유진</span>
        <span className="bg-black text-white text-sm px-4 py-1 rounded-full">승인 대기</span>
      </div>

      {/* 2. 위치 */}
      <div className="text-gray-500 text-base">[스윗 라운지] 주방</div>

      {/* 3. 시간 + 인원 + > */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-1 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2"
              />
            </svg>
            <span className="text-red-400 font-semibold">18:00 - 19:00</span>
          </div>
          <span className="text-gray-300 text-lg">|</span>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-1 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-7 2-7 4v1h14v-1c0-2-3-4-7-4z" />
            </svg>
            <span className="text-gray-700 font-semibold">3인</span>
          </div>
        </div>

        {/* > 아이콘 */}
        <button>
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>

    // 액션 버튼
    //   <button className="bg-gray-300 text-gray-500 text-sm px-4 py-2 rounded-full cursor-not-allowed">
    //     이용 완료
    //   </button>
    //   <button className="bg-white text-gray-800 text-sm px-4 py-2 rounded-full shadow">예약 확정</button> */}
    //   <button>
  );
};

export default HostReserveList;
