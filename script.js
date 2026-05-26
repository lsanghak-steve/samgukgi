// --- [데이터 구조 정의] ---
// 게임에 등장하는 장수들의 능력치 데이터입니다. (이름, 무력, 지력, 정치, 매력, 충성도, 배속 병력)
const officers = [
    { name: '조조', force: 72, int: 91, pol: 94, char: 96, loyalty: 100, soldiers: 0 },
    { name: '하후돈', force: 90, int: 60, pol: 70, char: 82, loyalty: 95, soldiers: 0 },
    { name: '순욱', force: 14, int: 95, pol: 98, char: 86, loyalty: 98, soldiers: 0 }
];

// 등용 가능한 재야 장수들의 대기 리스트입니다.
let freeAgents = [
    { name: '허저', force: 96, int: 35, pol: 20, char: 58, loyalty: 70, soldiers: 0 },
    { name: '곽가', force: 15, int: 98, pol: 84, char: 78, loyalty: 75, soldiers: 0 },
    { name: '장료', force: 92, int: 78, pol: 58, char: 85, loyalty: 72, soldiers: 0 }
];

// 현재 플레이어가 조종하는 군주 및 게임의 전체 상태 정보입니다.
let playerState = {
    rulerId: 0,         // officers 목록에서 0번째 인물(조조)을 군주로 지정
    fame: 150,          // 현재 명성 수치
    actionPoints: 3,    // 턴마다 쓸 수 있는 명령서 횟수
    maxActionPoints: 3, // 수동 변경 가능한 명령서 기준치 (새 턴 시작 시 이 수치로 충전됨)
    year: 190,          // 게임 시작 연도
    month: 1            // 게임 시작 월
};

// 삼국지 주요 성곽 도시 데이터 풀입니다. (각 도시의 자원, 스탯 및 소속 장수 정보)
let cities = {
    '허창': { owner: '조조', gold: 1000, grain: 5000, soldiers: 2000, training: 40, agriculture: 50, commerce: 50, floodControl: 50, image: 'castle.png', officers: [] },
    '낙양': { owner: '동탁', gold: 3000, grain: 15000, soldiers: 8000, training: 60, agriculture: 70, commerce: 65, floodControl: 75, image: 'castle.png', officers: [{ name: '여포', force: 100, int: 26, pol: 13, char: 40, loyalty: 75, soldiers: 0 }] },
    '업': { owner: '원소', gold: 1500, grain: 7500, soldiers: 3500, training: 50, agriculture: 55, commerce: 55, floodControl: 60, image: 'castle.png', officers: [{ name: '안량', force: 89, int: 42, pol: 30, char: 55, loyalty: 80, soldiers: 0 }] },
    '서주': { owner: '도겸', gold: 1200, grain: 6000, soldiers: 2500, training: 45, agriculture: 60, commerce: 50, floodControl: 55, image: 'castle_water.png', officers: [{ name: '장패', force: 78, int: 50, pol: 45, char: 60, loyalty: 85, soldiers: 0 }] },
    '건업': { owner: '손책', gold: 1800, grain: 9000, soldiers: 4500, training: 55, agriculture: 65, commerce: 60, floodControl: 65, image: 'castle_water.png', officers: [{ name: '태사자', force: 93, int: 62, pol: 48, char: 79, loyalty: 85, soldiers: 0 }] },
    '성도': { owner: '유언', gold: 2000, grain: 10000, soldiers: 5000, training: 50, agriculture: 70, commerce: 60, floodControl: 65, image: 'castle_mountain.png', officers: [{ name: '장임', force: 84, int: 76, pol: 68, char: 72, loyalty: 90, soldiers: 0 }] },
    '양양': { owner: '유표', gold: 1500, grain: 7000, soldiers: 3000, training: 45, agriculture: 65, commerce: 55, floodControl: 60, image: 'castle_mountain.png', officers: [{ name: '황충', force: 93, int: 60, pol: 52, char: 75, loyalty: 85, soldiers: 0 }] },
    '평원': { owner: '공손찬', gold: 1000, grain: 5000, soldiers: 2500, training: 40, agriculture: 45, commerce: 40, floodControl: 50, image: 'castle.png', officers: [{ name: '조운', force: 96, int: 76, pol: 65, char: 88, loyalty: 90, soldiers: 0 }] },
    '북해': { owner: '공융', gold: 1200, grain: 6000, soldiers: 3000, training: 45, agriculture: 55, commerce: 60, floodControl: 50, image: 'castle_water.png', officers: [{ name: '공융', force: 40, int: 75, pol: 80, char: 70, loyalty: 100, soldiers: 0 }] },
    '신야': { owner: '유비', gold: 800, grain: 4000, soldiers: 2000, training: 70, agriculture: 40, commerce: 40, floodControl: 45, image: 'castle_mountain.png', officers: [{ name: '관우', force: 97, int: 82, pol: 62, char: 93, loyalty: 95, soldiers: 0 }, { name: '장비', force: 98, int: 30, pol: 18, char: 45, loyalty: 95, soldiers: 0 }] },
    '진양': { owner: '장양', gold: 1000, grain: 5000, soldiers: 2500, training: 40, agriculture: 45, commerce: 40, floodControl: 50, image: 'castle.png', officers: [{ name: '장양', force: 68, int: 52, pol: 48, char: 55, loyalty: 100, soldiers: 0 }] },
    
    // --- [신규 추가 도시 20개] ---
    '장안': { owner: '동탁', gold: 2500, grain: 12000, soldiers: 6000, training: 55, agriculture: 65, commerce: 60, floodControl: 70, image: 'castle.png', officers: [] },
    '천수': { owner: '동탁', gold: 1000, grain: 5000, soldiers: 2500, training: 45, agriculture: 45, commerce: 40, floodControl: 45, image: 'castle_mountain.png', officers: [] },
    '한중': { owner: '동탁', gold: 1500, grain: 7000, soldiers: 3000, training: 50, agriculture: 55, commerce: 50, floodControl: 60, image: 'castle_mountain.png', officers: [] },
    '북평': { owner: '공손찬', gold: 1200, grain: 6000, soldiers: 3000, training: 50, agriculture: 50, commerce: 45, floodControl: 50, image: 'castle.png', officers: [] },
    '양평': { owner: '공손찬', gold: 800, grain: 4000, soldiers: 2000, training: 40, agriculture: 40, commerce: 35, floodControl: 40, image: 'castle.png', officers: [] },
    '대군': { owner: '원소', gold: 900, grain: 4500, soldiers: 2200, training: 45, agriculture: 45, commerce: 40, floodControl: 45, image: 'castle.png', officers: [] },
    '하비': { owner: '도겸', gold: 1600, grain: 8000, soldiers: 4000, training: 45, agriculture: 60, commerce: 55, floodControl: 55, image: 'castle_water.png', officers: [] },
    '여남': { owner: '조조', gold: 1000, grain: 5000, soldiers: 2000, training: 40, agriculture: 50, commerce: 45, floodControl: 50, image: 'castle.png', officers: [] },
    '수춘': { owner: '원소', gold: 1800, grain: 9000, soldiers: 4500, training: 50, agriculture: 60, commerce: 60, floodControl: 55, image: 'castle_water.png', officers: [] },
    '완': { owner: '동탁', gold: 1100, grain: 5500, soldiers: 2500, training: 45, agriculture: 55, commerce: 50, floodControl: 50, image: 'castle.png', officers: [] },
    '영안': { owner: '유언', gold: 1000, grain: 5000, soldiers: 2000, training: 40, agriculture: 50, commerce: 45, floodControl: 55, image: 'castle_mountain.png', officers: [] },
    '강릉': { owner: '유표', gold: 1800, grain: 9000, soldiers: 4000, training: 50, agriculture: 65, commerce: 60, floodControl: 65, image: 'castle_water.png', officers: [] },
    '무릉': { owner: '유표', gold: 800, grain: 4000, soldiers: 1800, training: 40, agriculture: 45, commerce: 40, floodControl: 50, image: 'castle_mountain.png', officers: [] },
    '영릉': { owner: '유표', gold: 800, grain: 4000, soldiers: 1500, training: 35, agriculture: 45, commerce: 40, floodControl: 45, image: 'castle_mountain.png', officers: [] },
    '계양': { owner: '유표', gold: 800, grain: 4000, soldiers: 1500, training: 35, agriculture: 45, commerce: 40, floodControl: 45, image: 'castle_mountain.png', officers: [] },
    '장사': { owner: '손책', gold: 1200, grain: 6000, soldiers: 3000, training: 45, agriculture: 55, commerce: 50, floodControl: 55, image: 'castle_water.png', officers: [] },
    '시상': { owner: '손책', gold: 1000, grain: 5000, soldiers: 2500, training: 45, agriculture: 50, commerce: 45, floodControl: 55, image: 'castle_water.png', officers: [] },
    '여강': { owner: '손책', gold: 1100, grain: 5500, soldiers: 2500, training: 45, agriculture: 55, commerce: 50, floodControl: 50, image: 'castle_water.png', officers: [] },
    '오': { owner: '손책', gold: 1500, grain: 7500, soldiers: 3500, training: 50, agriculture: 60, commerce: 60, floodControl: 60, image: 'castle_water.png', officers: [] },
    '회계': { owner: '손책', gold: 1200, grain: 6000, soldiers: 3000, training: 45, agriculture: 55, commerce: 50, floodControl: 55, image: 'castle_water.png', officers: [] }
};

// (중복 코드 및 충돌 방지용 정리 완료)

// 군주(세력) 이름과 지도상의 깃발 색상(CSS 클래스) 매핑 테이블입니다.
const ownerClassMap = {
    '조조': 'owner-cho',
    '동탁': 'owner-dong',
    '원소': 'owner-yuan',
    '도겸': 'owner-tao',
    '손책': 'owner-sun',
    '유언': 'owner-liu',
    '유표': 'owner-bia',
    '공손찬': 'owner-gong',
    '공융': 'owner-kong',
    '유비': 'owner-liu-bei',
    '장양': 'owner-zhang'
};

// 각 성곽 도시 간에 진군 및 이동이 가능한 연결 경로(간선) 목록입니다.
const roadRoutes = [
    // 요동 & 하북 지역
    { from: '양평', to: '북평' },
    { from: '북평', to: '평원' },
    { from: '북평', to: '대군' },
    { from: '대군', to: '진양' },
    { from: '진양', to: '업' },
    { from: '진양', to: '낙양' },
    { from: '업', to: '평원' },
    { from: '업', to: '낙양' },
    { from: '업', to: '북해' },
    { from: '평원', to: '북해' },
    
    // 서주 & 중원 지역
    { from: '북해', to: '서주' },
    { from: '서주', to: '하비' },
    { from: '서주', to: '허창' },
    { from: '하비', to: '수춘' },
    { from: '낙양', to: '장안' },
    { from: '낙양', to: '허창' },
    { from: '낙양', to: '완' },
    { from: '장안', to: '천수' },
    { from: '장안', to: '한중' },
    { from: '천수', to: '한중' },
    { from: '천수', to: '성도' },
    { from: '한중', to: '성도' },
    
    // 허창 주변 & 형주 지역
    { from: '허창', to: '여남' },
    { from: '허창', to: '완' },
    { from: '여남', to: '수춘' },
    { from: '여남', to: '완' },
    { from: '완', to: '신야' },
    { from: '신야', to: '양양' },
    { from: '양양', to: '강릉' },
    { from: '양양', to: '여강' },
    
    // 양쯔강(장강) 및 촉/오나라 지역
    { from: '성도', to: '영안' },
    { from: '영안', to: '강릉' },
    { from: '영안', to: '무릉' },
    { from: '강릉', to: '무릉' },
    { from: '강릉', to: '장사' },
    { from: '무릉', to: '영릉' },
    { from: '영릉', to: '계양' },
    { from: '계양', to: '장사' },
    { from: '장사', to: '시상' },
    { from: '시상', to: '여강' },
    { from: '시상', to: '건업' },
    { from: '수춘', to: '여강' },
    { from: '수춘', to: '건업' },
    { from: '여강', to: '건업' },
    { from: '건업', to: '오' },
    { from: '오', to: '회계' }
];

// 현재 플레이어가 선택하여 조회하고 있는 도시명입니다.
let selectedCityName = '허창';

// 현재 어떤 메뉴가 열려 있는지 상태를 기록하여 수정 후 화면을 즉시 새로고침하는 변수입니다.
let currentMenuState = 'main';

// --- [오토 플레이 상태 변수] ---
let autoPlayInterval = null;
let isAutoPlaying = false;
let isBattleRunning = false;

