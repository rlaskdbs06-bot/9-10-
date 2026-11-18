import {
  ChecklistItem,
  ItineraryDay,
  PhraseItem,
  TransitGuide,
  TravelTipCard,
} from '../types/travel';

export const IMAGES = {
  parisHero: '/src/assets/images/hero_paris_seine_1794969056142.jpg',
  interlakenHero: '/src/assets/images/hero_interlaken_alps_1794969058022.jpg',
  tgvStation: '/src/assets/images/transit_tgv_lyria_1794969059832.jpg',
  swissPanorama: '/src/assets/images/card_swiss_panorama_1794969059174.jpg',
};

export const ITINERARY_DAYS: ItineraryDay[] = [
  {
    id: 'day-1',
    dayNumber: 1,
    shortLabel: { ko: '1일차 · 파리 도착', en: 'Day 1 · Paris Arrival' },
    contextTitle: { ko: '파리 1일차', en: 'Paris Day 1' },
    country: 'france',
    city: { ko: '파리 · 센강 & 에펠탑', en: 'Paris · Seine & Eiffel' },
    heroImage: IMAGES.parisHero,
    heroCaption: {
      ko: '샤를 드골 공항 도착 후 시내 숙소 체크인, 저녁 센강 유람선 산책',
      en: 'CDG arrival, city check-in, and an unhurried evening walk by the Seine',
    },
    weatherSummary: '14°C · Clear',
    steps: [
      {
        id: 'd1-s1',
        time: '09:30',
        transitCode: 'RER B',
        country: 'france',
        title: {
          ko: 'CDG 공항 → 파리 시내 (샤틀레 레알)',
          en: 'CDG Airport → Central Paris (Châtelet)',
        },
        subtitle: {
          ko: 'Terminal 2 RER 역에서 파란색 B선 탑승 · 약 35분 소요',
          en: 'Board Blue Line RER B from Terminal 2 · ~35 min ride',
        },
        routeSummary: {
          ko: '공항 2터미널 지하 → Châtelet–Les Halles 하차',
          en: 'Airport T2 Underground → Exit Châtelet–Les Halles',
        },
        tipAlert: {
          ko: '개찰구 통과 후에도 종이/모바일 티켓은 하차 시까지 보관하세요.',
          en: 'Keep your ticket until you exit the final fare gates.',
        },
        detail: {
          boardingTitle: {
            ko: 'RER B 공항철도 탑승 순서',
            en: 'How to board RER B from CDG',
          },
          platformHint: {
            ko: '입국장 수하물 수취 후 "Paris by Train / RER B" 파란 표지판을 따라가세요. 급행(직통)과 완행 모두 Châtelet에 정차합니다.',
            en: 'Follow blue "Paris by Train / RER B" signs after baggage claim. Both express and local trains stop at Châtelet.',
          },
          ticketRule: {
            ko: '공항 전용 편도권(€11.80)을 발권기 또는 Bonjour RATP 앱에서 구매하세요. 일반 시내 메트로 1회권으로는 공항 구간 탑승이 불가합니다.',
            en: 'Buy the €11.80 airport fare via kiosk or Bonjour RATP app. Standard inner-city metro tickets are not valid to/from CDG.',
          },
          luggageTip: {
            ko: '문 앞 좌석이나 중앙 통로 공간에 캐리어를 두고 손잡이를 꼭 잡으세요. 출입문 닫힘 직전 소매치기 주의.',
            en: 'Keep luggage beside you away from doors and hold the handle firmly near station stops.',
          },
          walkingMinutes: 8,
          estimatedCost: '€11.80',
          actionChecklist: [
            { ko: 'Bonjour RATP 앱 또는 무인기에서 공항 티켓 구매', en: 'Buy CDG Airport RER ticket' },
            { ko: '전광판 행선지 "Saint-Rémy" 또는 "Robinson" 확인', en: 'Confirm southbound train direction' },
            { ko: '하차 개찰구 통과 전까지 티켓 분실 주의', en: 'Hold ticket through exit gates' },
          ],
        },
      },
      {
        id: 'd1-s2',
        time: '13:30',
        transitCode: 'Metro 1',
        country: 'france',
        title: {
          ko: '마레 지구 점심 & 보주 광장 산책',
          en: 'Le Marais Lunch & Place des Vosges',
        },
        subtitle: {
          ko: '노란색 1호선 Saint-Paul 역 하차 · 도보 4분',
          en: 'Yellow Line 1 to Saint-Paul · 4 min walk',
        },
        routeSummary: {
          ko: 'Saint-Paul 출구 → Rue Saint-Antoine → 보주 광장',
          en: 'Saint-Paul Exit → Rue Saint-Antoine → Place des Vosges',
        },
        detail: {
          boardingTitle: {
            ko: '파리 메트로 1호선 이용 팁',
            en: 'Paris Metro Line 1 Tips',
          },
          platformHint: {
            ko: '1호선은 무인 자동 열차이며 승강장에 스크린도어가 있어 처음 방문자도 가장 안전하고 쾌적합니다.',
            en: 'Line 1 is fully automated with platform screen doors—cleanest and easiest for first-timers.',
          },
          ticketRule: {
            ko: 'Navigo Easy 카드(발급 €2) 또는 애플 월렛에 t+ 티켓을 충전해 개찰구 단말기에 태그하세요.',
            en: 'Tap Navigo Easy card (€2) or mobile wallet t+ ticket at the turnstile reader.',
          },
          luggageTip: {
            ko: '숙소에 짐을 먼저 맡긴 뒤 가벼운 크로스백만 메고 이동하는 것을 권장합니다.',
            en: 'Drop suitcases at your hotel first and carry only a zippered crossbody bag.',
          },
          walkingMinutes: 4,
          estimatedCost: '€2.15',
          actionChecklist: [
            { ko: '방향 표지판 "Château de Vincennes" 방면 확인', en: 'Check direction "Château de Vincennes"' },
            { ko: 'Saint-Paul 역 하차 후 에스컬레이터 출구 이용', en: 'Exit at Saint-Paul station' },
          ],
        },
      },
      {
        id: 'd1-s3',
        time: '18:30',
        transitCode: 'RER C',
        country: 'france',
        title: {
          ko: '바토 무슈 유람선 & 에펠탑 정시 점등',
          en: 'Bateaux Mouches Cruise & Eiffel Sparkle',
        },
        subtitle: {
          ko: 'Pont de l’Alma 선착장 탑승 · 일몰 30분 전 도착 권장',
          en: 'Board at Pont de l’Alma · Arrive 30 min before sunset',
        },
        routeSummary: {
          ko: 'Alma–Marceau 역 → 알마 다리 선착장 → 트로카데로',
          en: 'Alma–Marceau → Alma Pier → Trocadéro Viewpoint',
        },
        tipAlert: {
          ko: '유람선 상층 갑판은 강바람이 차가우니 얇은 바람막이를 챙기세요.',
          en: 'Upper deck gets breezy after dusk—bring a light windbreaker.',
        },
        detail: {
          boardingTitle: {
            ko: '센강 유람선 탑승 & 에펠탑 뷰 포인트',
            en: 'Seine Cruise & Eiffel Tower Timing',
          },
          platformHint: {
            ko: '유람선 티켓 QR코드는 모바일 화면 밝기를 최대로 올려 스캔하면 대기 줄을 빠르게 통과할 수 있습니다.',
            en: 'Turn screen brightness to max for fast QR boarding at the pier.',
          },
          ticketRule: {
            ko: '온라인 사전 예매 바우처는 매표소 교환 없이 바로 탑승 게이트로 이동 가능합니다.',
            en: 'Pre-booked digital tickets go straight to the boarding gate without ticket booth exchange.',
          },
          luggageTip: {
            ko: '유람선 선착장 보안 검색대에서 대형 배낭 검사를 진행하니 가방 지퍼를 정리해두세요.',
            en: 'Quick bag check at the pier entrance; keep zippers accessible.',
          },
          walkingMinutes: 6,
          estimatedCost: '€16.00',
          actionChecklist: [
            { ko: '일몰 시각 확인 후 30분 전 선착장 도착', en: 'Arrive 30 min before sunset' },
            { ko: '하선 후 트로카데로 광장에서 정각 화이트 스파클 감상', en: 'Watch hourly Eiffel sparkle from Trocadéro' },
          ],
        },
      },
    ],
  },
  {
    id: 'day-2',
    dayNumber: 2,
    shortLabel: { ko: '2일차 · 루브르·몽마르트', en: 'Day 2 · Louvre & Montmartre' },
    contextTitle: { ko: '파리 2일차', en: 'Paris Day 2' },
    country: 'france',
    city: { ko: '파리 · 미술관 & 언덕', en: 'Paris · Museums & Views' },
    heroImage: IMAGES.parisHero,
    heroCaption: {
      ko: '오전 루브르 박물관 사전 예약 입장, 오후 오르세 & 몽마르트 일몰',
      en: 'Timed Louvre entry in the morning, Orsay & Montmartre hilltop sunset',
    },
    weatherSummary: '16°C · Sunny',
    steps: [
      {
        id: 'd2-s1',
        time: '09:00',
        transitCode: 'Metro 1',
        country: 'france',
        title: {
          ko: '루브르 박물관 · 카루젤 지하 입구',
          en: 'Louvre Museum · Carrousel Entrance',
        },
        subtitle: {
          ko: 'Palais Royal–Musée du Louvre 역 지하 연결통로 이용',
          en: 'Direct underground access from Palais Royal station',
        },
        routeSummary: {
          ko: 'Metro 1·7호선 하차 → Carrousel du Louvre → 역삼각형 피라미드',
          en: 'Metro 1/7 → Carrousel Underground → Inverted Pyramid',
        },
        tipAlert: {
          ko: '야외 유리 피라미드 줄보다 지하 카루젤 입구 대기 줄이 훨씬 짧습니다.',
          en: 'The underground Carrousel entrance usually moves much faster than the outdoor Pyramid line.',
        },
        detail: {
          boardingTitle: {
            ko: '루브르 빠른 입장 동선',
            en: 'Fast Louvre Entry Route',
          },
          platformHint: {
            ko: '메트로 역 안에서 "Carrousel du Louvre" 표지판을 따라가면 비를 맞지 않고 쇼핑몰을 거쳐 바로 보안검색대로 연결됩니다.',
            en: 'Follow "Carrousel du Louvre" signs inside the Metro to reach security indoors.',
          },
          ticketRule: {
            ko: '시간 지정 예약 티켓(€22) 입장 시간 15분 전부터 전용 라인으로 들어갈 수 있습니다.',
            en: 'Join your timed-entry lane up to 15 minutes before your €22 slot.',
          },
          luggageTip: {
            ko: '대형 캐리어(55x35x20cm 초과)는 반입 불가이며 지하 무료 물품보관함을 이용하세요.',
            en: 'Suitcases larger than 55×35×20cm are not permitted; use small lockers for daypacks.',
          },
          walkingMinutes: 5,
          estimatedCost: '€22.00',
          actionChecklist: [
            { ko: '예약 QR코드 & 여권 사본 준비', en: 'Have timed QR ticket & ID ready' },
            { ko: '드농관(Denon) 에스컬레이터로 모나리자 먼저 관람', en: 'Head to Denon Wing first for Mona Lisa' },
          ],
        },
      },
      {
        id: 'd2-s2',
        time: '15:30',
        transitCode: 'Metro 12',
        country: 'france',
        title: {
          ko: '몽마르트 사크레쾨르 대성당',
          en: 'Montmartre & Sacré-Cœur Basilica',
        },
        subtitle: {
          ko: 'Abbesses 역 하차 후 푸니쿨라(케이블카) 탑승 권장',
          en: 'Exit Abbesses & take the Funicular up the hill',
        },
        routeSummary: {
          ko: 'Metro 12 Abbesses → 푸니쿨라(t+ 티켓 1장) → 성당 앞 전망대',
          en: 'Metro 12 Abbesses → Funicular (1 t+ ticket) → Basilica Steps',
        },
        detail: {
          boardingTitle: {
            ko: '언덕 계단 없이 편하게 올라가기',
            en: 'Skip the Steep Stairs with the Funicular',
          },
          platformHint: {
            ko: 'Abbesses 역은 깊은 지하역이므로 계단 대신 엘리베이터를 꼭 이용하세요. 지상으로 나와 오른편에 푸니쿨라 승강장이 있습니다.',
            en: 'Abbesses is deep underground—take the elevator up, then walk right to the Funicular.',
          },
          ticketRule: {
            ko: '일반 파리 메트로 티켓(t+)이나 Navigo 패스로 푸니쿨라를 그대로 탈 수 있습니다.',
            en: 'Your standard Paris Metro t+ ticket or Navigo pass works on the Funicular.',
          },
          luggageTip: {
            ko: '성당 앞 계단에서는 팔찌 강매나 서명 요청에 눈을 마주치지 말고 지나가세요.',
            en: 'Politely ignore bracelet or petition approaches near the bottom steps.',
          },
          walkingMinutes: 7,
          estimatedCost: '€2.15',
          actionChecklist: [
            { ko: 'Abbesses 역 엘리베이터 이용', en: 'Take the station elevator at Abbesses' },
            { ko: '푸니쿨라 탑승 후 테르트르 광장 산책', en: 'Ride Funicular & stroll Place du Tertre' },
          ],
        },
      },
    ],
  },
  {
    id: 'day-3',
    dayNumber: 3,
    shortLabel: { ko: '3일차 · 인터라켄 이동', en: 'Day 3 · To Interlaken' },
    contextTitle: { ko: '인터라켄 이동', en: 'To Interlaken' },
    country: 'switzerland',
    city: { ko: '파리 → 바젤 → 인터라켄', en: 'Paris → Basel → Interlaken' },
    heroImage: IMAGES.interlakenHero,
    heroCaption: {
      ko: 'TGV Lyria 고속열차로 국경을 넘어 에메랄드빛 알프스 호수 마을 인터라켄으로',
      en: 'Cross the border on TGV Lyria into the turquoise lakes of Interlaken',
    },
    weatherSummary: '11°C · Alpine Crisp',
    steps: [
      {
        id: 'd3-s1',
        time: '07:55',
        transitCode: 'TGV Lyria',
        country: 'france',
        title: {
          ko: '파리 리옹역 → 스위스 바젤 SBB역',
          en: 'Paris Gare de Lyon → Basel SBB',
        },
        subtitle: {
          ko: 'Hall 1 또는 Hall 2 플랫폼 출발 20분 전 전광판 확인 · 3시간 4분',
          en: 'Check departure board 20 min prior · 3h 04m',
        },
        routeSummary: {
          ko: 'Paris Gare de Lyon → Basel SBB (프랑스-스위스 직통)',
          en: 'Paris Gare de Lyon → Basel SBB (Cross-border)',
        },
        tipAlert: {
          ko: '플랫폼 번호는 출발 약 20분 전에 공개됩니다. Hall 1/2 안내판을 주시하세요.',
          en: 'Track numbers appear ~20 minutes before departure—watch the Hall 1/2 boards.',
        },
        detail: {
          boardingTitle: {
            ko: 'TGV Lyria 좌석 & 짐 보관 가이드',
            en: 'TGV Lyria Boarding & Luggage Guide',
          },
          platformHint: {
            ko: '리옹역(Gare de Lyon)은 규모가 큽니다. 출발 35분 전 도착해 Hall 1과 Hall 2 중 전광판에 뜬 알파벳 플랫폼으로 이동하세요.',
            en: 'Arrive 35 minutes early at Gare de Lyon; check Hall 1 vs Hall 2 track letters.',
          },
          ticketRule: {
            ko: 'TGV Lyria는 전 좌석 지정제입니다. 티켓의 "Voiture(호차)"와 "Place(좌석)" 번호를 확인하고, 플랫폼 바닥의 A~Z 구역 표시에 서서 대기하세요.',
            en: 'Mandatory seat reservation: match your Voiture (car) & Place (seat) with platform zone letters.',
          },
          luggageTip: {
            ko: '각 객차 입구와 중앙에 대형 캐리어 선반이 있습니다. 도난 방지를 위해 네임택을 달고 시야에 보이는 곳에 두세요.',
            en: 'Attach a luggage tag and place suitcases in the rack nearest your seat.',
          },
          walkingMinutes: 10,
          estimatedCost: '€59.00',
          actionChecklist: [
            { ko: '여권 소지 확인 (국경 통과 시 랜덤 검문 대비)', en: 'Carry physical passport for border check' },
            { ko: '출발 20분 전 전광판 플랫폼 확인 & 개찰구 QR 스캔', en: 'Scan QR at platform gate 20 min prior' },
            { ko: 'Voiture(호차) 번호 맞춰 탑승', en: 'Board at matching Voiture car marker' },
          ],
        },
      },
      {
        id: 'd3-s2',
        time: '11:28',
        transitCode: 'SBB IC',
        country: 'switzerland',
        title: {
          ko: '바젤 SBB → 인터라켄 오스트 (Interlaken Ost)',
          en: 'Basel SBB → Interlaken Ost',
        },
        subtitle: {
          ko: '스위스 연방철도 직통 IC 열차 · 2시간 1분 소요 (SBB 앱으로 실시간 확인)',
          en: 'Direct Swiss IC train · 2h 01m via SBB Mobile',
        },
        routeSummary: {
          ko: 'Basel SBB Gleis 8 → Bern 경유 → Interlaken Ost 종착',
          en: 'Basel SBB Track 8 → via Bern → Interlaken Ost',
        },
        tipAlert: {
          ko: '툰(Thun)을 지나면 진행 방향 왼쪽 창가에 앉으세요! 툰 호수가 펼쳐집니다.',
          en: 'Sit on the left side after Thun for sweeping Lake Thun views.',
        },
        detail: {
          boardingTitle: {
            ko: '바젤 환승 & 스위스 트래블 패스 개시',
            en: 'Basel Transfer & Swiss Travel Pass',
          },
          platformHint: {
            ko: '바젤 SBB역에서 환승 시간은 보통 15~25분으로 충분합니다. 파란색 전광판에서 "Interlaken Ost" 방향 Gleis(트랙)를 확인하고 지하 통로로 이동하세요.',
            en: 'Transfers at Basel SBB take 15–25 min. Follow the blue "Interlaken Ost" track signs via the underpass.',
          },
          ticketRule: {
            ko: '스위스 트래블 패스(STP) 소지자는 별도 좌석 예약 없이 2등석(2) 표시 객차의 빈자리에 자유롭게 앉으면 됩니다.',
            en: 'With a Swiss Travel Pass, board any 2nd Class (2) car—no seat reservation required.',
          },
          luggageTip: {
            ko: '스위스 IC 열차는 2층 구조가 많습니다. 큰 캐리어는 1층 출입구 옆 수하물 칸에 두고 2층에 앉으시면 편합니다.',
            en: 'Double-decker IC trains have spacious luggage racks on the lower deck near entry doors.',
          },
          walkingMinutes: 6,
          estimatedCost: 'STP Included',
          actionChecklist: [
            { ko: 'SBB Mobile 앱에서 실시간 플랫폼(Gleis) 확인', en: 'Verify live track (Gleis) in SBB Mobile' },
            { ko: '2등석(숫자 2 표시) 객차 탑승', en: 'Board a 2nd Class ("2") carriage' },
            { ko: '검표원 요청 시 STP QR코드와 여권 함께 제시', en: 'Show STP QR + passport to conductor' },
          ],
        },
      },
      {
        id: 'd3-s3',
        time: '15:30',
        transitCode: 'Boat / Bus',
        country: 'switzerland',
        title: {
          ko: '브리엔츠 호수 유람선 또는 이젤발트 마을 산책',
          en: 'Lake Brienz Cruise & Iseltwald Stroll',
        },
        subtitle: {
          ko: 'Interlaken Ost 선착장 바로 연결 · STP 무료 탑승',
          en: 'Pier right beside Interlaken Ost · Free with STP',
        },
        routeSummary: {
          ko: 'Interlaken Ost (See) → Iseltwald → Giessbach 폭포',
          en: 'Interlaken Ost Pier → Iseltwald → Giessbach Falls',
        },
        detail: {
          boardingTitle: {
            ko: '스위스 호수 유람선 이용 가이드',
            en: 'Swiss Lake Cruise Guide',
          },
          platformHint: {
            ko: '인터라켄 오스트 기차역 뒤편으로 2분만 걸어가면 브리엔츠 호수 선착장(Interlaken Ost See)이 바로 나옵니다.',
            en: 'Walk 2 minutes behind Interlaken Ost station to reach the Lake Brienz boat pier.',
          },
          ticketRule: {
            ko: '스위스 트래블 패스가 있다면 유람선도 추가 발권 없이 승선 시 QR만 스캔하면 무료입니다.',
            en: 'Swiss Travel Pass covers Lake Brienz cruises—just scan your pass QR on boarding.',
          },
          luggageTip: {
            ko: '역 코인락커(CHF 7~9)에 큰 가방을 맡기고 가볍게 탑승하세요.',
            en: 'Use Interlaken Ost station lockers (CHF 7–9) if checking in later.',
          },
          walkingMinutes: 3,
          estimatedCost: 'STP Included',
          actionChecklist: [
            { ko: '유람선 2층 야외 좌석(2등석 가능 여부 표지 확인)', en: 'Check 2nd-class deck signs on upper level' },
            { ko: '돌아오는 막배 시간 선착장 시간표 촬영', en: 'Snap a photo of the return boat schedule' },
          ],
        },
      },
    ],
  },
  {
    id: 'day-4',
    dayNumber: 4,
    shortLabel: { ko: '4일차 · 융프라우요흐', en: 'Day 4 · Jungfraujoch' },
    contextTitle: { ko: '융프라우요흐 4일차', en: 'Jungfraujoch Day 4' },
    country: 'switzerland',
    city: { ko: '그린델발트 · 융프라우', en: 'Grindelwald · Top of Europe' },
    heroImage: IMAGES.swissPanorama,
    heroCaption: {
      ko: '아이거 익스프레스 곤돌라로 45분 만에 해발 3,454m 만년설 정상 등정',
      en: 'Ascend to 3,454m Top of Europe in 45 minutes via Eiger Express',
    },
    weatherSummary: '-2°C Summit · Sunny',
    steps: [
      {
        id: 'd4-s1',
        time: '08:05',
        transitCode: 'BOB + Gondola',
        country: 'switzerland',
        title: {
          ko: '인터라켄 오스트 → 아이거 익스프레스 → 융프라우요흐',
          en: 'Interlaken Ost → Eiger Express → Jungfraujoch',
        },
        subtitle: {
          ko: 'Grindelwald Terminal 환승 · 맑은 오전 첫 타임 추천',
          en: 'Transfer at Grindelwald Terminal · Early morning recommended',
        },
        routeSummary: {
          ko: 'Interlaken Ost → Grindelwald Terminal → Eigergletscher → Jungfraujoch',
          en: 'Interlaken Ost → Terminal → Eigergletscher → Summit',
        },
        tipAlert: {
          ko: '오전 8시 이전 산악 날씨가 가장 맑습니다. 출발 전 라이브 웹캠을 확인하세요.',
          en: 'Alpine peaks are clearest before 10 AM—check the summit webcam before departing.',
        },
        detail: {
          boardingTitle: {
            ko: '융프라우 산악 열차 & 곤돌라 환승 순서',
            en: 'Mountain Rail & Gondola Transfer',
          },
          platformHint: {
            ko: 'Interlaken Ost 2A/2B 플랫폼에서 열차를 탈 때 반드시 앞쪽 칸("Grindelwald" 행)에 타야 합니다! 열차가 중간(Zweilütschinen)에서 분리됩니다.',
            en: 'Board the front carriages marked "Grindelwald" at Interlaken Ost—the train splits mid-route!',
          },
          ticketRule: {
            ko: '융프라우 구간은 STP 25% 할인(또는 동신항운 VIP패스 사용) 대상입니다. 성수기엔 좌석 지정권을 미리 구매하면 대기 없이 탑승합니다.',
            en: 'STP gives 25% off above Grindelwald; reserve a seat time-slot in peak season.',
          },
          luggageTip: {
            ko: '정상은 영하권이며 눈부심이 강합니다. 선글라스, 방풍 패딩, 따뜻한 물, 컵라면용 보온병(유료 온수)을 챙기세요.',
            en: 'Sub-zero glare at 3,454m: pack UV sunglasses, windproof layers, and water for altitude.',
          },
          walkingMinutes: 5,
          estimatedCost: 'CHF 158 (w/ STP)',
          actionChecklist: [
            { ko: '열차 전면 행선지 "Grindelwald" 객차 확인', en: 'Verify carriage destination says Grindelwald' },
            { ko: '그린델발트 터미널에서 아이거 익스프레스 곤돌라 환승', en: 'Board Eiger Express cable car at Terminal' },
            { ko: '아이거글레처 역에서 붉은 톱니바퀴 산악열차로 갈아타기', en: 'Switch to red cogwheel train at Eigergletscher' },
          ],
        },
      },
      {
        id: 'd4-s2',
        time: '14:30',
        transitCode: 'WAB Train',
        country: 'switzerland',
        title: {
          ko: '라우터브루넨 폭포 마을 하산 코스',
          en: 'Descent via Lauterbrunnen Valley',
        },
        subtitle: {
          ko: '올라갈 땐 그린델발트, 내려올 땐 클라이네 샤이덱 → 라우터브루넨 추천',
          en: 'Loop down via Kleine Scheidegg & Lauterbrunnen waterfalls',
        },
        routeSummary: {
          ko: 'Jungfraujoch → Kleine Scheidegg → Lauterbrunnen → Interlaken',
          en: 'Summit → Kleine Scheidegg → Lauterbrunnen → Interlaken',
        },
        detail: {
          boardingTitle: {
            ko: '원형 루프 하산으로 두 계곡 모두 보기',
            en: 'See Both Alpine Valleys on Descent',
          },
          platformHint: {
            ko: 'Kleine Scheidegg 역에서 갈아탈 때 Lauterbrunnen 방면 승강장을 확인하세요. 슈타우바흐 폭포가 역에서 도보 8분 거리에 있습니다.',
            en: 'At Kleine Scheidegg, take the train marked Lauterbrunnen—Staubbach Falls is an 8-min walk.',
          },
          ticketRule: {
            ko: '왕복 티켓으로 올라간 방향과 다른 계곡으로 내려오는 것이 일반적으로 허용됩니다(구간권 조건 확인).',
            en: 'Round-trip Jungfrau tickets typically allow ascending via Grindelwald and descending via Lauterbrunnen.',
          },
          luggageTip: {
            ko: '고산 지대에서는 천천히 걷고 수분을 자주 섭취해 두통을 예방하세요.',
            en: 'Walk slowly at high altitude and hydrate regularly.',
          },
          walkingMinutes: 12,
          estimatedCost: 'Included in Loop',
          actionChecklist: [
            { ko: 'Kleine Scheidegg에서 Wengen/Lauterbrunnen 방면 환승', en: 'Transfer toward Wengen/Lauterbrunnen' },
            { ko: '라우터브루넨 마을 메인 거리에서 슈타우바흐 폭포 감상', en: 'Stroll to Staubbach Falls viewpoint' },
          ],
        },
      },
    ],
  },
  {
    id: 'day-5',
    dayNumber: 5,
    shortLabel: { ko: '5일차 · 루체른·취리히', en: 'Day 5 · Lucerne & Zurich' },
    contextTitle: { ko: '루체른 & 귀국 5일차', en: 'Lucerne Day 5' },
    country: 'switzerland',
    city: { ko: '루체른 · 취리히 공항', en: 'Lucerne · Zurich Airport' },
    heroImage: IMAGES.interlakenHero,
    heroCaption: {
      ko: '골든패스 파노라마 열차를 타고 루체른 카펠교 산책 후 취리히 공항 이동',
      en: 'Ride the Luzern–Interlaken Express to Chapel Bridge & Zurich Airport',
    },
    weatherSummary: '13°C · Partly Sunny',
    steps: [
      {
        id: 'd5-s1',
        time: '09:04',
        transitCode: 'Luzern Express',
        country: 'switzerland',
        title: {
          ko: '인터라켄 오스트 → 루체른 파노라마 열차',
          en: 'Interlaken Ost → Luzern Panorama Express',
        },
        subtitle: {
          ko: '통유리 창으로 브리엔츠·룽게른 호수를 감상하는 1시간 50분',
          en: '1h 50m scenic ride past Lake Lungern & Brünig Pass',
        },
        routeSummary: {
          ko: 'Interlaken Ost → Meiringen → Giswil → Luzern',
          en: 'Interlaken Ost → Meiringen → Giswil → Luzern',
        },
        tipAlert: {
          ko: '인터라켄 출발 기준 진행 방향 오른쪽 창가가 룽게른 호수 뷰 명당입니다.',
          en: 'Sit on the right side from Interlaken for the best Lake Lungern views.',
        },
        detail: {
          boardingTitle: {
            ko: '루체른 익스프레스 & 수하물 보관',
            en: 'Luzern Express & Station Lockers',
          },
          platformHint: {
            ko: '루체른 역에 도착하면 지하 1층 대형 사물함(Lockers)에 캐리어를 맡기고 바로 카펠교(도보 3분)를 둘러보실 수 있습니다.',
            en: 'Luzern station has large underground lockers; Chapel Bridge is just a 3-min walk outside.',
          },
          ticketRule: {
            ko: '스위스 트래블 패스 소지 시 별도 추가금 없이 일반 파노라마 창가 좌석 이용이 가능합니다.',
            en: 'Covered 100% by Swiss Travel Pass without extra panoramic supplement.',
          },
          luggageTip: {
            ko: '루체른 역 코인락커는 CHF 동전 또는 비접촉 신용카드(Tap) 결제가 가능합니다.',
            en: 'Station lockers accept contactless credit cards or CHF coins.',
          },
          walkingMinutes: 4,
          estimatedCost: 'STP Included',
          actionChecklist: [
            { ko: '오른쪽 창가 자리 선점 (출발 15분 전 탑승)', en: 'Board 15 min early for right-side window seats' },
            { ko: '루체른 역 지하 코인락커 이용 & 카펠교 산책', en: 'Store luggage at Luzern & walk Chapel Bridge' },
          ],
        },
      },
      {
        id: 'd5-s2',
        time: '15:10',
        transitCode: 'SBB IR',
        country: 'switzerland',
        title: {
          ko: '루체른역 → 취리히 공항 (Zürich Flughafen)',
          en: 'Luzern → Zurich Airport (Flughafen)',
        },
        subtitle: {
          ko: '직통 열차 매시간 운행 · 약 1시간 5분 소요 (택스리펀 여유 시간 확보)',
          en: 'Direct hourly trains · ~1h 05m (leave time for Tax Refund)',
        },
        routeSummary: {
          ko: 'Luzern → Zürich HB (또는 직통) → Zürich Flughafen',
          en: 'Luzern → Direct / via Zürich HB → Zürich Airport',
        },
        detail: {
          boardingTitle: {
            ko: '취리히 공항 출국 & 면세 환급(Tax Refund) 체크',
            en: 'Zurich Airport Departure & Tax Refund',
          },
          platformHint: {
            ko: '취리히 공항역(Zürich Flughafen)은 체크인 카운터 바로 아래층에 연결되어 있어 비가 와도 이동이 매우 편리합니다.',
            en: 'The airport rail station connects directly beneath check-in terminals.',
          },
          ticketRule: {
            ko: '스위스 출국 시 EU(프랑스)에서 산 물품의 택스리펀 세관 도장은 취리히 공항이 아닌 파리→스위스 국경(바젤역 프랑스 세관)에서 미리 받아야 합니다!',
            en: 'Important: Validate French/EU tax-free forms at the border (Basel SBB) before entering Switzerland!',
          },
          luggageTip: {
            ko: '스위스 구매 물품 택스리펀은 취리히 공항 세관(Zoll)에서 여권·영수증·미개봉 물품 확인 후 처리합니다.',
            en: 'Keep Swiss purchases accessible for Zurich Airport customs inspection.',
          },
          walkingMinutes: 5,
          estimatedCost: 'STP Included',
          actionChecklist: [
            { ko: '공항 출발 3시간 전 도착 권장', en: 'Arrive at Zurich Airport 3 hours before flight' },
            { ko: '스위스 구매 물품 택스리펀 세관 스탬프 완료', en: 'Complete Swiss Tax-Free customs stamp' },
          ],
        },
      },
    ],
  },
];

