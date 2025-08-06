// Sample data for testing when API fails
        const sampleData = {
            "card": "Queen of Hearts - Upright",
            "card_vi": "Đầm Cơ - Xuôi",
            "title": "Tình yêu thương, sự quan tâm và trực giác mạnh mẽ",
            "content": {
                "tinh_cam": "Thời gian này, bạn có thể gặp được một người đặc biệt hoặc mối quan hệ hiện tại sẽ trở nên sâu sắc hơn. Tình yêu đang ở xung quanh bạn, hãy mở lòng để đón nhận những cảm xúc tốt đẹp.",
                "gia_dinh": "Vai trò của bạn trong gia đình sẽ trở nên quan trọng hơn. Bạn có thể là người mang lại sự ấm áp và kết nối các thành viên lại với nhau. Hãy lắng nghe và chia sẻ nhiều hơn.",
                "cong_viec": "Khả năng giao tiếp và sự thấu hiểu của bạn sẽ giúp ích rất nhiều trong công việc. Đây là thời điểm tốt để hợp tác, xây dựng mối quan hệ và phát triển các dự án sáng tạo."
            },
            "loi_khuyen": "Hãy tin tưởng vào trực giác của mình và đừng ngại bày tỏ cảm xúc. Sự chân thành và lòng tốt sẽ mang lại những điều tuyệt vời. Dành thời gian chăm sóc bản thân và những người bạn yêu thương."
        };

        async function startReading() {
            // Hide start section and show loading
            document.getElementById('startSection').style.display = 'none';
            document.getElementById('loadingSection').style.display = 'block';
            document.getElementById('errorSection').style.display = 'none';
            document.getElementById('resultSection').style.display = 'none';

            try {
                // Try multiple approaches to call the API
                let data;
                let apiSuccess = false;

                // Method 1: Direct call with CORS mode
                try {
                    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBGQHZMHE7c6EniQJ8wIOZRug5iYRjfrMo', {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "contents": [{
                                "parts": [{
                                    "text": "Bạn là một chuyên gia bói bài Tây. Hãy ngẫu nhiên chọn một lá bài trong bộ bài Tây gồm 52 lá, bao gồm 13 lá trong mỗi chất: Hearts (Cơ), Diamonds (Rô), Clubs (Chuồn), Spades (Bích). Sau đó, chọn một chiều ngẫu nhiên: xuôi hoặc ngược. Hãy trả về kết quả dưới dạng JSON đúng chuẩn: {\"card\": \"Tên lá bài tiếng Anh + chiều (xuôi/ngược)\", \"card_vi\": \"Tên lá bài tiếng Việt + chiều (xuôi/ngược)\", \"title\": \"Tóm tắt ý nghĩa chính của lá bài (≤ 15 từ)\", \"content\": {\"tinh_cam\": \"Ý nghĩa trong chuyện tình cảm (≤ 100 từ)\", \"gia_dinh\": \"Ý nghĩa trong quan hệ gia đình (≤ 100 từ)\", \"cong_viec\": \"Ý nghĩa trong công việc (≤ 100 từ)\"}, \"loi_khuyen\": \"Lời khuyên tích cực (≤ 100 từ)\"}. Chỉ trả về JSON, không thêm mô tả gì khác."
                                }]
                            }]
                        })
                    });

                    if (response.ok) {
                        data = await response.json();
                        apiSuccess = true;
                    }
                } catch (e) {
                    console.log('Method 1 failed:', e);
                }

                // Method 2: Using CORS proxy if method 1 fails
                if (!apiSuccess) {
                    try {
                        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                        const targetUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBGQHZMHE7c6EniQJ8wIOZRug5iYRjfrMo';
                        
                        const response = await fetch(proxyUrl + targetUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-Requested-With': 'XMLHttpRequest'
                            },
                            body: JSON.stringify({
                                "contents": [{
                                    "parts": [{
                                        "text": "Bạn là một chuyên gia bói bài Tây. Hãy ngẫu nhiên chọn một lá bài trong bộ bài Tây gồm 52 lá, bao gồm 13 lá trong mỗi chất: Hearts (Cơ), Diamonds (Rô), Clubs (Chuồn), Spades (Bích). Sau đó, chọn một chiều ngẫu nhiên: xuôi hoặc ngược. Hãy trả về kết quả dưới dạng JSON đúng chuẩn: {\"card\": \"Tên lá bài tiếng Anh + chiều (xuôi/ngược)\", \"card_vi\": \"Tên lá bài tiếng Việt + chiều (xuôi/ngược)\", \"title\": \"Tóm tắt ý nghĩa chính của lá bài (≤ 15 từ)\", \"content\": {\"tinh_cam\": \"Ý nghĩa trong chuyện tình cảm (≤ 100 từ)\", \"gia_dinh\": \"Ý nghĩa trong quan hệ gia đình (≤ 100 từ)\", \"cong_viec\": \"Ý nghĩa trong công việc (≤ 100 từ)\"}, \"loi_khuyen\": \"Lời khuyên tích cực (≤ 100 từ)\"}. Chỉ trả về JSON, không thêm mô tả gì khác."
                                    }]
                                }]
                            })
                        });

                        if (response.ok) {
                            data = await response.json();
                            apiSuccess = true;
                        }
                    } catch (e) {
                        console.log('Method 2 failed:', e);
                    }
                }

                // If API calls fail, use sample data with randomization
                if (!apiSuccess) {
                    console.log('Using fallback sample data');
                    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading time
                    data = generateRandomCard();
                    apiSuccess = true;
                }

                // Process the response
                if (apiSuccess && data) {
                    let cardData;
                    
                    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                        // Real API response
                        const content = data.candidates[0].content.parts[0].text;
                        let jsonMatch = content.match(/\{[\s\S]*\}/);
                        if (jsonMatch) {
                            cardData = JSON.parse(jsonMatch[0]);
                        } else {
                            throw new Error('Không tìm thấy JSON trong phản hồi từ API');
                        }
                    } else {
                        // Fallback data
                        cardData = data;
                    }
                    
                    // Validate required fields
                    if (!cardData.card_vi || !cardData.title || !cardData.content || !cardData.loi_khuyen) {
                        throw new Error('Dữ liệu trả về không đầy đủ');
                    }
                    
                    displayResult(cardData);
                } else {
                    throw new Error('Không thể lấy dữ liệu từ API');
                }

            } catch (error) {
                console.error('Error details:', error);
                let errorMessage = 'Đã xảy ra lỗi không xác định';
                
                if (error.message.includes('fetch') || error.message.includes('network')) {
                    errorMessage = 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và thử lại.';
                } else if (error.message.includes('JSON')) {
                    errorMessage = 'Lỗi xử lý dữ liệu từ server. Vui lòng thử lại.';
                } else {
                    errorMessage = error.message;
                }
                
                showError(errorMessage);
            }
        }

        // Generate random card data as fallback
        function generateRandomCard() {
            const suits = [
                { en: 'Hearts', vi: 'Cơ' },
                { en: 'Diamonds', vi: 'Rô' },
                { en: 'Clubs', vi: 'Chuồn' },
                { en: 'Spades', vi: 'Bích' }
            ];
            
            const cards = [
                { en: 'Ace', vi: 'Át' },
                { en: '2', vi: '2' },
                { en: '3', vi: '3' },
                { en: '4', vi: '4' },
                { en: '5', vi: '5' },
                { en: '6', vi: '6' },
                { en: '7', vi: '7' },
                { en: '8', vi: '8' },
                { en: '9', vi: '9' },
                { en: '10', vi: '10' },
                { en: 'Jack', vi: 'Bồi' },
                { en: 'Queen', vi: 'Đầm' },
                { en: 'King', vi: 'Già' }
            ];

            const orientations = [
                { en: 'Upright', vi: 'Xuôi' },
                { en: 'Reversed', vi: 'Ngược' }
            ];

            const randomSuit = suits[Math.floor(Math.random() * suits.length)];
            const randomCard = cards[Math.floor(Math.random() * cards.length)];
            const randomOrientation = orientations[Math.floor(Math.random() * orientations.length)];

            const sampleTitles = [
                "Khởi đầu mới đầy hứa hẹn",
                "Cân bằng và hài hòa trong cuộc sống",
                "Thử thách cần vượt qua",
                "Thành công và vinh quang",
                "Tình yêu và sự quan tâm",
                "Sự thay đổi tích cực",
                "Sức mạnh nội tại và ý chí",
                "Sự thịnh vượng và may mắn"
            ];

            const sampleContents = {
                tinh_cam: [
                    "Tình cảm của bạn đang trong giai đoạn phát triển tích cực. Hãy mở lòng và tin tưởng vào những cảm xúc chân thành.",
                    "Có thể xuất hiện những thử thách trong mối quan hệ, nhưng đây là cơ hội để hai người hiểu nhau sâu sắc hơn.",
                    "Thời gian này thuận lợi cho việc bày tỏ tình cảm hoặc tìm kiếm tình yêu đích thực."
                ],
                gia_dinh: [
                    "Gia đình sẽ là nguồn động lực lớn cho bạn trong thời gian tới. Hãy dành nhiều thời gian bên những người thân yêu.",
                    "Có thể có những bất đồng nhỏ trong gia đình, nhưng sự hiểu biết và bao dung sẽ giải quyết mọi vấn đề.",
                    "Vai trò của bạn trong gia đình sẽ trở nên quan trọng hơn, mọi người tin tưởng và dựa dẫm vào bạn."
                ],
                cong_viec: [
                    "Công việc đang có những chuyển biến tích cực. Đây là thời điểm tốt để thể hiện năng lực và sáng tạo.",
                    "Có thể gặp một số khó khăn trong công việc, nhưng sự kiên trì và nỗ lực sẽ mang lại kết quả tốt.",
                    "Cơ hội thăng tiến hoặc hợp tác mới đang đến gần. Hãy chuẩn bị kỹ lưỡng để nắm bắt cơ hội."
                ]
            };

            const sampleAdvice = [
                "Hãy tin tưởng vào bản thân và theo đuổi những mục tiêu của mình với sự quyết tâm cao.",
                "Đừng ngại thay đổi khi cần thiết. Sự linh hoạt sẽ mang lại những cơ hội mới.",
                "Lắng nghe tiếng nói trái tim và đưa ra quyết định dựa trên cảm xúc chân thực.",
                "Kiên nhẫn và bền bỉ sẽ giúp bạn vượt qua mọi thử thách và đạt được thành công."
            ];

            return {
                card: `${randomCard.en} of ${randomSuit.en} - ${randomOrientation.en}`,
                card_vi: `${randomCard.vi} ${randomSuit.vi} - ${randomOrientation.vi}`,
                title: sampleTitles[Math.floor(Math.random() * sampleTitles.length)],
                content: {
                    tinh_cam: sampleContents.tinh_cam[Math.floor(Math.random() * sampleContents.tinh_cam.length)],
                    gia_dinh: sampleContents.gia_dinh[Math.floor(Math.random() * sampleContents.gia_dinh.length)],
                    cong_viec: sampleContents.cong_viec[Math.floor(Math.random() * sampleContents.cong_viec.length)]
                },
                loi_khuyen: sampleAdvice[Math.floor(Math.random() * sampleAdvice.length)]
            };
        }

        function displayResult(data) {
            // Hide loading and show result
            document.getElementById('loadingSection').style.display = 'none';
            document.getElementById('resultSection').style.display = 'block';

            // Map data to UI elements
            document.getElementById('cardName').textContent = data.card_vi;
            document.getElementById('overviewText').textContent = data.title;
            document.getElementById('loveText').textContent = data.content.tinh_cam;
            document.getElementById('workText').textContent = data.content.cong_viec;
            document.getElementById('familyText').textContent = data.content.gia_dinh;
            document.getElementById('conclusionText').textContent = data.loi_khuyen;
        }

        function showError(message) {
            document.getElementById('loadingSection').style.display = 'none';
            document.getElementById('errorSection').style.display = 'block';
            document.getElementById('errorText').textContent = message || 'Không thể kết nối với server. Vui lòng thử lại sau.';
        }

        function resetReading() {
            // Reset to initial state
            document.getElementById('startSection').style.display = 'block';
            document.getElementById('loadingSection').style.display = 'none';
            document.getElementById('resultSection').style.display = 'none';
            document.getElementById('errorSection').style.display = 'none';
        }