// 100명의 삼국지 무작위를 자동 생성하고 다른 세력 도시들에 분배 배치하는 초기화 함수입니다.
function initializeGameData() {
    const surnames = ['유', '조', '손', '사마', '제갈', '장', '관', '마', '황', '조', '등', '강', '위', '순', '곽', '가', '동', '여', '주', '육', '감', '허', '방', '서', '한'];
    const names = ['웅', '돈', '연', '비', '우', '선', '권', '소', '포', '량', '욱', '가', '유', '녕', '충', '운', '초', '통', '후', '탁', '애', '회', '연', '백', '평'];
    
    let nameSet = new Set();
    
    // 1. 기존 freeAgents를 기반으로 시작해 100명이 채워질 때까지 무작위 조합 생성
    while (freeAgents.length < 100) {
        const sIdx = Math.floor(Math.random() * surnames.length);
        const nIdx = Math.floor(Math.random() * names.length);
        const fullName = surnames[sIdx] + names[nIdx];
        
        // 중복 이름 유효성 검사
        const isExist = officers.some(o => o.name === fullName) || freeAgents.some(o => o.name === fullName);
        if (!isExist && !nameSet.has(fullName)) {
            nameSet.add(fullName);
            const forceVal = Math.floor(Math.random() * 66) + 30; // 30 ~ 95
            const intVal = Math.floor(Math.random() * 66) + 30;   // 30 ~ 95
            const polVal = Math.floor(Math.random() * 66) + 30;   // 30 ~ 95
            const charVal = Math.floor(Math.random() * 66) + 30;  // 30 ~ 95
            
            freeAgents.push({
                name: fullName,
                force: forceVal,
                int: intVal,
                pol: polVal,
                char: charVal,
                loyalty: 70,
                soldiers: 0
            });
        }
    }
    
    // 2. 생성된 100명 무장 중 약 30명을 뽑아 타 세력의 도시에 골고루 초기 영입(분배)합니다.
    // 플레이어의 도시 '허창'은 전역 officers를 사용하므로 분배에서 제외
    const enemyCities = Object.keys(cities).filter(cName => cities[cName].owner !== '조조');
    
    for (let i = 0; i < 30; i++) {
        if (freeAgents.length === 0) break;
        const randAgentIdx = Math.floor(Math.random() * freeAgents.length);
        const agent = freeAgents.splice(randAgentIdx, 1)[0];
        
        const randCityName = enemyCities[Math.floor(Math.random() * enemyCities.length)];
        if (!cities[randCityName].officers) {
            cities[randCityName].officers = [];
        }
        
        agent.loyalty = 80; // 세력에 정식 임명되었으므로 충성도 소폭 상향
        cities[randCityName].officers.push(agent);
    }
}

// --- [화면 업데이트 로직] ---
// 군주의 정보와 현재 날짜를 화면에 반영하는 함수입니다.
function updateStatusBar() {
    const ruler = officers[playerState.rulerId]; // 선택된 군주 정보 가져오기
    document.getElementById('ruler-name').textContent = ruler.name;
    document.getElementById('fame-val').textContent = playerState.fame;
    document.getElementById('action-point').textContent = playerState.actionPoints;
    
    // 본진 '허창'의 금, 군량, 병력 정보를 상단 상태바에 실시간 동기화합니다.
    const baseCity = cities['허창'];
    document.getElementById('status-gold').textContent = baseCity.gold.toLocaleString();
    document.getElementById('status-grain').textContent = baseCity.grain.toLocaleString();
    document.getElementById('status-soldiers').textContent = baseCity.soldiers.toLocaleString();
    
    // 화면 상단의 날짜(예: 190년 1월)를 업데이트합니다.
    document.getElementById('turn-info').textContent = `${playerState.year}년 ${playerState.month}월`;
    
    // 현재 선택한 도시에 따라 하단 내정, 군사, 인사 버튼의 활성화/비활성화 상태를 연동합니다.
    updateActionMenuButtons();
}

// 하단 메뉴 버튼들을 활성화 또는 비활성화 상태로 만드는 제어 함수입니다.
function updateActionMenuButtons() {
    const isOwner = cities[selectedCityName].owner === '조조';
    
    document.getElementById('btn-domestic').disabled = !isOwner;
    document.getElementById('btn-military').disabled = !isOwner;
    document.getElementById('btn-personnel').disabled = !isOwner;
    
    // 출병 버튼은 아군 도시가 아닐 때(타 세력 영토를 선택했을 때) 활성화됩니다.
    document.getElementById('btn-war').disabled = isOwner;
}

// 중국 지도 화면을 중앙 메인 영역에 렌더링하는 함수입니다.
function showMapScreen() {
    const mainContent = document.querySelector('.main-content');
    
    // 각 도시의 실제 지배 세력(owner) 정보에 맞춰 세력 깃발과 성주 태그가 실시간 반영된 HTML 노드를 만듭니다.
    function getCityNodeHTML(cityName, top, left, nodeId) {
        const city = cities[cityName];
        const ownerClass = ownerClassMap[city.owner] || '';
        return `
            <div class="city-node ${ownerClass}" id="${nodeId}" style="top: ${top}; left: ${left};" onclick="selectCity('${cityName}')">
                ${cityName}
                <div class="owner-tag">${city.owner}</div>
            </div>
        `;
    }

    // 각 도시의 지도 렌더링용 % 좌표 정보 딕셔너리입니다. (겹침 방지 및 SVG 노선 계산용 통합 데이터)
    const cityCoords = {
        '양평': { top: '5%', left: '85%' },
        '북평': { top: '8%', left: '68%' },
        '평원': { top: '18%', left: '56%' },
        '대군': { top: '6%', left: '42%' },
        '진양': { top: '14%', left: '24%' },
        '북해': { top: '24%', left: '80%' },
        '업': { top: '22%', left: '42%' },
        '낙양': { top: '38%', left: '26%' },
        '장안': { top: '38%', left: '14%' },
        '천수': { top: '32%', left: '2%' },
        '서주': { top: '36%', left: '66%' },
        '하비': { top: '46%', left: '82%' },
        '허창': { top: '48%', left: '48%' },
        '여남': { top: '60%', left: '52%' },
        '수춘': { top: '52%', left: '68%' },
        '완': { top: '54%', left: '36%' },
        '신야': { top: '62%', left: '26%' },
        '한중': { top: '58%', left: '2%' },
        '성도': { top: '74%', left: '2%' },
        '영안': { top: '76%', left: '14%' },
        '양양': { top: '70%', left: '38%' },
        '강릉': { top: '78%', left: '38%' },
        '무릉': { top: '86%', left: '26%' },
        '영릉': { top: '92%', left: '16%' },
        '계양': { top: '92%', left: '42%' },
        '장사': { top: '86%', left: '54%' },
        '시상': { top: '80%', left: '62%' },
        '여강': { top: '68%', left: '62%' },
        '건업': { top: '66%', left: '76%' },
        '오': { top: '74%', left: '86%' },
        '회계': { top: '90%', left: '86%' }
    };

    // 1. 도시 연결 노선(간선)을 그릴 SVG 라인 요소들을 동적으로 생성합니다.
    let svgLinesHTML = '';
    roadRoutes.forEach(route => {
        const start = cityCoords[route.from];
        const end = cityCoords[route.to];
        if (start && end) {
            // 노드 크기가 55px이므로 중앙 보정을 위한 오프셋을 더해 줍니다.
            // 컨테이너 크기 가로 560px, 세로 480px 기준 27.5px의 백분율 오프셋
            const sL = parseFloat(start.left);
            const sT = parseFloat(start.top);
            const eL = parseFloat(end.left);
            const eT = parseFloat(end.top);
            
            const x1 = (sL + 4.9) + '%';
            const y1 = (sT + 5.7) + '%';
            const x2 = (eL + 4.9) + '%';
            const y2 = (eT + 5.7) + '%';
            
            svgLinesHTML += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(22, 160, 133, 0.45)" stroke-width="2.5" stroke-dasharray="4,4" />`;
        }
    });

    // 2. 31개 도시 노드의 HTML을 동적 루프로 빌드합니다.
    let nodesHTML = '';
    const cityNodeIdMap = {
        '허창': 'node-hechang', '낙양': 'node-luoyang', '업': 'node-ye', '서주': 'node-xizhou',
        '건업': 'node-janye', '성도': 'node-chengdu', '양양': 'node-xiangyang', '평원': 'node-pingyuan',
        '북해': 'node-bokhae', '신야': 'node-xinya', '진양': 'node-jinyang',
        '장안': 'node-zhangan', '천수': 'node-tianshu', '한중': 'node-hanzhong', '북평': 'node-beiping',
        '양평': 'node-yangping', '대군': 'node-daegun', '하비': 'node-xiabi', '여남': 'node-yeonam',
        '수춘': 'node-suchun', '완': 'node-wan', '영안': 'node-yongan', '강릉': 'node-gangneung',
        '무릉': 'node-mureung', '영릉': 'node-yeongleung', '계양': 'node-gyeyang', '장사': 'node-changsha',
        '시상': 'node-xisang', '여강': 'node-yeogang', '오': 'node-o', '회계': 'node-hoege'
    };

    for (const cityName in cities) {
        const coord = cityCoords[cityName];
        const nodeId = cityNodeIdMap[cityName] || '';
        if (coord && nodeId) {
            nodesHTML += getCityNodeHTML(cityName, coord.top, coord.left, nodeId);
        }
    }

    // 3. 지도판 및 SVG 레이어와 노드를 주입합니다.
    mainContent.innerHTML = `
        <div class="map-board">
            <div class="map-title">🗺️ 삼국지 전술 지도 (전술선 연결판)</div>
            <div class="map-container" style="position: relative;">
                <!-- SVG 전술 연결선 레이어 (배경 바로 위, 노드 밑에 배치) -->
                <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                    ${svgLinesHTML}
                </svg>
                <!-- 도시 노드들 (z-index 조절하여 선보다 위로 배치) -->
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 2; pointer-events: none;">
                    <!-- 개별 노드들은 pointer-events를 다시 활성화해 줍니다 -->
                    <style>
                        .city-node { pointer-events: auto; }
                    </style>
                    ${nodesHTML}
                </div>
            </div>
            <!-- 선택한 도시 정보 출력 패널 -->
            <div class="city-detail-panel" id="city-info-panel">
                <h4>선택된 영토 정보</h4>
                <p>거점 성곽을 마우스로 클릭하여 정보를 확인하고 통치를 시작하세요.</p>
            </div>
        </div>
    `;

    // 맵 스크린을 띄울 때, 이전에 선택되었던 도시가 있으면 해당 도시를 다시 자동으로 하이라이트 선택해 줍니다.
    selectCity(selectedCityName);
}