export const TRANSIT_GUIDES: TransitGuide[] = [
  {
    id: 'tg-rerb',
    code: 'RER B',
    country: 'france',
    title: {
      ko: 'CDG 공항 → 파리 시내 공항철도',
      en: 'CDG Airport → Central Paris Rail',
    },
    route: {
      ko: 'Aéroport CDG 2 TGV ↔ Gare du Nord / Châtelet',
      en: 'Aéroport CDG 2 TGV ↔ Gare du Nord / Châtelet',
    },
    duration: '35 min',
    frequency: { ko: '매 10~15분 간격 운행', en: 'Every 10–15 minutes' },
    image: IMAGES.parisHero,
    validationWarning: {
      ko: '개찰구 통과 후 티켓을 절대 버리지 마세요. 파리 시내 환승 및 하차 시 동일 티켓이 필요합니다.',
      en: 'Never discard your ticket after boarding—you must tap/insert it again to exit.',
    },
    boardingSteps: [
      { ko: '1. 수하물 수취 후 파란색 "Paris by Train" 표지판 따라 이동', en: '1. Follow blue "Paris by Train" signs after baggage claim' },
      { ko: '2. 무인 발권기(한국어/영어 지원) 또는 RATP 앱에서 €11.80 공항권 구매', en: '2. Buy €11.80 airport fare at kiosk or Bonjour RATP app' },
      { ko: '3. 플랫폼 전광판에 "Châtelet-Les Halles" 정차 여부 불빛 확인 후 탑승', en: '3. Check platform lights confirming stop at Châtelet-Les Halles' },
    ],
    stationTip: {
      ko: '파리 북역(Gare du Nord)이나 샤틀레역에서 메트로 환승 시 계단이 많을 수 있으니 "Sortie / Ascenseur" 엘리베이터 표지판을 찾으세요.',
      en: 'Look for "Ascenseur" elevator signs when transferring with heavy suitcases.',
    },
  },
  {
    id: 'tg-lyria',
    code: 'TGV Lyria',
    country: 'france',
    title: {
      ko: '파리 → 스위스 국경 초고속 열차',
      en: 'Paris → Switzerland High-Speed Rail',
    },
    route: {
      ko: 'Paris Gare de Lyon ↔ Basel SBB / Geneva / Zurich',
      en: 'Paris Gare de Lyon ↔ Basel SBB / Geneva / Zurich',
    },
    duration: '3h 04m',
    frequency: { ko: '1일 6~8회 직통 운행', en: '6–8 daily departures' },
    image: IMAGES.tgvStation,
    validationWarning: {
      ko: '출발 2분 전 탑승 게이트가 닫힙니다. 최소 25분 전 역에 도착하고 전광판에서 Hall 1/2를 확인하세요.',
      en: 'Boarding gates close 2 minutes prior to departure. Arrive at least 25 minutes early.',
    },
    boardingSteps: [
      { ko: '1. 리옹역 중앙 전광판에서 열차 번호(예: TGV 9203)의 플랫폼 확인', en: '1. Match your train number on the main departure board (~20m prior)' },
      { ko: '2. 게이트 직원 또는 자동 개찰구에 모바일 QR코드 스캔', en: '2. Scan your mobile QR code at the track barrier' },
      { ko: '3. 플랫폼 천장/바닥 알파벳 구역에서 내 호차(Voiture) 위치 확인 후 탑승', en: '3. Stand at the platform letter matching your Voiture (car) number' },
    ],
    stationTip: {
      ko: '프랑스에서 산 물품의 택스리펀(Detax) 도장은 바젤 SBB역 도착 후 플랫폼 인근 프랑스 세관(Douane) 사무실 또는 PABLO 무인기에서 받을 수 있습니다.',
      en: 'French Tax-Free validation (PABLO kiosk) is available at the French border desk inside Basel SBB.',
    },
  },
  {
    id: 'tg-sbb',
    code: 'SBB / STP',
    country: 'switzerland',
    title: {
      ko: '스위스 철도(SBB) & 트래블 패스 활용법',
      en: 'Swiss Federal Railways & Travel Pass',
    },
    route: {
      ko: '스위스 전역 기차 · 시내 트램 · 호수 유람선 무료 연결',
      en: 'Nationwide Rail · City Trams · Lake Boats',
    },
    duration: 'Real-time',
    frequency: { ko: '정시 출발(1분 단위 정확도)', en: 'Punctual to the minute' },
    image: IMAGES.swissPanorama,
    validationWarning: {
      ko: '스위스 트래블 패스(STP)는 개찰구 태그가 없습니다. 열차 탑승 후 검표원이 오면 QR코드와 실물 여권을 함께 보여주세요.',
      en: 'No turnstiles in Switzerland—simply board and show your STP QR + physical passport when checked.',
    },
    boardingSteps: [
      { ko: '1. SBB Mobile 앱에 출발지-도착지 입력해 Gleis(플랫폼) 번호 확인', en: '1. Look up live Gleis (platform) number in the SBB Mobile app' },
      { ko: '2. 열차 출입문 옆 큰 숫자 "2"(2등석) 또는 "1"(1등석) 확인 후 탑승', en: '2. Check the large "2" (2nd Class) or "1" (1st Class) outside the door' },
      { ko: '3. 출입문 버튼(초록색 불빛)을 직접 눌러 문을 열고 닫을 수 있습니다', en: '3. Press the glowing green button on the carriage door to open' },
    ],
    stationTip: {
      ko: '열차 전면/측면 전광판에 목적지가 중간에 분리되는지(예: Interlaken Ost → Grindelwald / Lauterbrunnen) 꼭 확인하고 탑승하세요.',
      en: 'Always verify the destination board on each car—mountain trains often split mid-journey.',
    },
  },
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: 'chk-1',
    category: 'documents',
    title: { ko: '여권 실물 + 여권 사본 (유효기간 6개월 이상)', en: 'Physical Passport + Printed Copy (6+ mo validity)' },
    note: { ko: '스위스 트래블 패스 검표 및 택스리펀 시 실물 여권 필수', en: 'Required for STP ticket checks and Tax-Free validation' },
  },
  {
    id: 'chk-2',
    category: 'documents',
    title: { ko: 'TGV Lyria & 루브르 예약 QR코드 오프라인 저장', en: 'Save TGV Lyria & Louvre QR Tickets Offline' },
    note: { ko: '지하역이나 국경 구간에서 로밍 데이터가 끊길 수 있으니 스크린샷 보관', en: 'Keep screenshots in case mobile signal drops underground' },
  },
  {
    id: 'chk-3',
    category: 'electronics',
    title: { ko: '멀티 어댑터 (프랑스 Type E · 스위스 Type J 주의!)', en: 'Travel Adapter (France Type E · Switzerland Type J)' },
    note: { ko: '한국 굵은 2핀은 스위스 육각형 3구 콘센트에 안 들어갈 수 있어 얇은 11자/멀티어댑터 필수', en: 'Thick Korean Type F plugs often do not fit recessed Swiss Type J sockets—bring a slim Europlug or universal adapter' },
  },
  {
    id: 'chk-4',
    category: 'electronics',
    title: { ko: '보조배터리 10,000mAh 이상 (추운 융프라우 대비)', en: 'Power Bank 10,000mAh+ (for Cold Alpine Weather)' },
    note: { ko: '고산 지대 저온에서 스마트폰 배터리가 빠르게 소모됩니다', en: 'Sub-zero summit temperatures drain phone batteries quickly' },
  },
  {
    id: 'chk-5',
    category: 'alpine',
    title: { ko: 'UV 차단 선글라스 & 경량 바람막이/패딩', en: 'UV Sunglasses & Packable Windproof Jacket' },
    note: { ko: '시내는 14°C여도 융프라우요흐(3,454m)는 영하권에 설원 반사광이 강합니다', en: 'Even when Interlaken is mild, Jungfraujoch is sub-zero with bright snow glare' },
  },
  {
    id: 'chk-6',
    category: 'alpine',
    title: { ko: '자물쇠 달린 크로스백 & 휴대폰 스트랩', en: 'Zippered Crossbody Bag & Phone Tether' },
    note: { ko: '파리 메트로·에펠탑 주변 소매치기 예방에 가장 효과적입니다', en: 'Best defense against pickpockets in Paris Metro and crowded viewpoints' },
  },
  {
    id: 'chk-7',
    category: 'payments',
    title: { ko: '트래블월렛/트래블로그 카드 (EUR + CHF 충전) & 예비 신용카드', en: 'Multi-Currency Travel Card (EUR + CHF) + Backup Card' },
    note: { ko: '스위스는 유로가 아닌 스위스 프랑(CHF) 사용 국가입니다. 대부분 컨택리스 카드 결제 지원', en: 'Switzerland uses CHF, not EUR; contactless cards work almost everywhere' },
  },
  {
    id: 'chk-8',
    category: 'payments',
    title: { ko: '유럽 전역 eSIM 개통 및 SBB Mobile / Bonjour RATP 앱 설치', en: 'Europe eSIM Activated + SBB Mobile & Bonjour RATP Apps' },
    note: { ko: '파리·스위스 국경을 넘을 때 자동 로밍되는 다국가 eSIM 권장', en: 'Choose a pan-European eSIM covering both France and Switzerland' },
  },
];

