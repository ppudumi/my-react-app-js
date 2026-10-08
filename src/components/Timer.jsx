import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Start 버튼 클릭 핸들러
  const handleStart = () => {
    setIsRunning(true);
  };

  // Pause 버튼 클릭 핸들러
  const handlePause = () => {
    setIsRunning(false);
  };

  // Reset 버튼 클릭 핸들러 (Event Handler에서 처리)
  const handleReset = () => {
    // seconds만 0으로 변경
    // isRunning은 그대로 유지 (Timer가 실행중이면 실행중 유지)
    setSeconds(0);
  };

  // ===== useEffect: 타이머 관리 =====
  useEffect(() => {
    let interval = null;

    // isRunning이 true일 때만 setInterval 실행
    if (isRunning) {
      // setInterval로 1초마다 seconds 증가
      interval = setInterval(() => {
        // Functional Update 사용: setSeconds(prev => prev + 1)
        // 이전 값(prev)을 기반으로 새로운 값 계산
        // 장점: 이전 상태값에 기반해서 정확하게 업데이트됨
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000); // 1000ms = 1초
    }

    // ===== Cleanup Function =====
    // 목적: 다음 Effect 실행 전 또는 컴포넌트 언마운트 될 때 실행
    // 역할: 중복된 interval 생성 방지 (메모리 누수 방지)
    return () => {
      if (interval) {
        clearInterval(interval); // 이전 interval 중지
      }
    };

  }, [isRunning]); // Dependency Array: [isRunning]
  // 왜 [isRunning]인가?
  // - isRunning이 변경될 때마다 useEffect가 다시 실행됨
  // - Start 누르면: isRunning = false → true로 변경 → Effect 재실행 → setInterval 시작
  // - Pause 누르면: isRunning = true → false로 변경 → Effect 재실행 → Cleanup 실행 → clearInterval

  // 현재 상태 표시
  const statusText = isRunning ? 'Running' : 'Paused';

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Timer</h1>

      <div style={{ fontSize: '48px', fontWeight: 'bold', margin: '20px 0' }}>
        {seconds}초
      </div>

      <p>현재 경과 시간: {seconds}초</p>

      {/* 상태 표시 */}
      <p style={{ fontSize: '18px', color: isRunning ? 'green' : 'red', fontWeight: 'bold' }}>
        상태: {statusText}
      </p>

      {/* 버튼들 */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handleStart}
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Start
        </button>

        <button
          onClick={handlePause}
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Pause
        </button>

        <button
          onClick={handleReset}
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;