// 지도의 도시 거점(노드) 클릭 시 정보를 보여주고 세팅하는 함수입니다.
function selectCity(cityName) {
    selectedCityName = cityName;
    
    // 1. 모든 성곽 노드에서 활성화된 광채 클래스를 제거합니다.
    const nodes = document.querySelectorAll('.city-node');
    nodes.forEach(node => node.classList.remove('selected-active'));
    
    // 2. 클릭하여 선택된 노드에 하이라이트 깜빡임(selected-active) 효과를 줍니다.
    const cityNodeIdMap = {
        '허창': 'node-hechang', '낙양': 'node-luoyang', '업': 'node-ye', '서주': 'node-xizhou',
        '건업': 'node-janye', '성도': 'node-chengdu', '양양': 'node-xiangyang', '평원': 'node-pingyuan',
        '북해': 'node-bokhae', '신야': 'node-xinya', '진양': 'node-jinyang',
        '장안': 'node-zhangan', '천수': 'node-tianshu', '한중': 'node-hanzhong', '북평': 'node-beiping',
        '양평': 'node-yangping', '대군': 'node-daegun', '하비': 'node-xiabi', '여남': 'node-yeonam',
        '수춘': 'node-suchun', '완': 'node-wan', '영안': 'node-yongan', '강릉': 'node-gangneung',
        '무릉': 'node-mureung', '영릉': 'node-yeongleung', '계양': 'node-gyeyang', '장사': 'node-changsha',
        '시상': 'node-xisang', '여강': 'node-yeogang', '오': 'node-o', '회계': 'node-hoege'
    };
    const targetNodeId = cityNodeIdMap[cityName] || '';
    
    const targetNode = document.getElementById(targetNodeId);
    if (targetNode) {
        targetNode.classList.add('selected-active');
    }

    // 3. 우측 정보 패널 렌더링
    const infoPanel = document.getElementById('city-info-panel');
    const city = cities[cityName];
    const isPlayerCity = city.owner === '조조';

    // 주둔 장수 목록 빌드
    let officerListHTML = '';
    if (isPlayerCity) {
        // 아군 전체 장수
        officerListHTML = officers.map(o => `<li>👤 ${o.name} (무력 ${o.force})</li>`).join('');
    } else {
        // 타 세력 도시 주둔 장수
        const cityOffs = city.officers || [];
        if (cityOffs.length > 0) {
            officerListHTML = cityOffs.map(o => `<li>👤 ${o.name} (무력 ${o.force})</li>`).join('');
        } else {
            officerListHTML = `<li style="color: #888; list-style: none;">주둔 장수 없음</li>`;
        }
    }

    let detailHTML = `
        <div class="city-image-container" style="margin-bottom: 12px; text-align: center; overflow: hidden; border-radius: 6px; border: 1px solid #444;">
            <img class="city-portrait" src="${city.image}" alt="${cityName}" style="width: 100%; max-height: 140px; display: block; object-fit: cover; transition: transform 0.3s ease;">
        </div>
        <h4>🏰 ${cityName} 성 (${city.owner} 세력)</h4>
        <p>🪙 금: <strong>${city.gold}</strong> | 🌾 군량: <strong>${city.grain}</strong></p>
        <p>🎖️ 주둔군: <strong>${city.soldiers.toLocaleString()}</strong> 명 | 🔥 훈련도: <strong>${city.training}</strong> / 100</p>
        <p>🌾 농업도: <strong>${city.agriculture}</strong> | 💰 상업도: <strong>${city.commerce}</strong> | 🌊 치수도: <strong>${city.floodControl}</strong></p>
        
        <div class="city-officers-box" style="margin-top: 10px; padding: 10px; background-color: #1a1a1a; border-radius: 6px; border: 1px solid #333; text-align: left;">
            <h5 style="margin: 0 0 6px 0; color: #f1c40f; font-size: 0.9rem; border-bottom: 1px solid #444; padding-bottom: 3px;">🎖️ 주둔 장수 목록</h5>
            <ul style="margin: 0; padding-left: 15px; font-size: 0.85rem; max-height: 100px; overflow-y: auto; color: #ddd; line-height: 1.5;">
                ${officerListHTML}
            </ul>
        </div>
    `;

    if (!isPlayerCity) {
        detailHTML += `<div class="warning-txt">⚠️ 타 세력의 영토입니다. (하단의 영토 통치 명령이 통제됩니다)</div>`;
    } else {
        detailHTML += `<div class="result-msg" style="margin-top: 10px; padding: 5px 10px; background-color: #34495e;">⚔️ 조조군의 세력 거점입니다. 통치 명령을 내릴 수 있습니다.</div>`;
    }

    infoPanel.innerHTML = detailHTML;

    // 4. 하단 동작메뉴 버튼 상태 업데이트
    updateActionMenuButtons();
}

// 내정(개발) 메뉴 화면을 중앙 영역에 그려주는 함수입니다.
function showDomesticMenu() {
    currentMenuState = 'domestic'; // 내정 메뉴로 현재 상태 변경
    const mainContent = document.querySelector('.main-content');
    const activeCity = cities[selectedCityName];
    
    mainContent.innerHTML = `
        <div class="domestic-menu">
            <h3>도시: ${selectedCityName} 내정 관리</h3>
            <div class="city-stats">
                <p>🌾 농업도: <strong>${activeCity.agriculture}</strong> / 100</p>
                <p>💰 상업도: <strong>${activeCity.commerce}</strong> / 100</p>
                <p>🌊 치수도: <strong>${activeCity.floodControl}</strong> / 100</p>
                <p>
                    🪙 금: <strong>${activeCity.gold}</strong><span class="edit-btn" title="금 수정" onclick="modifyResource('gold', '금')">✏️</span> 
                    | 🌾 군량: <strong>${activeCity.grain}</strong><span class="edit-btn" title="군량 수정" onclick="modifyResource('grain', '군량')">✏️</span>
                </p>
            </div>
            <div class="domestic-actions" style="display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; gap: 8px;">
                    <button class="btn btn-sub" id="btn-dev-agri" style="flex: 1;">농업 개발 (-1)</button>
                    <button class="btn btn-sub" id="btn-dev-comm" style="flex: 1;">상업 개발 (-1)</button>
                    <button class="btn btn-sub" id="btn-dev-flood" style="flex: 1;">치수 개발 (-1)</button>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="btn btn-sub" id="btn-dev-auto" style="flex: 2; background-color: #16a085; border-color: #117a65;">🤖 자동 내정 (남은 명령서 소모)</button>
                    <button class="btn btn-sub" id="btn-dev-back" style="flex: 1;">지도 복귀</button>
                </div>
            </div>
            <div id="domestic-result" style="margin-top: 15px;"></div>
        </div>
    `;

    // 내정 하위 메뉴 버튼들에 클릭 동작을 각각 연결합니다.
    document.getElementById('btn-dev-agri').addEventListener('click', () => developCity('agriculture', '농업도'));
    document.getElementById('btn-dev-comm').addEventListener('click', () => developCity('commerce', '상업도'));
    document.getElementById('btn-dev-flood').addEventListener('click', () => developCity('floodControl', '치수도'));
    document.getElementById('btn-dev-auto').addEventListener('click', runAutoDomestic);
    document.getElementById('btn-dev-back').addEventListener('click', showMainMessage);
}

// 도시의 농업/상업/치수 3가지 수치를 한 번에 상승시키는 로직입니다.
function developAllCityStats() {
    const resultDiv = document.getElementById('domestic-result');
    const activeCity = cities[selectedCityName];
    
    // 1. 명령서(행동력)가 0 이하인지 체크합니다.
    if (playerState.actionPoints <= 0) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 명령서가 부족하여 실행할 수 없습니다! (턴을 종료하세요)</div>`;
        return;
    }

    // 2. 3가지 개발도가 모두 최대값 100에 도달했는지 확인합니다.
    if (activeCity.agriculture >= 100 && activeCity.commerce >= 100 && activeCity.floodControl >= 100) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 이미 모든 내정 수치(농업/상업/치수)가 최대치(100)입니다!</div>`;
        return;
    }

    // 3. 명령서를 1개 소모하고 상태바를 새로고침합니다.
    playerState.actionPoints -= 1;
    updateStatusBar();
    
    // 4. 각각의 개발도를 5 ~ 15 사이의 무작위 값만큼 올립니다. (최대 100 제한)
    const incAgri = Math.floor(Math.random() * 11) + 5;
    const incComm = Math.floor(Math.random() * 11) + 5;
    const incFlood = Math.floor(Math.random() * 11) + 5;

    let msgParts = [];
    if (activeCity.agriculture < 100) { activeCity.agriculture = Math.min(100, activeCity.agriculture + incAgri); msgParts.push(`농업 +${incAgri}`); }
    if (activeCity.commerce < 100) { activeCity.commerce = Math.min(100, activeCity.commerce + incComm); msgParts.push(`상업 +${incComm}`); }
    if (activeCity.floodControl < 100) { activeCity.floodControl = Math.min(100, activeCity.floodControl + incFlood); msgParts.push(`치수 +${incFlood}`); }

    // 5. 변경된 수치를 화면에 다시 그리기 위해 내정 메뉴를 새로고침합니다.
    showDomesticMenu();

    // 6. 수행 성공 결과를 화면 하단에 안내 메시지로 보여줍니다.
    document.getElementById('domestic-result').innerHTML = `
        <div class="result-msg">✨ 종합 내정 개발 성공! (${msgParts.join(', ')})</div>
    `;
}

// 아군 전체 도시를 대상으로 남은 명령서를 모두 사용하여 내정을 올리는 자동화 로직입니다.
function runAutoDomestic() {
    const resultDiv = document.getElementById('domestic-result');

    // 1. 명령서(행동력)가 0 이하인지 체크합니다.
    if (playerState.actionPoints <= 0) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 명령서가 부족하여 실행할 수 없습니다! (턴을 종료하세요)</div>`;
        return;
    }

    const startPoints = playerState.actionPoints;
    let usedPoints = 0;
    let logs = []; // 어떤 성의 무엇이 올랐는지 기록할 배열

    // 2. 명령서가 남아있고 개발 가능한 도시/분야가 있는 동안 반복 실행합니다.
    while (playerState.actionPoints > 0) {
        // 아군('조조') 소속의 도시들만 수집
        const playerCities = [];
        for (const cName in cities) {
            if (cities[cName].owner === '조조') {
                playerCities.push({ name: cName, data: cities[cName] });
            }
        }

        if (playerCities.length === 0) break;

        // 모든 아군 도시의 모든 내정 지표(농업, 상업, 치수) 중 100 미만이고 수치가 가장 낮은 대상을 찾습니다.
        let target = null; // { cityName, statType, val }
        
        playerCities.forEach(item => {
            const cName = item.name;
            const cData = item.data;

            const stats = [
                { type: 'agriculture', label: '농업도', val: cData.agriculture },
                { type: 'commerce', label: '상업도', val: cData.commerce },
                { type: 'floodControl', label: '치수도', val: cData.floodControl }
            ];

            stats.forEach(s => {
                if (s.val < 100) {
                    if (target === null || s.val < target.val) {
                        target = { cityName: cName, statType: s.type, statLabel: s.label, val: s.val };
                    }
                }
            });
        });

        // 더 이상 100 미만인 내정 지표가 없다면(전부 100 달성 시) 루프 종료
        if (!target) {
            break;
        }

        // 3. 해당 대상을 개발시킵니다. (5 ~ 15 무작위 상승)
        const increaseVal = Math.floor(Math.random() * 11) + 5;
        const cityData = cities[target.cityName];
        cityData[target.statType] = Math.min(100, cityData[target.statType] + increaseVal);

        // 명령서 차감 및 카운트 증가
        playerState.actionPoints -= 1;
        usedPoints += 1;

        // 로그 기록
        logs.push(`<strong>[${target.cityName}]</strong>의 <strong>${target.statLabel}</strong> +${increaseVal} 상승 (결과: ${cityData[target.statType]}/100)`);
    }

    // 4. 화면 및 상태바를 갱신합니다.
    updateStatusBar();
    showDomesticMenu();

    // 5. 수행 결과 출력
    if (usedPoints > 0) {
        let resultHTML = `<div class="result-msg" style="line-height: 1.6; text-align: left; background-color: #1e3f35; border: 1px solid #16a085; padding: 10px; border-radius: 6px; margin-top: 10px;">`;
        resultHTML += `<strong style="color: #2ecc71;">🤖 자동 내정이 정상 완료되었습니다! (명령서 ${usedPoints}개 소모)</strong><br>`;
        resultHTML += `<ul style="margin: 5px 0 0 0; padding-left: 18px; font-size: 0.9rem; color: #ddd;">`;
        logs.forEach(log => {
            resultHTML += `<li style="margin: 2px 0;">✨ ${log}</li>`;
        });
        resultHTML += `</ul></div>`;
        resultDiv.innerHTML = resultHTML;
    } else {
        resultDiv.innerHTML = `
            <div class="error-msg">⚠️ 아군 영토의 모든 도시 내정(농업, 상업, 치수)이 이미 최대치(100)입니다!</div>
        `;
    }
}

// 군사(징병/훈련) 메뉴 화면을 중앙 영역에 그려주는 함수입니다.
function showMilitaryMenu() {
    currentMenuState = 'military'; // 군사 메뉴로 현재 상태 변경
    const mainContent = document.querySelector('.main-content');
    const activeCity = cities[selectedCityName];
    
    mainContent.innerHTML = `
        <div class="domestic-menu">
            <h3>도시: ${selectedCityName} 군사 관리</h3>
            <div class="city-stats">
                <p>🎖️ 총 병력: <strong>${activeCity.soldiers.toLocaleString()}</strong> 명 <span class="edit-btn" title="총 병력 수정" onclick="modifyResource('soldiers', '총 병력')">✏️</span></p>
                <p>🔥 부대 훈련도: <strong>${activeCity.training}</strong> / 100</p>
                <p>
                    🪙 금: <strong>${activeCity.gold}</strong><span class="edit-btn" title="금 수정" onclick="modifyResource('gold', '금')">✏️</span> 
                    | 🌾 군량: <strong>${activeCity.grain}</strong><span class="edit-btn" title="군량 수정" onclick="modifyResource('grain', '군량')">✏️</span>
                </p>
            </div>
            <div class="domestic-actions">
                <button class="btn btn-sub" id="btn-mil-recruit">징병 (금 -200)</button>
                <button class="btn btn-sub" id="btn-mil-train">훈련 (군량 -500)</button>
                <button class="btn btn-sub" id="btn-mil-back">지도 복귀</button>
            </div>
            <div id="military-result"></div>
        </div>
    `;

    // 군사 하위 메뉴 버튼들에 클릭 동작을 각각 연결합니다.
    document.getElementById('btn-mil-recruit').addEventListener('click', recruitSoldiers);
    document.getElementById('btn-mil-train').addEventListener('click', trainSoldiers);
    document.getElementById('btn-mil-back').addEventListener('click', showMainMessage);
}

// 징병 명령을 수행하는 로직입니다.
function recruitSoldiers() {
    const resultDiv = document.getElementById('military-result');
    const activeCity = cities[selectedCityName];

    // 1. 명령서 체크
    if (playerState.actionPoints <= 0) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 명령서가 부족하여 실행할 수 없습니다! (턴을 종료하세요)</div>`;
        return;
    }

    // 2. 자금(금) 체크 (징병에는 금 200 소모)
    if (activeCity.gold < 200) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 자금이 부족하여 징병할 수 없습니다! (금 200 필요)</div>`;
        return;
    }

    // 3. 자원 및 명령서 차감, 스탯 변경 (신병 유입으로 훈련도 5 감소)
    playerState.actionPoints -= 1;
    activeCity.gold -= 200;
    activeCity.soldiers += 1000;
    activeCity.training = Math.max(0, activeCity.training - 5);

    // 4. 상단 및 군사 메뉴 갱신
    updateStatusBar();
    showMilitaryMenu();

    // 5. 실행 결과 출력
    document.getElementById('military-result').innerHTML = `
        <div class="result-msg">🎖️ 징병 성공! 1,000명의 신병을 모았습니다. (훈련도 -5, 금 -200)</div>
    `;
}

// 부대 훈련 명령을 수행하는 로직입니다.
function trainSoldiers() {
    const resultDiv = document.getElementById('military-result');
    const activeCity = cities[selectedCityName];

    // 1. 명령서 체크
    if (playerState.actionPoints <= 0) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 명령서가 부족하여 실행할 수 없습니다! (턴을 종료하세요)</div>`;
        return;
    }

    // 2. 군량 체크 (훈련에는 군량 500 소모)
    if (activeCity.grain < 500) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 군량이 부족하여 훈련할 수 없습니다! (군량 500 필요)</div>`;
        return;
    }

    // 3. 이미 최대 훈련도(100)인지 체크
    if (activeCity.training >= 100) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 이미 부대의 훈련도가 최대치(100)입니다!</div>`;
        return;
    }

    // 4. 자원 및 명령서 차감, 훈련도 무작위 상승 (10 ~ 20)
    playerState.actionPoints -= 1;
    activeCity.grain -= 500;
    const increaseVal = Math.floor(Math.random() * 11) + 10;
    activeCity.training = Math.min(100, activeCity.training + increaseVal);

    // 5. 상단 및 군사 메뉴 갱신
    updateStatusBar();
    showMilitaryMenu();

    // 6. 실행 결과 출력
    document.getElementById('military-result').innerHTML = `
        <div class="result-msg">🔥 훈련 성공! 부대 훈련도가 ${increaseVal} 상승했습니다. (군량 -500)</div>
    `;
}