export const TRAVEL_TIPS: TravelTipCard[] = [
  {
    id: 'tip-plug',
    category: 'electronics',
    title: { ko: '프랑스 vs 스위스 콘센트 차이', en: 'France vs Switzerland Plug Difference' },
    summary: {
      ko: '한국 드라이기·고데기 등 굵은 접지형 플러그(4.8mm)는 스위스 벽면 육각 홈에 들어가지 않습니다. 얇은 4.0mm 유로플러그 변환 젠더를 챙기세요.',
      en: 'Thick 4.8mm grounded plugs often do not fit Swiss recessed Type J sockets. Bring a slim 4.0mm Europlug or Type J adapter.',
    },
    highlightValue: { ko: 'Type E (FR) · Type J (CH)', en: '230V · 50Hz' },
  },
  {
    id: 'tip-currency',
    category: 'payments',
    title: { ko: '스위스는 유로(EUR) 대신 프랑(CHF)', en: 'Switzerland Uses CHF, Not EUR' },
    summary: {
      ko: '일부 관광지 상점에서 유로 현금을 받더라도 환율이 불리하고 거스름돈을 스위스 프랑으로 줍니다. 컨택리스 카드 결제가 가장 유리합니다.',
      en: 'Even where EUR cash is accepted, change is given in CHF at poor rates. Always pay by contactless card in CHF.',
    },
    highlightValue: { ko: '1 CHF ≈ 1,595 KRW', en: 'Pay in Local Currency' },
  },
  {
    id: 'tip-fine',
    category: 'documents',
    title: { ko: '파리 티켓 보관 & 무임승차 벌금 주의', en: 'Paris Ticket Retention & Inspections' },
    summary: {
      ko: '파리 메트로와 RER은 출구 직전 검표원이 상시 단속합니다. 종이 티켓을 버리거나 모바일 태그가 누락되면 현장에서 €50 이상의 벌금이 부과됩니다.',
      en: 'Inspectors check tickets at exits. Missing validation or discarded tickets incur €50+ on-the-spot fines.',
    },
    highlightValue: { ko: '하차 시까지 보관 필수', en: 'Keep Until Street Exit' },
  },
];