// 인사(장수 목록/포상/수색) 화면을 렌더링하는 함수입니다.
function showPersonnelMenu() {
    currentMenuState = 'personnel'; // 인사 메뉴로 현재 상태 변경
    const mainContent = document.querySelector('.main-content');
    const activeCity = cities[selectedCityName];
    
    // 소속 장수들 행 HTML 구조 빌드
    let tableRows = '';
    officers.forEach((off, idx) => {
        const loyaltyClass = off.loyalty < 90 ? 'loyalty-low' : 'loyalty-normal';
        const assignedSoldiers = off.soldiers || 0;
        tableRows += `
            <tr>
                <td><strong>${off.name}</strong></td>
                <td>${off.force}</td>
                <td>${off.int}</td>
                <td>${off.pol}</td>
                <td>${off.char}</td>
                <td class="${loyaltyClass}">${off.loyalty}</td>
                <td><strong>${assignedSoldiers.toLocaleString()}</strong> 명</td>
                <td><button class="btn-assign" onclick="assignSoldiers(${idx})">배속</button></td>
            </tr>
        `;
    });

    mainContent.innerHTML = `
        <div class="domestic-menu">
            <h3>조조군 소속 장수 현황</h3>
            <table class="officer-table">
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>무력</th>
                        <th>지력</th>
                        <th>정치</th>
                        <th>매력</th>
                        <th>충성</th>
                        <th>병력</th>
                        <th>배속</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
            <div class="city-stats" style="margin-top: 10px;">
                <p>
                    🪙 보유 자금: <strong>${activeCity.gold}</strong> 금 <span class="edit-btn" title="금 수정" onclick="modifyResource('gold', '금')">✏️</span>
                    | 🌾 예비 병력: <strong>${activeCity.soldiers.toLocaleString()}</strong> 명 <span class="edit-btn" title="예비 병력 수정" onclick="modifyResource('soldiers', '예비 병력')">✏️</span>
                </p>
                <button class="btn btn-sub" id="btn-auto-assign" style="background-color: #2980b9; margin-top: 8px; width: 100%;">🤖 병력 자동 균등 분배</button>
            </div>
            <div class="domestic-actions">
                <button class="btn btn-sub" id="btn-per-reward">포상 (금 -100)</button>
                <button class="btn btn-sub" id="btn-per-search">인재 수색</button>
                <button class="btn btn-sub" id="btn-per-poach" style="background-color: #d35400;">타 세력 등용 (금 -300)</button>
                <button class="btn btn-sub" id="btn-per-back">지도 복귀</button>
            </div>
            <div id="personnel-result"></div>
        </div>
    `;

    // 인사 동작 리스너 바인딩
    document.getElementById('btn-per-reward').addEventListener('click', rewardOfficer);
    document.getElementById('btn-per-search').addEventListener('click', searchTalents);
    document.getElementById('btn-per-poach').addEventListener('click', poachOfficer);
    document.getElementById('btn-auto-assign').addEventListener('click', autoAssignSoldiers);
    document.getElementById('btn-per-back').addEventListener('click', showMainMessage);
}

// 장수에게 병력을 배속하는 로직입니다. (도시의 예비 병력과 가감이 연동됩니다)
function assignSoldiers(idx) {
    const activeCity = cities[selectedCityName];
    const off = officers[idx];
    const currentSoldiers = off.soldiers || 0;
    
    // 1. 브라우저 prompt를 통해 배속할 병사 수를 입력받습니다.
    const input = prompt(`[${off.name}] 장수에게 배속할 병사 수를 입력해 주세요.\n(현재 배속: ${currentSoldiers.toLocaleString()}명 / 도시 예비 병력: ${activeCity.soldiers.toLocaleString()}명):`);
    
    // 2. 취소 버튼을 누른 경우 처리를 중단합니다.
    if (input === null) return;
    
    // 3. 입력값의 형태가 올바른 숫자인지 검증합니다.
    const targetSoldiers = parseInt(input.trim(), 10);
    if (isNaN(targetSoldiers) || targetSoldiers < 0) {
        alert("❌ 올바른 숫자를 입력해 주세요! (음수나 글자는 입력할 수 없습니다)");
        return;
    }
    
    // 4. 배속하고자 하는 차이값(증감분)을 계산합니다.
    const difference = targetSoldiers - currentSoldiers;
    
    // 5. 도시 예비 병력 한도를 초과하여 배속하려고 하는지 검증합니다.
    if (difference > activeCity.soldiers) {
        alert(`❌ 예비 병력이 부족합니다!\n(추가 필요: ${difference.toLocaleString()}명 / 현재 예비 병력: ${activeCity.soldiers.toLocaleString()}명)`);
        return;
    }
    
    // 6. 예비 병력을 차감/환원하고 장수의 병력을 갱신합니다.
    activeCity.soldiers -= difference;
    off.soldiers = targetSoldiers;
    
    // 7. 새로 바뀐 정보를 화면에 다시 그립니다.
    showPersonnelMenu();
}

// 도시 예비 병력과 장수들의 배속 병력을 모두 회수하여 균등하게 재분배하는 편의 기능입니다.
function autoAssignSoldiers() {
    const activeCity = cities[selectedCityName];
    const officerCount = officers.length;
    
    if (officerCount === 0) {
        alert("❌ 소속된 장수가 없어 병력을 분배할 수 없습니다!");
        return;
    }
    
    // 1. 장수들의 기존 배속 병력을 모두 더하여 예비 병력과 통합 (총가용 병력 계산)
    let totalAvailableSoldiers = activeCity.soldiers;
    officers.forEach(off => {
        totalAvailableSoldiers += (off.soldiers || 0);
    });
    
    // 2. 가용 병력이 장수 숫자보다 작은지 체크
    if (totalAvailableSoldiers < officerCount) {
        alert(`❌ 분배할 병력이 부족합니다! (총 가용 병력: ${totalAvailableSoldiers}명 / 소속 장수: ${officerCount}명)`);
        return;
    }
    
    // 3. 1인당 균등 배분 수치 및 자투리 연산
    const perOfficer = Math.floor(totalAvailableSoldiers / officerCount);
    const remainder = totalAvailableSoldiers % officerCount;
    
    // 4. 모든 장수에게 처음부터 균등하게 재분배
    officers.forEach(off => {
        off.soldiers = perOfficer;
    });
    
    // 5. 도시 예비 병력을 자투리 분량으로 갱신
    activeCity.soldiers = remainder;
    
    // 6. 화면 동기화
    showPersonnelMenu();
    
    // 7. 결과 메시지 친절하게 표시
    document.getElementById('personnel-result').innerHTML = `
        <div class="result-msg">🤖 아군의 총병력 <strong>${totalAvailableSoldiers.toLocaleString()}명</strong>(장수 병력 및 예비군 통합)을 회수하여 장수 ${officerCount}명에게 각각 <strong>${perOfficer.toLocaleString()}명</strong>씩 고르게 균등 재분배하고, 남은 <strong>${remainder}명</strong>은 예비 병력으로 유지했습니다.</div>
    `;
}

// 출병 준비(부대 편성) 화면을 렌더링하는 함수입니다.
function showWarMenu() {
    currentMenuState = 'war'; // 현재 메뉴 상태를 'war'로 설정
    const mainContent = document.querySelector('.main-content');
    const targetCityName = selectedCityName; // 공격 대상 도시
    const targetCity = cities[targetCityName];
    
    // 장수 선택 체크박스 목록 생성 (병력과 능력치를 보여줌)
    let officerSelectionHTML = '';
    officers.forEach((off, idx) => {
        const assignedSoldiers = off.soldiers || 0;
        officerSelectionHTML += `
            <div class="war-officer-item" style="display: flex; align-items: center; justify-content: space-between; padding: 8px 15px; border-bottom: 1px solid #333;">
                <label style="display: flex; align-items: center; cursor: pointer; gap: 8px; width: 100%;">
                    <input type="checkbox" name="war-officers" value="${idx}" style="transform: scale(1.2);">
                    <strong>${off.name}</strong> (무력: ${off.force} | 지력: ${off.int})
                </label>
                <span style="color: #ffd700; font-weight: bold;">${assignedSoldiers.toLocaleString()} 명</span>
            </div>
        `;
    });

    // 플레이어가 소유한 아군 도시 목록으로 옵션을 빌드합니다.
    let startCityOptionsHTML = '';
    for (const cName in cities) {
        if (cities[cName].owner === '조조') {
            const selected = cName === selectedCityName ? 'selected' : '';
            startCityOptionsHTML += `<option value="${cName}" ${selected}>${cName}</option>`;
        }
    }

    mainContent.innerHTML = `
        <div class="domestic-menu">
            <h3>⚔️ [${targetCityName}] 공략 출병 편성</h3>
            
            <div class="city-stats" style="text-align: left; font-size: 0.95rem;">
                <p style="margin-bottom: 8px;">
                    <strong>📍 출발 도시 선택:</strong> 
                    <select id="war-start-city" style="background-color: #2b2b2b; color: #fff; border: 1px solid #555; padding: 4px 8px; border-radius: 4px; font-weight: bold; cursor: pointer; margin-left: 5px;">
                        ${startCityOptionsHTML}
                    </select>
                </p>
                <div id="war-start-city-stats">
                    <!-- 출발 도시 자원 정보 출력 패널 -->
                </div>
            </div>
            
            <h4 style="margin: 15px 0 8px 0; text-align: left; color: #4ca1af; font-size: 1rem;">🗡️ 출전 장수 선택</h4>
            <div class="war-officer-list" style="background-color: #252525; border: 1px solid #3a3a3a; border-radius: 6px; max-height: 180px; overflow-y: auto; margin-bottom: 20px;">
                ${officerSelectionHTML}
            </div>

            <div class="domestic-actions">
                <button class="btn btn-sub" id="btn-war-confirm" style="background-color: #78281f; border-color: #943126;">출병 개시</button>
                <button class="btn btn-sub" id="btn-war-back">지도 복귀</button>
            </div>
            <div id="war-result" style="margin-top: 15px;"></div>
        </div>
    `;

    // 출발 도시 선택 변경 시 동적으로 자원 수치를 업데이트하는 함수
    const selectStartCity = document.getElementById('war-start-city');
    const statsDiv = document.getElementById('war-start-city-stats');

    function updateStartCityStats() {
        const startCityName = selectStartCity.value;
        const playerBase = cities[startCityName];
        statsDiv.innerHTML = `
            <p style="margin: 4px 0;"><strong>📦 아군 출발지 자원:</strong> 🪙 금 ${playerBase.gold.toLocaleString()} | 🌾 군량 ${playerBase.grain.toLocaleString()} | ⚡ 명령서 ${playerState.actionPoints}개</p>
            <p style="color: #e74c3c; font-weight: bold; margin: 4px 0;">⚠️ 출병 비용: 명령서 1개 소모 | 🌾 군량 1,000 소모</p>
            <p style="margin: 4px 0;"><strong>🏰 목표 적 세력:</strong> ${targetCityName} (${targetCity.owner}군 | 수비 병력: ${targetCity.soldiers.toLocaleString()}명)</p>
        `;
    }

    selectStartCity.addEventListener('change', updateStartCityStats);
    updateStartCityStats(); // 최초 렌더링 시 연동

    // 이벤트 리스너 바인딩
    document.getElementById('btn-war-back').addEventListener('click', showMainMessage);
    document.getElementById('btn-war-confirm').addEventListener('click', startWarExecution);
}

// 출병 조건 검증 및 전쟁을 실행하는 로직입니다.
function startWarExecution() {
    const resultDiv = document.getElementById('war-result');
    const startCityName = document.getElementById('war-start-city').value;
    const playerBase = cities[startCityName];
    const targetCityName = selectedCityName;
    
    // 1. 명령서(행동력) 체크
    if (playerState.actionPoints <= 0) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 명령서가 부족하여 출병할 수 없습니다! (턴을 종료하세요)</div>`;
        return;
    }

    // 2. 출발 도시의 군량 체크 (군량 1,000 소모)
    if (playerBase.grain < 1000) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 출발지(${startCityName})에 출병용 군량이 부족합니다! (군량 1,000 필요)</div>`;
        return;
    }

    // 3. 선택된 장수들 수집
    const checkboxes = document.querySelectorAll('input[name="war-officers"]:checked');
    if (checkboxes.length === 0) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 출전할 장수를 최소 1명 이상 선택해 주세요!</div>`;
        return;
    }

    let selectedIdxs = [];
    let totalWarSoldiers = 0;

    checkboxes.forEach(cb => {
        const idx = parseInt(cb.value, 10);
        selectedIdxs.push(idx);
        totalWarSoldiers += (officers[idx].soldiers || 0);
    });

    // 4. 출전 장수들의 총 배속 병력 체크
    if (totalWarSoldiers <= 0) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 출전 부대의 총 병력이 0명입니다! 장수에게 병력을 먼저 배속해 주세요.</div>`;
        return;
    }

    // 5. 조건 만족 시 자원 및 명령서 차감
    playerState.actionPoints -= 1;
    playerBase.grain -= 1000;
    updateStatusBar();

    // 6. 진군 성공 결과 출력
    resultDiv.innerHTML = `<div class="result-msg">⚔️ 출병 개시! ${selectedIdxs.length}명의 장수와 총 ${totalWarSoldiers.toLocaleString()}명의 병사가 출발지 [${startCityName}]에서 [${targetCityName}]을(를) 향해 진군합니다!</div>`;
    
    // 7. 시각적 진군 애니메이션 (지도 위 🐎 아이콘 이동)
    const mapContainer = document.querySelector('.map-container');
    const startNode = cities[startCityName];
    const targetNode = cities[targetCityName];

    if (mapContainer && startNode && targetNode) {
        // 아이콘 엘리먼트 생성
        const troopIcon = document.createElement('div');
        troopIcon.className = 'troop-marching-icon';
        troopIcon.innerHTML = '🐎';
        
        // 초기 위치 세팅 (출발지)
        troopIcon.style.left = startNode.x + '%';
        troopIcon.style.top = startNode.y + '%';
        mapContainer.appendChild(troopIcon);

        // 약간의 딜레이 후 목적지 좌표로 변경하여 CSS transition 발동
        setTimeout(() => {
            troopIcon.style.left = targetNode.x + '%';
            troopIcon.style.top = targetNode.y + '%';
        }, 50);

        // 1.5초(애니메이션 끝) 후 돔 제거 및 전투 화면 진입
        setTimeout(() => {
            if (troopIcon.parentNode) {
                troopIcon.parentNode.removeChild(troopIcon);
            }
            executeBattleSimulation(targetCityName, selectedIdxs, totalWarSoldiers, startCityName);
        }, 1500);
    } else {
        // 지도를 못찾는 등 예외 상황 시 기존 타이머 로직
        setTimeout(() => {
            executeBattleSimulation(targetCityName, selectedIdxs, totalWarSoldiers, startCityName);
        }, 1500);
    }
}

// 자동 전투 시뮬레이션을 실행하는 함수입니다.
function executeBattleSimulation(targetCityName, selectedIdxs, totalWarSoldiers, startCityName) {
    const mainContent = document.querySelector('.main-content');
    const targetCity = cities[targetCityName];
    
    // 1. 전투 중계 화면 렌더링 (UI 개편)
    mainContent.innerHTML = `
        <div class="domestic-menu" style="text-align: left; max-width: 520px; margin: 0 auto; display: flex; flex-direction: column;">
            <h3 style="text-align: center; color: #e74c3c; margin-top:0;">⚔️ [${targetCityName}] 공방전 중계</h3>
            
            <!-- 상단 대치 구도 (HP 바 포함) -->
            <div id="battle-ui-container" class="battle-versus-container">
                <div class="battle-side" id="att-side">
                    <h4>조조군 선봉장</h4>
                    <div class="officer-name" id="att-officer-name">선봉장</div>
                    <div style="font-size: 0.85rem; color:#ccc;">병력: <span id="att-soldier-count">0</span></div>
                    <div class="hp-bar-container">
                        <div class="hp-bar-fill" id="att-hp-bar"></div>
                    </div>
                </div>
                
                <div class="battle-vs-mark">VS</div>
                
                <div class="battle-side" id="def-side">
                    <h4>${targetCity.owner}군 수비장</h4>
                    <div class="officer-name" id="def-officer-name">수비장수</div>
                    <div style="font-size: 0.85rem; color:#ccc;">병력: <span id="def-soldier-count">0</span></div>
                    <div class="hp-bar-container">
                        <div class="hp-bar-fill" id="def-hp-bar"></div>
                    </div>
                </div>
            </div>

            <!-- 중앙 이펙트 팝업 존 -->
            <div id="battle-effect-zone" class="battle-effect-zone">
                <!-- 데미지 텍스트 동적 생성 -->
            </div>

            <!-- 하단 텍스트 로그 -->
            <div id="battle-log-area" style="background-color: #121212; padding: 10px; border-radius: 6px; border: 1px solid #3a3a3a; height: 160px; overflow-y: auto; font-family: 'Courier New', Courier, monospace; font-size: 0.8rem; line-height: 1.5; color: #e0e0e0; margin-bottom: 15px; box-shadow: inset 0 0 10px rgba(0,0,0,0.8);">
            </div>
            
            <div id="battle-footer" style="text-align: center;">
                <button class="btn btn-sub" id="btn-battle-done" style="display: none; width: 100%;">지도 복귀</button>
            </div>
        </div>
    `;

    const logArea = document.getElementById('battle-log-area');
    const btnDone = document.getElementById('btn-battle-done');
    
    // 완료 후 복귀 버튼 이벤트 연결
    btnDone.addEventListener('click', () => {
        showMainMessage();
    });

    // 로그 출력 보조 함수
    function addLog(text, color = '#e0e0e0') {
        const p = document.createElement('p');
        p.style.margin = '4px 0';
        p.style.color = color;
        p.innerHTML = text;
        logArea.appendChild(p);
        logArea.scrollTop = logArea.scrollHeight; // 맨 밑으로 스크롤
    }

    // 2. 적 대표 장수 매핑
    const defenseRulerMap = {
        '낙양': { officer: '여포', force: 100 },
        '업': { officer: '안량', force: 89 },
        '서주': { officer: '장패', force: 78 },
        '건업': { officer: '태사자', force: 93 },
        '성도': { officer: '장임', force: 84 },
        '양양': { officer: '황충', force: 93 },
        '평원': { officer: '조운', force: 96 },
        '북해': { officer: '공융', force: 40 },
        '신야': { officer: '관우', force: 97 },
        '진양': { officer: '장양', force: 68 },
        
        // --- [신규 추가 성 수비장수] ---
        '장안': { officer: '곽사', force: 76 },
        '천수': { officer: '이각', force: 72 },
        '한중': { officer: '장위', force: 74 },
        '북평': { officer: '공손월', force: 70 },
        '양평': { officer: '공손도', force: 69 },
        '대군': { officer: '고간', force: 71 },
        '하비': { officer: '조표', force: 62 },
        '여남': { officer: '조홍', force: 79 },
        '수춘': { officer: '기령', force: 83 },
        '완': { officer: '장제', force: 72 },
        '영안': { officer: '엄안', force: 82 },
        '강릉': { officer: '채모', force: 76 },
        '무릉': { officer: '금선', force: 62 },
        '영릉': { officer: '형도영', force: 80 },
        '계양': { officer: '진응', force: 73 },
        '장사': { officer: '한현', force: 52 },
        '시상': { officer: '주태', force: 91 },
        '여강': { officer: '주유', force: 71 },
        '오': { officer: '엄백호', force: 70 },
        '회계': { officer: '왕랑', force: 35 }
    };
    const defender = defenseRulerMap[targetCityName] || { officer: '수비대장', force: 65 };

    // 3. 아군 선봉장(무력이 가장 높은 무장) 선정
    let bestAttOfficer = officers[selectedIdxs[0]];
    selectedIdxs.forEach(idx => {
        if (officers[idx].force > bestAttOfficer.force) {
            bestAttOfficer = officers[idx];
        }
    });

    // 4. 초기 변수 및 UI 요소 세팅
    let attSoldiers = totalWarSoldiers;
    let defSoldiers = targetCity.soldiers;
    const initialAttSoldiers = attSoldiers;
    const initialDefSoldiers = defSoldiers;
    const attTraining = cities[startCityName].training; // 출발지 훈련도
    const defTraining = targetCity.training;
    
    const attNameEl = document.getElementById('att-officer-name');
    const defNameEl = document.getElementById('def-officer-name');
    const attCountEl = document.getElementById('att-soldier-count');
    const defCountEl = document.getElementById('def-soldier-count');
    const attHpBar = document.getElementById('att-hp-bar');
    const defHpBar = document.getElementById('def-hp-bar');
    const effectZone = document.getElementById('battle-effect-zone');
    const uiContainer = document.getElementById('battle-ui-container');

    // UI 정보 초기화
    attNameEl.innerText = `${bestAttOfficer.name} (무력 ${bestAttOfficer.force})`;
    defNameEl.innerText = `${defender.officer} (무력 ${defender.force})`;

    function updateHpUi() {
        attCountEl.innerText = attSoldiers.toLocaleString();
        defCountEl.innerText = defSoldiers.toLocaleString();
        
        let attPct = Math.max(0, (attSoldiers / initialAttSoldiers) * 100);
        let defPct = Math.max(0, (defSoldiers / initialDefSoldiers) * 100);
        
        attHpBar.style.width = attPct + '%';
        defHpBar.style.width = defPct + '%';
        
        if (attPct < 30) attHpBar.classList.add('danger');
        if (defPct < 30) defHpBar.classList.add('danger');
    }
    updateHpUi();

    // 팝업 이펙트 생성 헬퍼
    function spawnDamageEffect(text, color, isLeft) {
        const popup = document.createElement('div');
        popup.className = 'damage-popup';
        popup.style.color = color;
        popup.innerText = text;
        popup.style.left = isLeft ? '20%' : '60%'; // 좌우 위치 구분
        effectZone.appendChild(popup);
        
        setTimeout(() => {
            if (popup.parentNode) popup.parentNode.removeChild(popup);
        }, 900); // 애니메이션 0.8s 후 조금 뒤 삭제
    }

    // 일기토 화면 흔들림 효과
    function triggerShake() {
        uiContainer.classList.remove('shake-effect');
        void uiContainer.offsetWidth; // 리플로우 강제 (애니메이션 재시작)
        uiContainer.classList.add('shake-effect');
    }

    addLog(`📢 조조군 선봉장 <strong>[${bestAttOfficer.name}]</strong> 출진!`, '#3498db');
    addLog(`📢 ${targetCity.owner}군 수비장수 <strong>[${defender.officer}]</strong> 수비 돌입!`, '#e67e22');
    addLog(`⚔️ 전투 개시!`, '#ffd700');
    addLog(`--------------------------------------------------`, '#555');

    let round = 1;

    // 5. 시뮬레이션 인터벌 실행
    const battleInterval = setInterval(() => {
        if (attSoldiers <= 0 || defSoldiers <= 0) {
            clearInterval(battleInterval);
            finalizeBattle();
            return;
        }

        addLog(`⚡ <strong>[제 ${round}합]</strong> 전투가 치열해집니다!`);

        // 피해량 연산 (무력, 병사 규모, 훈련도가 기여하며 랜덤 주사위 값 합산)
        const attPower = (bestAttOfficer.force * 2.5) + (attSoldiers * 0.04) + (attTraining * 0.4);
        const defPower = (defender.force * 2.5) + (defSoldiers * 0.04) + (defTraining * 0.4);

        // 서로에게 입히는 피해 계산
        let toDefDamage = Math.floor(attPower * (0.8 + Math.random() * 0.4));
        let toAttDamage = Math.floor(defPower * (0.8 + Math.random() * 0.4));

        // 난수로 일기토 및 특수 연출 확률 추가
        const eventChance = Math.random();
        if (eventChance < 0.15) {
            triggerShake();
            spawnDamageEffect("💥 일기토!", "#f1c40f", true);
            spawnDamageEffect("💥 일기토!", "#f1c40f", false);
            addLog(`🔥 <em>일기토 발생! [${bestAttOfficer.name}]과 [${defender.officer}]이 합을 겨룹니다!</em>`, '#f1c40f');
            if (bestAttOfficer.force > defender.force) {
                addLog(`💥 [${bestAttOfficer.name}]의 맹렬한 공격으로 적 사기가 꺾입니다!`);
                toDefDamage = Math.floor(toDefDamage * 1.5);
            } else {
                addLog(`💥 [${defender.officer}]의 철벽 반격에 조조군이 주춤합니다!`);
                toAttDamage = Math.floor(toAttDamage * 1.5);
            }
        } else {
            // 일반 타격 이펙트
            spawnDamageEffect("⚔️", "#bdc3c7", true);
        }

        attSoldiers = Math.max(0, attSoldiers - toAttDamage);
        defSoldiers = Math.max(0, defSoldiers - toDefDamage);

        // 데미지 팝업 연출
        setTimeout(() => {
            spawnDamageEffect(`-${toAttDamage}`, "#e74c3c", true);
            spawnDamageEffect(`-${toDefDamage}`, "#e74c3c", false);
        }, 200);

        // UI 체력 바 및 텍스트 즉시 갱신
        updateHpUi();

        addLog(`🗡️ 조조군: <span style="color: #e74c3c;">-${toAttDamage.toLocaleString()}</span> | 🛡️ 적군: <span style="color: #e74c3c;">-${toDefDamage.toLocaleString()}</span>`);
        addLog(`--------------------------------------------------`, '#555');

        round++;
    }, 800);

    // 6. 전투 종료 결과 적용
    function finalizeBattle() {
        if (defSoldiers === 0 && attSoldiers > 0) {
            // 아군 승리
            addLog(`👑 <strong>축하합니다! 조조군이 대승리를 거두었습니다!</strong>`, '#2ecc71');
            addLog(`🏰 <strong>[${targetCityName}] 성을 점령하여 영토로 복속했습니다!</strong>`, '#2ecc71');
            addLog(`🛡️ 남은 생존 병사 ${attSoldiers.toLocaleString()}명이 주둔군으로 편입됩니다.`, '#3498db');

            // 도시 지배권 변경 및 잔존 병력 반영
            targetCity.owner = '조조';
            targetCity.soldiers = attSoldiers;

            // 전쟁 피해로 점령지 내정 개발도 및 훈련도 손상
            targetCity.training = Math.max(10, Math.floor(targetCity.training * 0.8));
            targetCity.agriculture = Math.max(10, Math.floor(targetCity.agriculture * 0.8));
            targetCity.commerce = Math.max(10, Math.floor(targetCity.commerce * 0.8));
            targetCity.floodControl = Math.max(10, Math.floor(targetCity.floodControl * 0.8));

            // 명성 상승
            playerState.fame += 50;
            addLog(`✨ 군주의 명성이 <strong>50</strong> 상승했습니다! (현재 명성: ${playerState.fame})`, '#ffd700');

        } else {
            // 아군 패배 (또는 동시 전멸 포함)
            addLog(`😭 <strong>아아... 아군 부대가 참패하여 전멸했습니다.</strong>`, '#c0392b');
            addLog(`🏃 장수들은 수하를 모두 잃고 본거지(허창)로 퇴각합니다.`, '#95a5a6');

            // 적 도시에 남은 병력 업데이트
            targetCity.soldiers = Math.max(100, defSoldiers); // 전멸했어도 최소 수비대 백 명은 남겨둠
        }

        // 참전했던 아군 장수들의 개인 병력은 0명으로 초기화 (전사했거나 도시 주둔군으로 복속됨)
        selectedIdxs.forEach(idx => {
            officers[idx].soldiers = 0;
        });

        // 상태창 업데이트
        updateStatusBar();

        // 복귀 버튼 활성화
        btnDone.style.display = 'block';

        // [오토 플레이] 중이라면 2.5초 뒤 자동 복귀(클릭) 및 전투 플래그 해제
        if (isAutoPlaying) {
            setTimeout(() => {
                isBattleRunning = false;
                btnDone.click();
            }, 2500);
        }
    }
}