export const PHRASES: PhraseItem[] = [
  {
    id: 'ph-1',
    country: 'france',
    situation: { ko: '카페 / 상점 인사', en: 'Greeting at Shops & Cafes' },
    localText: 'Bonjour, excusez-moi.',
    phoneticKo: '봉주르, 엑스퀴제 무아',
    meaning: { ko: '안녕하세요, 실례합니다.', en: 'Hello, excuse me.' },
    speechLang: 'fr-FR',
  },
  {
    id: 'ph-2',
    country: 'france',
    situation: { ko: '식당 계산 요청', en: 'Asking for the Bill' },
    localText: 'L’addition, s’il vous plaît.',
    phoneticKo: '라디시옹, 실 부 플레',
    meaning: { ko: '계산서 부탁드립니다.', en: 'The check, please.' },
    speechLang: 'fr-FR',
  },
  {
    id: 'ph-3',
    country: 'france',
    situation: { ko: '기차역 플랫폼 질문', en: 'Asking Platform Direction' },
    localText: 'C’est le bon train pour Bâle ?',
    phoneticKo: '세 르 봉 트랭 푸르 발?',
    meaning: { ko: '이 기차가 바젤로 가는 기차가 맞나요?', en: 'Is this the right train to Basel?' },
    speechLang: 'fr-FR',
  },
  {
    id: 'ph-4',
    country: 'switzerland',
    situation: { ko: '기차 좌석 / 인사', en: 'Train Seat & Politeness' },
    localText: 'Grüezi, ist dieser Platz frei?',
    phoneticKo: '그뤼에찌, 이스트 디저 플라츠 프라이?',
    meaning: { ko: '안녕하세요, 이 자리 비어 있나요?', en: 'Hello, is this seat free?' },
    speechLang: 'de-CH',
  },
  {
    id: 'ph-5',
    country: 'switzerland',
    situation: { ko: '레스토랑 결제 (카드)', en: 'Paying by Card' },
    localText: 'Ich möchte gern mit Karte zahlen.',
    phoneticKo: '이히 뫼히테 게른 미트 카르테 찰렌',
    meaning: { ko: '카드로 계산하고 싶습니다.', en: 'I would like to pay by card.' },
    speechLang: 'de-DE',
  },
  {
    id: 'ph-6',
    country: 'switzerland',
    situation: { ko: '감사 인사', en: 'Thank You Very Much' },
    localText: 'Merci vielmal!',
    phoneticKo: '메르시 필말!',
    meaning: { ko: '대단히 감사합니다! (스위스식 표현)', en: 'Thank you very much! (Swiss German)' },
    speechLang: 'de-CH',
  },
];