// 소속 장수를 포상하여 충성도를 높이는 로직입니다.
function rewardOfficer() {
    const resultDiv = document.getElementById('personnel-result');
    const activeCity = cities[selectedCityName];

    // 1. 명령서 체크
    if (playerState.actionPoints <= 0) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 명령서가 부족하여 실행할 수 없습니다! (턴을 종료하세요)</div>`;
        return;
    }

    // 2. 자금(금) 체크 (포상에는 금 100 소모)
    if (activeCity.gold < 100) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 자금이 부족하여 포상할 수 없습니다! (금 100 필요)</div>`;
        return;
    }

    // 3. 충성도 100 미만인 장수들을 탐색합니다.
    let eligibleOfficers = officers.filter(o => o.loyalty < 100);

    if (eligibleOfficers.length === 0) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 모든 장수의 충성도가 이미 최대치(100)입니다!</div>`;
        return;
    }

    // 4. 그 중 가장 충성도가 낮은 장수를 1명 고릅니다.
    eligibleOfficers.sort((a, b) => a.loyalty - b.loyalty);
    let target = eligibleOfficers[0];

    // 5. 명령서와 금 차감, 해당 장수의 충성도 상승 (10~20 무작위)
    playerState.actionPoints -= 1;
    activeCity.gold -= 100;
    const increaseVal = Math.floor(Math.random() * 11) + 10;
    target.loyalty = Math.min(100, target.loyalty + increaseVal);

    // 6. UI 업데이트 및 성공 메시지 출력
    updateStatusBar();
    showPersonnelMenu();
    document.getElementById('personnel-result').innerHTML = `
        <div class="result-msg">🎁 포상 성공! ${target.name}의 충성도가 ${increaseVal} 증가했습니다. (금 -100)</div>
    `;
}

// 재야 장수를 탐색하여 등용하는 로직입니다.
function searchTalents() {
    const resultDiv = document.getElementById('personnel-result');

    // 1. 명령서 체크
    if (playerState.actionPoints <= 0) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 명령서가 부족하여 실행할 수 없습니다! (턴을 종료하세요)</div>`;
        return;
    }

    // 2. 재야에 남아있는 인재가 있는지 확인
    if (freeAgents.length === 0) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 더 이상 재야에 등용할 장수가 없습니다!</div>`;
        return;
    }

    // 3. 명령서 차감 및 수색 수행
    playerState.actionPoints -= 1;
    updateStatusBar();

    // 4. 50% 확률로 수색 성공 여부 판정
    const isSuccess = Math.random() < 0.5;

    if (isSuccess) {
        // 재야 장수 중 무작위 1명 영입
        const index = Math.floor(Math.random() * freeAgents.length);
        const newOfficer = freeAgents.splice(index, 1)[0]; // 재야 풀에서 제거
        newOfficer.loyalty = 80; // 새로 등용된 장수의 초기 충성도 설정
        officers.push(newOfficer); // 소속 장수에 추가

        // UI 업데이트
        showPersonnelMenu();
        document.getElementById('personnel-result').innerHTML = `
            <div class="result-msg">🎉 인재 등용 성공! 재야의 무장 <strong>${newOfficer.name}</strong>을 영입했습니다!</div>
        `;
    } else {
        // 수색 실패
        showPersonnelMenu();
        document.getElementById('personnel-result').innerHTML = `
            <div class="error-msg">🔍 도시 곳곳을 수색했으나 새로운 인재를 찾지 못했습니다.</div>
        `;
    }
}

// 타 세력의 장수를 설득하여 영입(등용)하는 함수입니다.
function poachOfficer() {
    const resultDiv = document.getElementById('personnel-result');
    const activeCity = cities[selectedCityName];

    // 1. 명령서(행동력)가 0 이하인지 체크합니다.
    if (playerState.actionPoints <= 0) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 명령서가 부족하여 실행할 수 없습니다! (턴을 종료하세요)</div>`;
        return;
    }

    // 2. 선택된 도시의 자금(금)이 300 이상인지 확인합니다.
    if (activeCity.gold < 300) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 자금이 부족하여 등용을 시도할 수 없습니다! (금 300 필요)</div>`;
        return;
    }

    // 3. 등용을 시도할 적의 도시 이름을 입력받습니다.
    const targetCityName = prompt(
        `🔍 등용(회유)을 시도할 적 도시 이름을 입력해 주세요.\n\n` +
        `[적 도시 목록]: 낙양, 업, 서주, 건업, 성도, 양양, 평원, 북해, 신야, 진양`
    );

    // 취소 버튼을 누른 경우 처리 중단
    if (targetCityName === null) return;

    const trimmedCityName = targetCityName.trim();

    // 입력값 유효성 검사
    if (!cities[trimmedCityName]) {
        alert(`❌ 존재하지 않는 도시 이름입니다: [${trimmedCityName}]`);
        return;
    }

    if (cities[trimmedCityName].owner === '조조') {
        alert("❌ 아군의 도시는 등용 대상으로 지정할 수 없습니다!");
        return;
    }

    const targetCity = cities[trimmedCityName];
    const targetOfficers = targetCity.officers || [];

    // 적 도시의 장수 유무 검사
    if (targetOfficers.length === 0) {
        resultDiv.innerHTML = `<div class="error-msg">⚠️ 해당 도시 <strong>[${trimmedCityName}]</strong>에는 등용할 수 있는 적장이 없습니다!</div>`;
        return;
    }

    // 4. 금 300과 명령서 1개를 차감하고 상태바를 갱신합니다.
    playerState.actionPoints -= 1;
    activeCity.gold -= 300;
    updateStatusBar();

    // 5. 설득 대상 장수를 1명 임의로 지목합니다.
    const targetIdx = Math.floor(Math.random() * targetOfficers.length);
    const targetOfficer = targetOfficers[targetIdx];

    // 6. 성공 확률 계산: 기본 20% + (명성 / 10)% (최대 90% 제한)
    const fameBonus = Math.floor(playerState.fame / 10);
    const successChance = Math.min(90, 20 + fameBonus);
    
    // 0~100 사이의 난수를 발생시켜 성공 여부를 판정합니다.
    const roll = Math.random() * 100;
    const isSuccess = roll < successChance;

    if (isSuccess) {
        // 설득에 성공한 장수를 적 도시 목록에서 빼내 아군으로 영입합니다.
        const newOfficer = targetOfficers.splice(targetIdx, 1)[0]; // 적 도시에서 제거
        newOfficer.loyalty = 60; // 변절자로 등용되었으므로 초기 충성도 60
        officers.push(newOfficer); // 아군 소속 장수로 영입

        // UI를 새로 그리고 결과를 표시합니다.
        showPersonnelMenu();
        document.getElementById('personnel-result').innerHTML = `
            <div class="result-msg">🎉 [성공 확률: ${successChance}%] 등용 성공! <strong>${trimmedCityName}</strong> 성의 명장 <strong>${newOfficer.name}</strong>(무력 ${newOfficer.force})을 영입했습니다! (초기 충성도: 60)</div>
        `;
    } else {
        // 등용 실패 시 결과 표시 (지목했던 장수 이름을 명시하여 생동감 제공)
        showPersonnelMenu();
        document.getElementById('personnel-result').innerHTML = `
            <div class="error-msg">🔍 [성공 확률: ${successChance}%] <strong>${trimmedCityName}</strong> 성의 <strong>${targetOfficer.name}</strong>에게 설득을 시도했으나 제안을 거절당했습니다. (금 -300)</div>
        `;
    }
}

// 자원을 수동으로 수정(디버그)하는 전역 함수입니다.
function modifyResource(type, label) {
    const activeCity = cities[selectedCityName];
    // 1. 브라우저 prompt를 띄워 값을 입력받습니다.
    const input = prompt(`수정할 [${label}] 수치를 입력해 주세요 (현재: ${activeCity[type]}):`);
    
    // 2. 사용자가 '취소'를 눌렀을 때의 예외 처리
    if (input === null) return;

    // 3. 정수로 변환하고 유효성을 검사합니다.
    const newValue = parseInt(input.trim(), 10);
    if (isNaN(newValue) || newValue < 0) {
        alert("❌ 올바른 숫자를 입력해 주세요! (음수나 글자는 불가능합니다)");
        return;
    }

    // 4. 도시 자원 데이터를 갱신합니다.
    activeCity[type] = newValue;

    // 5. 현재 활성화되어 있는 메뉴 화면을 다시 그려줍니다.
    if (currentMenuState === 'domestic') {
        showDomesticMenu();
    } else if (currentMenuState === 'military') {
        showMilitaryMenu();
    } else if (currentMenuState === 'personnel') {
        showPersonnelMenu();
    }
}

// 명령서를 수동으로 수정(최대 10개 제한)하는 전역 함수입니다.
function modifyActionPoints() {
    // 1. 브라우저 prompt를 띄워 값을 입력받습니다.
    const input = prompt(`수정할 [명령서] 개수를 입력해 주세요. (현재: ${playerState.actionPoints}개 / 최대 한도: 10개):`);
    
    // 2. 취소 시 예외 처리
    if (input === null) return;
    
    // 3. 숫자로 변환하고 유효성을 검사합니다.
    const newValue = parseInt(input.trim(), 10);
    if (isNaN(newValue) || newValue < 0) {
        alert("❌ 올바른 숫자를 입력해 주세요! (음수나 글자는 불가능합니다)");
        return;
    }
    
    // 4. 최대치 검증 (10개 한도)
    if (newValue > 10) {
        alert("❌ 명령서는 최대 10개까지만 가질 수 있습니다! (밸런스 유지용 한도)");
        return;
    }
    
    // 5. 값 반영 및 상단 상태바 리렌더링 (최대치도 함께 수정)
    playerState.actionPoints = newValue;
    playerState.maxActionPoints = newValue;
    updateStatusBar();
}

// 상단 상태바의 자원을 즉시 수정(디버그)하는 전역 함수입니다. (본진 허창의 자원 변경)
function modifyStatusBarResource(type, label) {
    const baseCity = cities['허창'];
    // 1. 브라우저 prompt를 띄워 값을 입력받습니다.
    const input = prompt(`[허창 본진]의 수정할 [${label}] 수치를 입력해 주세요 (현재: ${baseCity[type]}):`);
    
    // 2. 사용자가 '취소'를 눌렀을 때의 예외 처리
    if (input === null) return;

    // 3. 정수로 변환하고 유효성을 검사합니다.
    const newValue = parseInt(input.trim(), 10);
    if (isNaN(newValue) || newValue < 0) {
        alert("❌ 올바른 숫자를 입력해 주세요! (음수나 글자는 불가능합니다)");
        return;
    }

    // 4. 본진 허창의 데이터를 갱신합니다.
    baseCity[type] = newValue;

    // 5. 상태바와 현재 활성화된 메뉴 화면을 강제로 동기화하여 다시 그려줍니다.
    updateStatusBar();
    if (currentMenuState === 'domestic') {
        showDomesticMenu();
    } else if (currentMenuState === 'military') {
        showMilitaryMenu();
    } else if (currentMenuState === 'personnel') {
        showPersonnelMenu();
    }
}

// 메인 화면 기본 메시지 상태로 되돌아가는 함수입니다. (이제 지도를 기본 화면으로 활용합니다)
function showMainMessage() {
    currentMenuState = 'main'; // 메인 상태로 복구
    showMapScreen();
}

// 특정 슬롯의 저장 정보를 읽어와 직관적인 요약 텍스트를 반환하는 헬퍼 함수입니다.
function getSlotInfo(slotNum) {
    const savedString = localStorage.getItem(`samgukgi_save_slot_${slotNum}`);
    if (!savedString) {
        return "저장 데이터 없음";
    }
    try {
        const saveData = JSON.parse(savedString);
        return `${saveData.playerState.year}년 ${saveData.playerState.month}월 (명성: ${saveData.playerState.fame})`;
    } catch (e) {
        return "⚠️ 손상된 데이터";
    }
}

// 현재 게임의 전체 상태를 브라우저의 지정 슬롯에 저장하는 함수입니다.
function saveGame() {
    const slot1Info = getSlotInfo(1);
    const slot2Info = getSlotInfo(2);
    const slot3Info = getSlotInfo(3);

    // 1. 저장할 슬롯 번호를 입력받습니다.
    const input = prompt(
        `💾 저장할 슬롯 번호(1~3)를 입력해 주세요.\n\n` +
        `[1번 슬롯]: ${slot1Info}\n` +
        `[2번 슬롯]: ${slot2Info}\n` +
        `[3번 슬롯]: ${slot3Info}`
    );

    // 2. 취소 시 조기 종료
    if (input === null) return;

    const slotNum = parseInt(input.trim(), 10);
    // 3. 유효성 검사 (1, 2, 3번 슬롯만 허용)
    if (isNaN(slotNum) || slotNum < 1 || slotNum > 3) {
        alert("❌ 올바른 슬롯 번호(1 ~ 3)를 입력해 주세요!");
        return;
    }

    const saveData = {
        playerState: playerState,
        cities: cities,
        officers: officers,
        freeAgents: freeAgents,
        selectedCityName: selectedCityName
    };

    try {
        localStorage.setItem(`samgukgi_save_slot_${slotNum}`, JSON.stringify(saveData));
        alert(`💾 [슬롯 ${slotNum}번]에 게임 상태가 안전하게 저장되었습니다!`);
    } catch (e) {
        alert("❌ 게임 저장 중 오류가 발생했습니다. 브라우저 저장 한도를 확인해 주세요.");
    }
}

// 브라우저의 지정 슬롯에서 데이터를 가져와 화면을 복원하는 함수입니다.
function loadGame() {
    const slot1Info = getSlotInfo(1);
    const slot2Info = getSlotInfo(2);
    const slot3Info = getSlotInfo(3);

    // 1. 불러올 슬롯 번호를 입력받습니다.
    const input = prompt(
        `📂 불러올 슬롯 번호(1~3)를 입력해 주세요.\n\n` +
        `[1번 슬롯]: ${slot1Info}\n` +
        `[2번 슬롯]: ${slot2Info}\n` +
        `[3번 슬롯]: ${slot3Info}`
    );

    // 2. 취소 시 조기 종료
    if (input === null) return;

    const slotNum = parseInt(input.trim(), 10);
    // 3. 유효성 검사
    if (isNaN(slotNum) || slotNum < 1 || slotNum > 3) {
        alert("❌ 올바른 슬롯 번호(1 ~ 3)를 입력해 주세요!");
        return;
    }

    const savedString = localStorage.getItem(`samgukgi_save_slot_${slotNum}`);
    if (!savedString) {
        alert(`⚠️ [슬롯 ${slotNum}번]에 저장된 게임 데이터가 존재하지 않습니다!`);
        return;
    }
    
    try {
        const saveData = JSON.parse(savedString);
        
        // 데이터 유효성 검사 및 덮어쓰기 (const 변수인 officers는 안전하게 push 방식으로 주입)
        if (saveData.playerState) playerState = saveData.playerState;
        if (saveData.cities) cities = saveData.cities;
        if (saveData.freeAgents) freeAgents = saveData.freeAgents;
        
        if (saveData.officers) {
            officers.length = 0; // 기존 상수 배열을 비움
            saveData.officers.forEach(off => officers.push(off)); // 저장된 배열로 채움
        }
        
        if (saveData.selectedCityName) selectedCityName = saveData.selectedCityName;
        
        // 데이터 반영 후 상태 바와 지도를 실시간으로 강제 새로고침
        updateStatusBar();
        showMainMessage();
        
        alert(`📂 [슬롯 ${slotNum}번]의 게임을 성공적으로 불러왔습니다!`);
    } catch (e) {
        alert("❌ 저장 파일을 불러오는 데 실패했습니다. 데이터가 훼손되었을 수 있습니다.");
    }
}

// 웹 페이지의 모든 요소가 다 그려진 후에 아래 코드가 실행되도록 합니다.
document.addEventListener('DOMContentLoaded', () => {
    
    // 게임 시작 시 100명 재야 장수 자동 생성 및 타 세력 인재 배치 실행
    initializeGameData();

    // 최초 실행 시 지도를 메인 화면에 띄웁니다.
    showMapScreen();
    
    // 게임 시작 시 화면 상단 정보를 최신 상태로 새로고침합니다.
    updateStatusBar();
    
    // 턴 종료 버튼을 찾아냅니다.
    const btnNextTurn = document.getElementById('btn-next-turn');
    
    // 턴 종료 버튼을 클릭했을 때 실행할 동작
    btnNextTurn.addEventListener('click', () => {
        const playerBase = cities['허창'];
        const oldYear = playerState.year;
        const oldMonth = playerState.month;

        // --- 1. 유지비 및 급료 정산 ---
        // 아군 총 병력 계산 (영토 내 주둔군 + 장수 배속군)
        let totalAttSoldiers = 0;
        for (const cName in cities) {
            if (cities[cName].owner === '조조') {
                totalAttSoldiers += cities[cName].soldiers;
            }
        }
        officers.forEach(off => {
            totalAttSoldiers += (off.soldiers || 0);
        });

        const salaryCost = officers.length * 20; // 장수 1명당 20금
        const foodCost = Math.floor(totalAttSoldiers * 0.1); // 병사 10명당 1식량

        let goldReport = `💸 장수 급료 지출: -${salaryCost}금`;
        let grainReport = `🌾 군사 유지비 지출: -${foodCost}군량`;
        let penaltyReport = '';

        // 급료 지급 처리 (금 차감 및 패널티 연산)
        if (playerBase.gold >= salaryCost) {
            playerBase.gold -= salaryCost;
        } else {
            const paid = playerBase.gold;
            playerBase.gold = 0;
            goldReport = `💸 장수 급료 지출: -${paid}금 (자금 부족!)`;
            
            // 패널티: 충성도 하락
            officers.forEach(off => {
                off.loyalty = Math.max(0, off.loyalty - 5);
            });
            penaltyReport += `<p style="color: #e74c3c; font-weight: bold; margin: 4px 0;">⚠️ 자금 부족으로 소속 장수들의 충성도가 5 하락했습니다!</p>`;
        }

        // 군사 유지비 지급 처리 (군량 차감 및 패널티 연산)
        let desertedSoldiers = 0;
        if (playerBase.grain >= foodCost) {
            playerBase.grain -= foodCost;
        } else {
            const supplied = playerBase.grain;
            playerBase.grain = 0;
            grainReport = `🌾 군사 유지비 지출: -${supplied}군량 (식량 부족!)`;
            
            // 패널티: 병사 탈영 (전체 10% 감소)
            for (const cName in cities) {
                if (cities[cName].owner === '조조') {
                    const loss = Math.floor(cities[cName].soldiers * 0.1);
                    cities[cName].soldiers -= loss;
                    desertedSoldiers += loss;
                }
            }
            officers.forEach(off => {
                const loss = Math.floor((off.soldiers || 0) * 0.1);
                off.soldiers -= loss;
                desertedSoldiers += loss;
            });
            penaltyReport += `<p style="color: #e74c3c; font-weight: bold; margin: 4px 0;">⚠️ 군량 부족으로 아군 병사 ${desertedSoldiers.toLocaleString()}명이 탈영했습니다!</p>`;
        }

        // --- 2. 시간(달) 증가 ---
        playerState.month += 1;
        if (playerState.month > 12) {
            playerState.month = 1;
            playerState.year += 1;
        }

        // --- 3. 세금 징수 (새로운 달 기준) ---
        let taxReport = '';
        if (playerState.month === 1) {
            // 1월 상업 세금 징수 (아군 도시들의 상업도 비례)
            let totalCommerce = 0;
            for (const cName in cities) {
                if (cities[cName].owner === '조조') {
                    totalCommerce += cities[cName].commerce;
                }
            }
            const goldTax = (totalCommerce * 15) + 300;
            playerBase.gold += goldTax;
            taxReport = `<p style="color: #2ecc71; font-weight: bold; margin: 4px 0;">🪙 [1월 신년 세금] 상업 세금 징수: +${goldTax.toLocaleString()}금</p>`;
        } else if (playerState.month === 7) {
            // 7월 농업 세금 징수 (아군 도시들의 농업도 비례)
            let totalAgriculture = 0;
            for (const cName in cities) {
                if (cities[cName].owner === '조조') {
                    totalAgriculture += cities[cName].agriculture;
                }
            }
            const grainTax = (totalAgriculture * 60) + 1000;
            playerBase.grain += grainTax;
            taxReport = `<p style="color: #2ecc71; font-weight: bold; margin: 4px 0;">🌾 [7월 가을 세금] 농업 세금 징수: +${grainTax.toLocaleString()}군량</p>`;
        }

        // --- 4. 명령서 회복 ---
        // 사용자가 설정한 최대 명령서(maxActionPoints) 기준으로 초기화 (기본 명성 비례 회복 무효화)
        playerState.actionPoints = playerState.maxActionPoints || (3 + Math.floor(playerState.fame / 100));

        // --- 4.5. 타 세력(적군)의 재야 장수 등용 AI 시뮬레이션 ---
        let aiLogHTML = '';
        for (const cName in cities) {
            const city = cities[cName];
            // 플레이어가 지배하지 않는 적 도시이고, 재야 장수가 풀에 남아있을 때
            if (city.owner !== '조조' && freeAgents.length > 0) {
                // 15% 독립 확률로 인재 수색 성공
                if (Math.random() < 0.15) {
                    const randAgentIdx = Math.floor(Math.random() * freeAgents.length);
                    const newOff = freeAgents.splice(randAgentIdx, 1)[0];
                    if (!city.officers) {
                        city.officers = [];
                    }
                    newOff.loyalty = 80; // 세력 소속이 되었으므로 기본 충성도 80
                    city.officers.push(newOff);
                    
                    // AI 영입 로그 문자열 빌드
                    aiLogHTML += `<p style="color: #f1c40f; margin: 4px 0;">📢 <strong>${city.owner} 세력</strong>(${cName})이 재야 무장 <strong>[${newOff.name}]</strong>(무력 ${newOff.force})을 영입했습니다!</p>`;
                }
            }
        }
        
        // --- 5. 상태 바 및 지도 화면 갱신 ---
        updateStatusBar();
        showMapScreen();

        // --- 6. 지도 하단 상세 영역에 정산 보고서 출력 ---
        const infoPanel = document.getElementById('city-info-panel');
        if (infoPanel) {
            infoPanel.innerHTML = `
                <h4 style="color: #e74c3c;">📅 ${oldYear}년 ${oldMonth}월 정산 보고서</h4>
                <p style="margin: 4px 0; color: #ccc;">${goldReport}</p>
                <p style="margin: 4px 0; color: #ccc;">${grainReport}</p>
                ${penaltyReport}
                ${taxReport}
                ${aiLogHTML}
                <div class="result-msg" style="margin-top: 10px; padding: 5px 10px; background-color: #2c3e50;">
                    💡 턴이 종료되었습니다. 본거지(허창)에서 유지비가 정산되고 날짜가 변경되었습니다.
                </div>
            `;
        }
    });

    // 내정 버튼을 찾아냅니다.
    const btnDomestic = document.getElementById('btn-domestic');
    
    // 내정 버튼을 클릭했을 때 실행할 동작
    btnDomestic.addEventListener('click', () => {
        // 플레이어 도시가 선택되어 있을 때만 실행
        if (cities[selectedCityName].owner === '조조') {
            showDomesticMenu();
        }
    });

    // 군사 버튼을 찾아냅니다.
    const btnMilitary = document.getElementById('btn-military');

    // 군사 버튼을 클릭했을 때 실행할 동작
    btnMilitary.addEventListener('click', () => {
        // 플레이어 도시가 선택되어 있을 때만 실행
        if (cities[selectedCityName].owner === '조조') {
            showMilitaryMenu();
        }
    });

    // 인사 버튼을 찾아냅니다.
    const btnPersonnel = document.getElementById('btn-personnel');

    // 인사 버튼을 클릭했을 때 실행할 동작
    btnPersonnel.addEventListener('click', () => {
        // 플레이어 도시가 선택되어 있을 때만 실행
        if (cities[selectedCityName].owner === '조조') {
            showPersonnelMenu();
        }
    });

    // 출병 버튼을 찾아냅니다.
    const btnWar = document.getElementById('btn-war');

    // 출병 버튼을 클릭했을 때 실행할 동작
    btnWar.addEventListener('click', () => {
        // 타 세력 도시가 선택되어 있을 때만 실행
        if (cities[selectedCityName].owner !== '조조') {
            showWarMenu();
        }
    });

    // 저장 버튼을 찾아냅니다.
    const btnSave = document.getElementById('btn-save');
    if (btnSave) {
        btnSave.addEventListener('click', saveGame);
    }

    // 로드 버튼을 찾아냅니다.
    const btnLoad = document.getElementById('btn-load');
    if (btnLoad) {
        btnLoad.addEventListener('click', loadGame);
    }

    // 오토 플레이 버튼을 찾아냅니다.
    const btnAutoPlay = document.getElementById('btn-autoplay');
    if (btnAutoPlay) {
        btnAutoPlay.addEventListener('click', () => {
            if (isAutoPlaying) stopAutoPlay();
            else startAutoPlay();
        });
    }
});

// --- [오토 플레이 (자동 진행) 매크로 시스템] ---
function startAutoPlay() {
    if (isAutoPlaying) return;
    isAutoPlaying = true;
    
    const btn = document.getElementById('btn-autoplay');
    if(btn) {
        btn.innerHTML = '🛑 오토 플레이 중지';
        btn.style.backgroundColor = '#c0392b';
        btn.style.borderColor = '#922b21';
    }
    
    // 1초 단위로 AI 행동 수행
    autoPlayInterval = setInterval(runAutoPlayCycle, 1000);
    showMainMessage(`<div class="result-msg" style="background-color:#8e44ad; font-weight:bold;">🤖 오토 플레이 모드가 가동되었습니다! (자동 턴 진행 중)</div>`);
}

function stopAutoPlay() {
    if (!isAutoPlaying) return;
    isAutoPlaying = false;
    isBattleRunning = false;
    
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
    
    const btn = document.getElementById('btn-autoplay');
    if(btn) {
        btn.innerHTML = '🤖 오토 플레이 시작';
        btn.style.backgroundColor = '#8e44ad';
        btn.style.borderColor = '#732d91';
    }
    showMainMessage(`<div class="error-msg" style="background-color:#c0392b; color:white;">🛑 오토 플레이가 중지되었습니다.</div>`);
}

function runAutoPlayCycle() {
    if (isBattleRunning) return; // 전투 중에는 타이머 행동 일시 정지

    const btnNext = document.getElementById('btn-next-turn');

    // 명령서가 0이면 무조건 턴 넘기기
    if (playerState.actionPoints <= 0) {
        btnNext.click();
        return;
    }

    // 1순위: 재야 무장 수색 및 등용
    if (freeAgents.length > 0) {
        searchTalents();
        return;
    }

    // 2순위: 내정 100 달성 검사 (아군 도시 전체 대상)
    let needsDomestic = false;
    for (const cName in cities) {
        const city = cities[cName];
        if (city.owner === '조조') {
            if (city.agriculture < 100 || city.commerce < 100 || city.floodControl < 100) {
                needsDomestic = true;
                break;
            }
        }
    }
    if (needsDomestic) {
        runAutoDomestic(); // 남은 명령서를 모두 소모해서 내정을 돌림
        return;
    }

    // 3순위: 훈련도 100 미만인 곳이 있다면 자동 훈련 (명령서 1개씩 차감)
    let trainedSomething = false;
    for (const cName in cities) {
        const city = cities[cName];
        if (city.owner === '조조' && city.training < 100) {
            // 군량이 500 이상인지 확인
            if (city.grain >= 500) {
                playerState.actionPoints -= 1;
                city.grain -= 500;
                const increaseVal = Math.floor(Math.random() * 11) + 10;
                city.training = Math.min(100, city.training + increaseVal);
                updateStatusBar();
                
                selectCity(cName);
                const infoPanel = document.getElementById('city-info-panel');
                if(infoPanel) {
                    infoPanel.innerHTML += `<div class="result-msg" style="background-color:#2980b9;">🤖 자동 훈련: ${cName} 성의 부대 훈련도가 상승했습니다!</div>`;
                }
                trainedSomething = true;
                return; // 루프 1회 종료
            }
        }
    }

    // 4순위: 예비 병력 전체 장수 대상 균등 배분 (출병 준비)
    // 훈련을 모두 마쳤다면(trainedSomething == false) 공격 대기 상태입니다.
    let totalSoldiers = 0;
    let reserveSoldiers = 0; // 예비 병력의 총합

    for (const cName in cities) {
        if (cities[cName].owner === '조조') {
            totalSoldiers += cities[cName].soldiers;
            reserveSoldiers += cities[cName].soldiers; // 새로 얻은 예비 병력들
            cities[cName].soldiers = 0; 
        }
    }
    officers.forEach(o => { totalSoldiers += (o.soldiers || 0); o.soldiers = 0; });
    
    const officerCount = officers.length;
    let distributedNow = false;

    if (officerCount > 0 && totalSoldiers > 0) {
        const perOfficer = Math.floor(totalSoldiers / officerCount);
        const remainder = totalSoldiers % officerCount;
        officers.forEach(o => o.soldiers = perOfficer);
        
        // 자투리는 첫번째 아군 성에 보관
        const playerCities = Object.keys(cities).filter(c => cities[c].owner === '조조');
        if (playerCities.length > 0) {
            cities[playerCities[0]].soldiers = remainder;
        }
        
        // 예비 병력이 충분히 모여있었다면 새로 배분한 것으로 간주하고 화면에 알림
        if (reserveSoldiers >= officerCount) {
            distributedNow = true;
            updateStatusBar();
            showMainMessage(`<div class="result-msg" style="background-color:#27ae60;">🤖 자동 출전 준비: 아군 총 병력 ${totalSoldiers.toLocaleString()}명을 모든 장수에게 1/N 균등 분배 완료!</div>`);
        }
    }

    // 방금 병력 배분을 수행했다면 사용자가 확인할 수 있도록 여기서 루프 1회 정지 (다음 주기에 출병)
    if (distributedNow) {
        return;
    }

    // 5순위: 인접한 적 거점 타겟팅 및 자동 출병 (전원 출격)
    let targetEnemy = null;
    let startCity = null;

    // 길(roadRoutes)을 탐색하여 아군 성과 연결된 적 성을 찾음
    for (const route of roadRoutes) {
        const fromCity = cities[route.from];
        const toCity = cities[route.to];
        if (fromCity && toCity) {
            if (fromCity.owner === '조조' && toCity.owner !== '조조') {
                startCity = route.from;
                targetEnemy = route.to;
                break;
            } else if (toCity.owner === '조조' && fromCity.owner !== '조조') {
                startCity = route.to;
                targetEnemy = route.from;
                break;
            }
        }
    }

    if (targetEnemy && startCity) {
        // 출병 군량 검증 (1,000 이상 필요)
        if (cities[startCity].grain < 1000) {
            // 군량이 부족하면 명령서를 전부 소모시켜 강제 턴 종료 유도 (다음 턴에서 세금/군량 획득)
            playerState.actionPoints = 0; 
            return;
        }

        // 출전할 모든 아군 무장 구성 및 총 병력 산출
        let totalWarSoldiers = 0;
        let selectedIdxs = [];
        officers.forEach((off, idx) => {
            selectedIdxs.push(idx);
            totalWarSoldiers += (off.soldiers || 0);
        });

        if (totalWarSoldiers > 0) {
            // 자원 소모 및 출병
            playerState.actionPoints -= 1;
            cities[startCity].grain -= 1000;
            updateStatusBar();

            // 전투 화면으로 진입하면서 매크로 타이머의 행동 방지 플래그(isBattleRunning) 켬
            isBattleRunning = true;
            selectCity(targetEnemy);
            executeBattleSimulation(targetEnemy, selectedIdxs, totalWarSoldiers, startCity);
        } else {
            // 장수들의 병력이 아예 0명이라 출병 못함 (돈/군량 모자라 징병도 안됨) -> 강제 턴 넘기기
            playerState.actionPoints = 0;
        }
    } else {
        // 연결된 적 성이 없으면 천하통일!
        stopAutoPlay();
        showMainMessage(`<div class="result-msg" style="font-size:1.5em; color:#f1c40f;">👑 천하통일 달성! 더 이상 인접한 적군이 없습니다! 👑</div>`);
    }
}
